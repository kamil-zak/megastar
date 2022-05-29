/* eslint no-unused-vars: ["error", { "args": "none" }] */
import mongoose from 'mongoose'
import BaseError from '../helpers/BaseError.js'
import { CODES } from '../constants/errorCodes.js'

export const notFound = (req, res, next) => {
    next(new BaseError(CODES.NOTFOUND))
}

export const catchWebErrors = (err, req, res, next) => {
    const baseError = err instanceof BaseError ? err : new BaseError()
    const errorData = {
        message: baseError.message,
        status: baseError.status,
    }
    res.locals.title = `${errorData.message} - Mega-Star.pl`
    return res.status(baseError.status).render('errors/base', errorData)
}

export const catchMongoErrors = (err, req, res, next) => {
    if (err instanceof mongoose.Error.CastError) throw new BaseError(CODES.BADREQUESST)
    if (err instanceof mongoose.Error.ValidationError) throw new BaseError(CODES.VALIDATION)
    if (err instanceof mongoose.Error) throw new BaseError(CODES.VALIDATION)
    throw err
}

export const catchApiErrors = (err, req, res, next) => {
    const apiError = err instanceof BaseError ? err : new BaseError()

    const errorData = {
        error: {
            message: apiError.message,
            code: apiError.code,
        },
    }

    return res.status(apiError.status).json(errorData)
}
