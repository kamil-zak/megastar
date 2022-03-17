import transporter from '../../config/email.js'
import { contactMail } from '../../config/env.js'

const emailController = {
    async sendContactMail(req, res) {
        const { from, message } = req.body
        await transporter.sendMail({
            from,
            to: contactMail,
            subject: 'Kontakt ze strony WWW',
            text: message,
        })
        res.send({ success: true })
    },
}

export default emailController
