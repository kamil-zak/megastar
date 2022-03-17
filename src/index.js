import 'dotenv/config'
import './config/datebase.js'
import app from './app.js'
import { port } from './config/env.js'

app.listen(port)
