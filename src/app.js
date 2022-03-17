import { join } from 'path'
import express from 'express'
import { notFound, catchWebErrors, catchApiErrors, catchMongoErrors } from './middlewares/errors.js'
import dev from './middlewares/dev.js'
import apiRouter from './routes/api.js'
import pagesRouter from './routes/pages.js'
import configHandlebars from './config/handlebars.js'
import pagesMiddleware from './middlewares/pages.js'

const app = express()

configHandlebars(app)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

if (process.env.NODE_ENV === 'development') app.use(dev())

app.use(express.static(join('public')))
app.use('/files', express.static(join('uploads')))

app.use('/api', apiRouter, notFound, catchMongoErrors, catchApiErrors)
app.use(pagesMiddleware())
app.use(pagesRouter, notFound, catchWebErrors)

export default app
