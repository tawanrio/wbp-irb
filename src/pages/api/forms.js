import nodemailer from 'nodemailer'
import { connectMongoDB, disconnectMongoDB } from '@/service/db'
import { Config } from '@/service/model/schemas/configSchema'

export default async function forms(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Ok' })
  }
  if (req.method === 'POST') {
    const { name, email, tel, subject, message } = req.body

    try {
      if (!name || !email || !tel || !subject || !message)
        throw new Error('Por favor, preencha todos os campos')

      await connectMongoDB()
      await sendEmail({ name, email, tel, subject, message })

      res.status(200).json({ message: 'Email enviado com sucesso!' })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Falha ao enviar email, ' + error.message })
    } finally {
      await disconnectMongoDB()
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
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

  const html = `
      <div
        style="
          max-width: 600px;
          font-family: Arial, sans-serif;
          background-color: #fff;
          border: 1px solid #dddddd;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          padding: 20px;
          margin: 20px auto;
        "
      >
        <h2
          style="
            text-align: center;
            margin: 0;
            font-size: 24px;
            color: #333;
            padding-bottom: 20px;
          "
        >
          ${data.subject}
        </h2>
        <p style="text-align: center; margin: 20px 0; color: #666;">
          Email enviado através do site:
          <a
            href="http://irbauto.com.br"
            style="color: #4caf50; text-decoration: none;"
          >
            irbauto.com.br
          </a>
        </p>

        <p style="margin: 10px 0; color: #333;"><strong>Nome:</strong> ${data.name}</p>
        <p style="margin: 10px 0; color: #333;"><strong>Email:</strong> ${data.email}</p>
        <p style="margin: 10px 0; color: #333;"><strong>Telefone:</strong> ${data.tel}</p>
        <p style="margin: 10px 0; color: #333;"><strong>Assunto:</strong> ${data.subject}</p>
        <p style="margin: 10px 0; color: #333;"><strong>Mensagem:</strong> ${data.message}</p>
      </div>
    `

  await transporter.sendMail({
    from: `${data.name} <${data.email}>`,
    to: authSmtp.auth.user,
    cc: 'marketing@irbauto.com.br',
    subject: data.subject,
    html,
  })
}
