import jwt from 'jsonwebtoken'
import User from '../../models/user.js'
import BaseError from '../../helpers/BaseError.js'
import { CODES } from '../../constants/errorCodes.js'
import { apiSecret } from '../../config/env.js'
import { REFRESH_COOKIE, TOKEN_EXPIRES_IN } from '../../constants/base.js'

const authController = {
    async login(req, res, next) {
        const { login, password } = req.body
        const user = await User.findOne({ login: login.toLowerCase() })
        if (!user || !(await user.comparePassword(password))) return next(new BaseError(CODES.LOGIN))

        const token = jwt.sign({ login: user.login }, apiSecret.token, { expiresIn: TOKEN_EXPIRES_IN })
        const refreshToken = jwt.sign({ login: user.login }, apiSecret.refreshToken)
        res.cookie(REFRESH_COOKIE, refreshToken, { httpOnly: true, path: '/api/auth/refresh' })

        res.send({ token })
    },

    async refresh(req, res, next) {
        const refreshToken = req.cookies[REFRESH_COOKIE]
        if (!refreshToken) return next(new BaseError(CODES.NOTOKEN))
        jwt.verify(refreshToken, apiSecret.refreshToken, async (err, data) => {
            if (err) return next(new BaseError(CODES.UNAUTHENTICATED))
            const user = await User.findOne({ login: data.login }).lean()
            if (!user) return next(new BaseError(CODES.UNAUTHENTICATED))
            const token = jwt.sign(user, apiSecret.token, { expiresIn: TOKEN_EXPIRES_IN })
            res.send({ token })
        })
    },

    async me(req, res) {
        res.send({ login: req.user.login })
    },

    async logout(req, res) {
        res.clearCookie(REFRESH_COOKIE, { path: '/api/auth/refresh' })
        res.sendStatus(204)
    },
}

export default authController
