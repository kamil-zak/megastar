import express from 'express'
import authController from '../controllers/api/authController.js'
import linesController from '../controllers/api/linesController.js'
import foreclosuresController from '../controllers/api/foreclosuresController.js'
import albumsController from '../controllers/api/albumsController.js'
import auth from '../middlewares/auth.js'
import upload from '../config/multer.js'
import ash from '../helpers/asyncHandler.js'
import emailController from '../controllers/api/emailController.js'

const router = express.Router()

router.post('/sendmail', ash(emailController.sendContactMail))

router.post('/auth/login', ash(authController.login))
router.post('/auth/refresh', ash(authController.refresh))
router.get('/me', auth, ash(authController.me))

router.get('/lines', ash(linesController.findAll))
router.post('/lines', auth, ash(linesController.create))
router.get('/lines/:id', ash(linesController.findOne))
router.put('/lines/:id', auth, ash(linesController.update))
router.delete('/lines/:id', auth, ash(linesController.remove))
router.post('/lines/move', auth, ash(linesController.move))

router.get('/foreclosures', ash(foreclosuresController.findAll))
router.post('/foreclosures', auth, ash(foreclosuresController.create))
router.get('/foreclosures/:id', ash(foreclosuresController.findOne))
router.put('/foreclosures/:id', auth, ash(foreclosuresController.update))
router.delete('/foreclosures/:id', auth, ash(foreclosuresController.remove))
router.post('/foreclosures/move', auth, ash(foreclosuresController.move))

router.post('/albums/upload', upload.single('image'), ash(albumsController.upload))

router.get('/albums', ash(albumsController.findAll))
router.post('/albums', auth, ash(albumsController.create))
router.get('/albums/:id', ash(albumsController.findOne))
router.put('/albums/:id', auth, ash(albumsController.update))
router.delete('/albums/:id', auth, ash(albumsController.remove))
router.post('/albums/move', auth, ash(albumsController.move))

export default router
