import { CODES, DETAILS } from '../constants/errorCodes.js'

class BaseError extends Error {
    constructor(code = CODES.DEFAULT) {
        super(DETAILS[code].message)
        this.status = DETAILS[code].status
        this.code = code
        Error.captureStackTrace(this)
    }
}

export default BaseError
