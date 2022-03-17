import mongoose from 'mongoose'
import { dbConfig } from './env.js'

mongoose.connect(dbConfig.url, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
mongoose.connection.on('error', () => {
    process.exit()
})
