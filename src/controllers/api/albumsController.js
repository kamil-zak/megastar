import sharp from 'sharp'
import fs from 'fs'
import Album from '../../models/album.js'
import BaseError from '../../helpers/BaseError.js'
import { CODES } from '../../constants/errorCodes.js'

const albumController = {
    async findAll(req, res) {
        const { photosCount } = req.query
        const fields = {}
        if (photosCount) fields.photos = { $slice: Number(photosCount) }
        const documents = await Album.find({}, fields)
        res.send(documents)
    },
    async findOne(req, res, next) {
        const document = await Album.findById(req.params.id)
        if (!document) return next()
        res.send(document)
    },
    async create(req, res) {
        const document = await new Album(req.body).save()
        res.status(201).send(document)
    },
    async update(req, res, next) {
        const document = await Album.findById(req.params.id)
        if (!document) return next()
        await document.overwrite(req.body).save()
        res.send(document)
    },
    async remove(req, res, next) {
        const document = await Album.findById(req.params.id)
        if (!document) return next()
        await document.remove()
        res.status(204).send()
    },
    async move(req, res) {
        const document = await Album.findById(req.body.item)
        await document.move(req.body.destination)
        res.status(204).send()
    },
    async upload(req, res) {
        if (!req.file) throw new BaseError(CODES.UPLOAD)
        const original = await sharp(req.file.path)
            .resize(2048, 2048, {
                fit: sharp.fit.inside,
                withoutEnlargement: true,
            })
            .toBuffer()
        await fs.promises.writeFile(`uploads/${req.file.filename}`, original)

        const thumbnail = await sharp(req.file.path).resize(200, 150).toBuffer()
        await fs.promises.writeFile(`uploads/thumb.${req.file.filename}`, thumbnail)
        res.send({ filename: req.file.filename })
    },
}

export default albumController
