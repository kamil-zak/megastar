import transporter from '../../config/email.js'
import { contactMail, emailFrom } from '../../config/env.js'

const emailController = {
    async sendContactMail(req, res) {
        const { from, message } = req.body
        await transporter.sendMail({
            from: emailFrom,
            to: contactMail,
            replyTo: from,
            subject: 'Kontakt ze strony WWW',
            text: message,
        })
        await transporter.sendMail({
            from: emailFrom,
            to: from,
            subject: '[mega-star] Otrzymaliśmy twoją wiadomość!',
            text: `Witaj,\n Informujemy, że otrzymaliśmy Twoją wiadomość i postaramy się na nią odpowiedzieć jak najszyciej.\n\nTreść wiadomości:\n\n${message}`,
        })
        res.send({ success: true })
    },
}

export default emailController
