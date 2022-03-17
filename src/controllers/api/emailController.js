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
        res.send({ success: true })
    },
}

export default emailController
