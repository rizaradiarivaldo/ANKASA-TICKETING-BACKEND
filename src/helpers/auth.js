const jwt = require('jsonwebtoken')
const { tokenExpiredResult } = require('../helpers/response')
const { JWTKEY } = require('../helpers/env')

module.exports = {
    authentication: (req, res, next) => {
        const token = req.headers.token
        if(token === undefined || token === '') {
            tokenErrorResult(res, [], 'Token harus diisi')
        } else {
            next()
        }
    },
    authorization: (req, res, next) => {
        const token = req.headers.token
        jwt.verify(token, JWTKEY, (err) => {
            if (err && err.name === 'TokenExpiredError') {
                tokenExpiredResult(res, [], 'Autentikasi gagal, token expired')
            } else if (err && err.name === 'JsonWebTokenError') {
                tokenErrorResult(res, [], 'Autentikasi gagal, token salah')
            } else {
                next()
            }
        })
    }
}