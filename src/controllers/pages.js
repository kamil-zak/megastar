import Line from '../models/line.js'
import Album from '../models/album.js'
import Foreclosure from '../models/foreclosure.js'
import { generateLinePDF } from '../services/PDF.js'

const pagesController = {
    home(req, res) {
        res.render('pages/home')
    },

    async timetable(req, res) {
        const lines = await Line.find().select('slug entry destination').lean()
        res.render('pages/timetable', { lines })
    },

    async timetableDetails(req, res, next) {
        const lines = await Line.find().select('slug entry destination').lean()
        const selected = lines.find((line) => line.slug === req.params.slug)
        if (!selected) return next()
        const viewLines = lines.map((line) => ({ ...line, isActive: line._id === selected._id }))
        const title = `${selected.entry} - ${selected.destination} | ${res.locals.title}`
        res.render('pages/timetable', { lines: viewLines, activeId: selected._id, title })
    },

    async timetableDownload(req, res, next) {
        const line = await Line.findById(req.params.id).lean()
        if (!line) return next()
        const foreclosures = await Foreclosure.find().select('symbol description').lean()
        const stream = await generateLinePDF(line, foreclosures)
        res.setHeader('Content-Disposition', `inline; filename=${line.slug}.pdf`)
        res.setHeader('Content-type', 'application/pdf')
        stream.pipe(res)
    },

    async gallery(req, res) {
        const albums = await Album.find().lean()
        const viewAlbums = albums.map(({ _id, name, photos }) => ({ _id, name, first: photos[0], count: photos.length }))
        res.render('pages/gallery', { albums: viewAlbums })
    },

    contact(req, res) {
        res.render('pages/contact')
    },
}

export default pagesController
