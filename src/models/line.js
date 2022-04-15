import mongoose from 'mongoose'
import URLSlugs from 'mongoose-url-slugs'
import { CODES } from '../config/errorCodes.js'
import BaseError from '../helpers/BaseError.js'
import customOrder from './plugins/customOrder.js'

const departureSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['week', 'saturday', 'sunday'],
    },
    direction: {
        type: String,
        required: true,
        enum: ['destination', 'entry'],
    },
    time: {
        hours: { type: Number, min: 0, max: 23, required: true },
        mins: { type: Number, min: 0, max: 59, required: true },
        foreclosures: { type: [{ type: String, match: /^[A-Z]$/ }], required: true },
    },
    id: { type: String, required: true },
})

const lineSchema = mongoose.Schema({
    entry: { type: String, required: true, minLength: 3 },
    destination: { type: String, required: true, minLength: 3 },
    description: { type: String },
    timetable: { type: [departureSchema], validate: (arr) => !!arr.length },
})

lineSchema.pre('save', async function () {
    const foreclosuresList = await this.model('Foreclosure').find({}, { symbol: 1 }).lean()
    const symbols = foreclosuresList.map((foreclosure) => foreclosure.symbol)
    const { timetable } = this.toObject()

    const hasNotExistingForeclosure = timetable.some(({ time: { foreclosures } }) =>
        foreclosures.some((foreclosure) => !symbols.includes(foreclosure))
    )

    if (hasNotExistingForeclosure) throw new BaseError(CODES.NOT_EXISTING_FORECLOSURE)
})

lineSchema.plugin(customOrder)
lineSchema.plugin(URLSlugs('entry destination', { update: true }))

const Line = mongoose.model('Line', lineSchema)

export default Line
