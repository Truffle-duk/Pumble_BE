import nodemailer from "nodemailer"
import dotenv from "dotenv";

dotenv.config()
export const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pumble.truffle@gmail.com',
        pass: process.env.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})