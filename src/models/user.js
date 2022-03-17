import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
})

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
