const jwt = require('jsonwebtoken')
const { tokenExpiredResult,tokenErrorResult, forbidden } = require('../helpers/response')
const { PRIVATEKEY } = require('../helpers/env')

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
        jwt.verify(token, PRIVATEKEY, (err) => {
            if (err && err.name === 'TokenExpiredError') {
                tokenExpiredResult(res, [], 'Autentikasi gagal, token expired')
            } else if (err && err.name === 'JsonWebTokenError') {
                tokenErrorResult(res, [], 'Autentikasi gagal, token salah')
            } else {
                next()
            }
        })
    },
    admin: (req, res, next) => {
        const token = req.headers.token
        jwt.verify(token, PRIVATEKEY, (err, decode) => {
          if (err && err.name === 'JsonWebTokenError') {
            errToken(res, [], "Authentification failed !");
          } else if (err && err.name === 'TokenExpiredError') {
            errToken(res, [], "Token Expired !");
          }
          else {
            if (decode.dataUser.role === 1) {
              next()
            } else {
              forbidden(res, 'Dont have permission!')
            }
          }
        })
    }
}