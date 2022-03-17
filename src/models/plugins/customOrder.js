const customOrder = (schema) => {
    schema.add({ order: { type: Number, select: false } })

    schema.pre('save', async function () {
        if (!this.isNew) return
        const count = await this.constructor.find().count()
        this.order = count + 1
    })

    schema.pre('remove', async function () {
        const { order } = await this.constructor.findById(this._id, { order: 1 }).lean()
        await this.constructor.updateMany({ order: { $gt: order } }, { $inc: { order: -1 } })
    })

    schema.pre('find', async function () {
        this.sort({ order: 1 })
    })

    // eslint-disable-next-line no-param-reassign
    schema.methods.move = async function (destination) {
        const { order: from } = await this.constructor.findById(this._id, { order: 1 }).lean()
        const { order: to } = await this.constructor.findById(destination, { order: 1 }).lean()
        await this.constructor.updateMany(
            { order: from > to ? { $gte: to, $lt: from } : { $gt: from, $lte: to } },
            { $inc: { order: from > to ? 1 : -1 } }
        )
        await this.constructor.updateOne({ _id: this._id }, { order: to })
    }
}

export default customOrder
