import Line from '../../models/line.js'

const linesController = {
    async findAll(req, res) {
        const fields = (req.query.fields || '').replaceAll(',', ' ')
        const documents = await Line.find().select(fields)
        res.send(documents)
    },
    async findOne(req, res, next) {
        const document = await Line.findById(req.params.id)
        if (!document) return next()
        res.send(document)
    },
    async create(req, res) {
        const document = await new Line(req.body).save()
        res.status(201).send(document)
    },
    async update(req, res, next) {
        const document = await Line.findById(req.params.id)
        if (!document) return next()
        await document.overwrite(req.body).save()
        res.send(document)
    },
    async remove(req, res, next) {
        const document = await Line.findById(req.params.id)
        if (!document) return next()
        await document.remove()
        res.status(204).send()
    },
    async move(req, res) {
        const document = await Line.findById(req.body.item)
        await document.move(req.body.destination)
        res.status(204).send()
    },
}

export default linesController
