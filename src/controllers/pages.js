import Line from '../models/line.js'
import Album from '../models/album.js'

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
