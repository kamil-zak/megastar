export const port = process.env.PORT || 5555

export const apiSecret = {
    token: process.env.TOKEN_SECRET || 'vfdvdfvdfjbhbhjb76b67b67b',
    refreshToken: process.env.REFRESH_TOKEN_SECRET || 'vfvdfvdfvdfb766b667b67b76',
}

export const dbConfig = {
    url: process.env.DB_URL || 'mongodb://127.0.0.1:27017/megastar',
}

export const emailConfig = {
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_PORT === 465,
    auth: {
        user: process.env.EMAIL_USER || 'yolanda.jerde64@ethereal.email',
        pass: process.env.EMAIL_PASSWORD || 'zRdJeNt6mUxrmf9rte',
    },
}

export const contactMail = process.env.CONTACT_EMAIL || 'test@example.com'
