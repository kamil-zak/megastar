import jwt from 'jsonwebtoken'
import { apiSecret } from '../config/env.js'
import { CODES } from '../constants/errorCodes.js'
import BaseError from '../helpers/BaseError.js'

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return next(new BaseError(CODES.NOTOKEN))
    jwt.verify(token, apiSecret.token, (err, user) => {
        if (err) return next(new BaseError(CODES.UNAUTHENTICATED))
        req.user = user
        return next()
    })
}

export default auth
