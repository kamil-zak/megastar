import jwt from 'jsonwebtoken'
import User from '../../models/user.js'
import BaseError from '../../helpers/BaseError.js'
import { CODES } from '../../config/errorCodes.js'
import { apiSecret } from '../../config/env.js'

const authController = {
    async login(req, res, next) {
        const { login, password } = req.body
        const user = await User.findOne({ login: login.toLowerCase() })
        if (!user || !(await user.comparePassword(password))) return next(new BaseError(CODES.LOGIN))

        const token = jwt.sign({ login: user.login }, apiSecret.token, {
            expiresIn: '30m',
        })
        const refreshToken = jwt.sign({ login: user.login }, apiSecret.refreshToken)

        res.send({ token, refreshToken })
    },

    async refresh(req, res, next) {
        const { refreshToken } = req.body
        if (!refreshToken) return next(new BaseError(CODES.NOTOKEN))
        jwt.verify(refreshToken, apiSecret.refreshToken, async (err, data) => {
            if (err) return next(new BaseError(CODES.UNAUTHENTICATED))
            const user = await User.findOne({ login: data.login }).lean()
            if (!user) return next(new BaseError(CODES.UNAUTHENTICATED))
            const token = jwt.sign(user, apiSecret.token, {
                expiresIn: '30m',
            })
            res.send({ token })
        })
    },

    async me(req, res) {
        res.send({ login: req.user.login })
    },
}

export default authController
