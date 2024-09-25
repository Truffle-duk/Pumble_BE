import nodemailer from "nodemailer"

export const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pumble.truffle@gmail.com',
        pass: 'htah ngoh skmq lokz'
    },
    tls: {
        rejectUnauthorized: false
    }
})