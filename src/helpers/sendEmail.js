const { PRIVATEKEY, EMAIL, PASSWORD_EMAIL} = require('../helpers/env')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const { PORT_AWS } = require('../helpers/env')

module.exports = {
    confirmEmail: (email) => {
        const token = jwt.sign({ email: email }, PRIVATEKEY)
        
        const output = `
                    <center><h3>Hello ${email}</h3>
                    <h3>Thank you for registration</h3>
                    <p>You can confirm your email by clicking the link below <br> <a href="${PORT_AWS}/users/verify/${token}">Activation</a></p></center>
                    `

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: EMAIL,
                pass: PASSWORD_EMAIL
            }
        })

        let Mail = {
            from: '"Ankasa" <admin@ankasa.com>',
            to: email,
            subject: "Verification Email",
            text: "Plaintext version of the message",
            html: output
        }
        transporter.sendMail(Mail, (err, info) => {
            if (err) throw err
            console.log('Email sent: ' + info.response)
        })
    }
}