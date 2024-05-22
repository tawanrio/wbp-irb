import nodemailer from "nodemailer"
import { connectMongoDB, disconnectMongoDB } from '@/service/db';
import { Config } from "@/service/model/schemas/configSchema";

export default async function sendEmailRegisterPartner(req, res) {
    
    if (req.method === "GET") {
        res.status(200).json({ message: "Ok" });
    }
    if (req.method === "POST") {
        const  { formData }  = req.body;

        try {
            if ( !formData ) res.status(400).send('Fill in all fields');

            await connectMongoDB();

            const userMail = await Config.findOne({ label: 'smtp' }).lean();

            await sendEmail({formData, user: userMail.auth});

            res.status(200).json({ message: "Email successfully sent!", formData, userMail:userMail.auth });

        } catch (error) {

            res.status(500).json({ message: "Failed to send email, " + error.message, formData:'teste' });

        } finally {
            await disconnectMongoDB();
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }


}

const sendEmail = async ({formData, user}) => {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: user.user,
            pass: user.pass,
        },
    });

    await transporter.sendMail({
        from: formData.structureMail.from,
        to: formData.structureMail.to,
        subject: formData.structureMail.subject,
        html: formData.structureMail.html
    });

};