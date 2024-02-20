import nodemailer from "nodemailer"
import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import { Config } from "@/service/model/schemas/configSchema";

export default async function forms(req, res) {
    if (req.method === "GET") {
        es.status(200).json({ message: "Ok" });
    }
    if (req.method === "POST") {
        const {name, email, tel, subject, message} = req.body;

        // res.status(200).json({name, email, tel, subject, message});
        try {
            if (!name || !email || !tel || !subject || !message)throw new Error('Por favor, preencha todos os campos')

            await connectMongoDB();
            await sendEmail({name, email, tel, subject, message});

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

const sendEmail = async (data) => {
    const authSmtp = await Config.findOne({ label: 'smtp' }).lean();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: authSmtp.auth.user,
            pass: authSmtp.auth.pass,
        },
    });
    const html = `
    <h2>Email enviado atrávez do site: irbauto.com.br</h2>

    <p>Nome: ${data.name}</p>
    <p>Email: ${data.email}</p>
    <p>Telefone: ${data.tel}</p>
    <br>
    <p>Assunto: ${data.subject}</p>
    <p>Mensagem: ${data.message}</p>
    `

    await transporter.sendMail({
        from: `${data.name} <${data.email}>`,
        to: authSmtp.auth.user,
        replyTo: data.email,
        subject: data.subject,
        html
    });
};

