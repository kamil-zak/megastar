import mongoose from 'mongoose'
import customOrder from './plugins/customOrder.js'

const albumSchema = mongoose.Schema({
    name: { type: String, required: true, minLength: 3 },
    photos: { type: [String], validate: (arr) => !!arr.length },
})

albumSchema.plugin(customOrder)
const Album = mongoose.model('Album', albumSchema)

export default Album
