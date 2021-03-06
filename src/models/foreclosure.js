import mongoose from 'mongoose'
import { CODES } from '../constants/errorCodes.js'
import BaseError from '../helpers/BaseError.js'
import customOrder from './plugins/customOrder.js'

const dateSchema = {
    day: { type: Number, min: 1, max: 31, required: true },
    month: { type: Number, min: 0, max: 11, required: true },
}

const listSchema = mongoose.Schema({
    days: [{ type: Number, min: 0, max: 6 }],
    dates: [{ ...dateSchema, id: { type: String, required: true } }],
    intervals: [
        {
            from: dateSchema,
            to: dateSchema,
            id: { type: String, required: true },
        },
    ],
})

const foreclosureSchema = mongoose.Schema({
    symbol: { type: String, unique: true, required: true, match: /^[A-Z]$/ },
    description: { type: String, required: true, minLength: 10 },
    list: {
        type: listSchema,
        required: true,
        validate: (list) => list.days.length + list.dates.length + list.intervals.length > 0,
    },
})

foreclosureSchema.set('toObject', { virtuals: true })
foreclosureSchema.set('toJSON', { virtuals: true })

foreclosureSchema.virtual('usedCount', {
    ref: 'Line',
    localField: 'symbol',
    foreignField: 'timetable.time.foreclosures',
    count: true,
})

foreclosureSchema.path('symbol').set(function (value) {
    this.previousSymbol = this.symbol
    return value
})

foreclosureSchema.post('save', async function () {
    if (this.previousSymbol !== this.symbol)
        await this.model('Line').updateMany(
            {},
            {
                $set: {
                    'timetable.$[].time.foreclosures.$[symbol]': this.symbol,
                },
            },
            {
                arrayFilters: [{ symbol: { $eq: this.previousSymbol } }],
                multi: true,
            }
        )
})

foreclosureSchema.post('save', function (error, res, next) {
    if (error.name === 'MongoError' && error.code === 11000 && error.keyPattern.symbol) throw new BaseError(CODES.EXISTING_SYMBOL)
    next()
})

foreclosureSchema.pre('remove', async function () {
    await this.execPopulate('usedCount')
    if (this.usedCount > 0) throw new BaseError(CODES.USED_FORECLOSURE)
})

foreclosureSchema.plugin(customOrder)

const Foreclosure = mongoose.model('Foreclosure', foreclosureSchema)

export default Foreclosure
