import Foreclosure from '../../models/foreclosure.js'

const foreclosuresController = {
    async findAll(req, res) {
        const fields = (req.query.fields || '').replaceAll(',', ' ')
        const foreclosures = await Foreclosure.find().select(fields)
        res.send(foreclosures)
    },
    async findOne(req, res, next) {
        const document = await Foreclosure.findById(req.params.id)
        if (!document) return next()
        res.send(document)
    },
    async create(req, res) {
        const document = await new Foreclosure(req.body).save()
        res.status(201).send(document)
    },
    async update(req, res, next) {
        const document = await Foreclosure.findById(req.params.id)
        if (!document) return next()
        await document.overwrite(req.body).save()
        res.send(document)
    },
    async remove(req, res, next) {
        const document = await Foreclosure.findById(req.params.id)
        if (!document) return next()
        await document.remove()
        res.status(204).send()
    },
    async move(req, res) {
        const document = await Foreclosure.findById(req.body.item)
        await document.move(req.body.destination)
        res.status(204).send()
    },
}

export default foreclosuresController
