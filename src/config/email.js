import nodemailer from 'nodemailer'
import { emailConfig } from './env.js'

const transporter = nodemailer.createTransport(emailConfig)

export default transporter
