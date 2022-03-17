import { extname } from 'path'
import multer from 'multer'

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads')
    },
    filename(req, file, cb) {
        const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`
        cb(null, name)
    },
})

const upload = multer({ storage })

export default upload
