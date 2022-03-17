import express from 'express'
import pagesController from '../controllers/pages.js'
import ash from '../helpers/asyncHandler.js'

const pagesRouter = express.Router()

pagesRouter.get('/', pagesController.home)
pagesRouter.get('/rozklad-jazdy', ash(pagesController.timetable))
pagesRouter.get('/rozklad-jazdy/:slug?', ash(pagesController.timetableDetails))
pagesRouter.get('/galeria', ash(pagesController.gallery))
pagesRouter.get('/kontakt', pagesController.contact)

export default pagesRouter
