import nodemailer from "nodemailer"
import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import { Config } from "@/service/model/schemas/configSchema";

export default async function sendEmailRegisterPartner(req, res) {
    if (req.method === "GET") {
        res.status(200).json({ message: "Ok" });
    }
    if (req.method === "POST") {
        const {
            cnpj,
            companyName,
            tradingName,
            email,
            phone,
            city,
            state
        } = req.body;
            
     

        // res.status(200).json({name, email, tel, subject, message});
        try {
            if ( (!cnpj ||
                !companyName ||
                !tradingName ||
                !email ||
                !phone ||
                !city ||
                !state
                )) res.status(200).json({msg: 'Preencha todos os campos'});

                // res.status(200).json({
                //     cnpj,
                //     companyName,
                //     tradingName,
                //     email,
                //     phone,
                //     street,
                //     number,
                //     neighborhood,
                //     city,
                //     state,
                //     cep,
                //     logo
                // });

            // if (!name || !email || !tel || !subject || !message)throw new Error('Por favor, preencha todos os campos')

            await connectMongoDB();
            await sendEmail({ 
                cnpj,
                companyName,
                tradingName,
                email,
                phone,
                city,
                state
            });

            res.status(200).json({ message: "Email enviado com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: "Falha ao enviar email, " + error.message });
        } finally {
            await disconnectMongoDB();
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
const capitalize = (str) => {
    return str.toUpperCase();
}



const sendEmail = async (data) => {
    const authSmtp = await Config.findOne({ label: 'smtp' }).lean();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: authSmtp.auth.user,
            pass: authSmtp.auth.pass,
        },
    });

    for (let key in data) {
        if (typeof data[key] === 'string') {
            data[key] = capitalize(data[key]);
        }
    }

    const html = `
    <span>Email enviado através do site: irbauto.com.br</span>
    <h2>Solicitação de cadastro</h2>

    <p>CNPJ: ${data.cnpj}</p>
    <p>Razão Social: ${data.companyName}</p>
    <p>Nome Fantasia: ${data.tradingName}</p>
    <p>Email: ${data.email}</p>
    <p>Telefone: ${data.phone}</p>
    <p>Endereço: ${data.street}, ${data.number} - ${data.neighborhood}, ${data.city} - ${data.state}, CEP: ${data.cep}</p>
    <img src="${data.logo}" alt="Logo da Empresa">
    `

    await transporter.sendMail({
        from: `${data.tradingName} <${data.email}>`,
        to: authSmtp.auth.user,
        replyTo: data.email,
        subject: 'Solicitação de cadastro',
        html
    });
};

