import nodemailer from 'nodemailer'
import { connectMongoDB, disconnectMongoDB } from '@/service/db'
import { Config } from '@/service/model/schemas/configSchema'

export default async function sendEmailRegisterPartner(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Ok' })
  }
  if (req.method === 'POST') {
    const { partnerType, partnerData, uniqueId } = req.body
    const { info, address } = partnerData

    const domain = req.headers.origin

    // res.status(200).json({name, email, tel, subject, message});
    try {
      if (
        !info.cnpj ||
        !info.companyName ||
        !info.tradingName ||
        !info.email ||
        !info.phone ||
        !address.city ||
        !address.state ||
        !partnerType
      )
        res.status(400).send('Preencha todos os campos')

      await connectMongoDB()

      const actionsLink = generateActionsLink(domain, info.cnpj, uniqueId)

      await sendEmail({
        cnpj: info.cnpj,
        companyName: info.companyName,
        tradingName: info.tradingName,
        email: info.email,
        phone: info.phone,
        logo: info.logo,
        city: address.city,
        state: address.state,
        street: address.street,
        neighborhood: address.neighborhood,
        number: address.number,
        cep: address.cep,
        partnerType,
        actionsLink,
      })

      console.log(info.logo)
      res.status(200).json({ message: 'Email enviado com sucesso!' })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Falha ao enviar email, ' + error.message })
    } finally {
      await disconnectMongoDB()
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' })
  }
}

const capitalize = (str) => {
  return str.toUpperCase()
}

const generateActionsLink = (domain, cnpj, uniqueId) => {
  const cleanedCnpj = cnpj.replace(/\D/g, '')

  const accept = `${domain}/registerpartner/actions/${cleanedCnpj}/accept/${uniqueId} `

  const refuse = `${domain}/registerpartner/actions/${cleanedCnpj}/refuse/${uniqueId} `
  return { accept, refuse }
}

const sendEmail = async (data) => {
  const authSmtp = await Config.findOne({ label: 'smtp' }).lean()

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: authSmtp.auth.user,
      pass: authSmtp.auth.pass,
    },
  })

  for (const key in data) {
    if (typeof data[key] === 'string') {
      data[key] = capitalize(data[key])
    }
  }

  const html = `
    <div style="max-width: 600px; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <span>Email enviado através do site: <a href="http://irbauto.com.br">irbauto.com.br</a></span>
    <h1 style="color: #333;">Solicitação de cadastro de parceiro IRB</h1>

    <h2 style="color: #333;">${data.partnerType}</h2>
    <p style="color: #666; margin-bottom: 10px;">CNPJ: ${data.cnpj}</p>
    <p style="color: #666; margin-bottom: 10px;">Razão Social: ${data.companyName}</p>
    <p style="color: #666; margin-bottom: 10px;">Nome Fantasia: ${data.tradingName}</p>
    <p style="color: #666; margin-bottom: 10px;">Email: ${data.email}</p>
    <p style="color: #666; margin-bottom: 10px;">Telefone: ${data.phone}</p>
    <p style="color: #666; margin-bottom: 10px;">Endereço: ${data.street}, ${data.number} - ${data.neighborhood}, ${data.city} - ${data.state}, CEP: ${data.cep}</p>
    <img src="${data.logo.url}" alt="Logo da Empresa" style="display: block; margin: 20px auto; max-width: 100%;">

    <span>
        <a href="${data.actionsLink.accept}" style="display: inline-block; padding: 10px 20px; background-color: #22326e; color: #fff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s;"">Aceitar</a>
    </span>
    <span>
        <a href="${data.actionsLink.refuse}" style="display: inline-block; padding: 10px 20px; background-color: #c12025; color: #fff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s;">Recusar</a>
    </span>
</div>
    `

  await transporter.sendMail({
    from: `${data.tradingName} <${data.email}>`,
    to: authSmtp.auth.user,
    // cc: 'marketing@irbauto.com.br',
    subject: 'Solicitação de cadastro de parceiro',
    html,
  })
}
