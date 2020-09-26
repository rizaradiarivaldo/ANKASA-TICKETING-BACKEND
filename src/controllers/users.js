const userModel = require('../models/users')
const { success, failed, tokenResult } = require('../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWTKEY, JWTREFRESH } = require('../helpers/env')

const users = {
    register: async (req, res) => {
        const body = req.body

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(body.password, salt)

        const data = {
            username: body.username,
            email: body.email,
            password: hashPassword
        }

        userModel.register(data).then((result) => {
            success(res, result, 'Register Sukses')
        }).catch(() => {
            failed(res, [], 'Email Sudah Ada')
        })
    },
    login: async (req, res) => {
        const body = req.body
        userModel.login(body).then(async (result) => {
            const results = result[0]
            const password = results.password
            const userRefreshToken = results.refreshToken
            const isPasswordMatch = await bcrypt.compare(body.password, password)

            if (isPasswordMatch) {
                jwt.sign({
                    username: results.username
                }, JWTKEY, {expiresIn: 15},
                    (err, token) => {
                        if (err) {
                            console.log(err)
                        } else {
                            if (userRefreshToken === null) {
                                const id = results.id
                                const refreshToken = jwt.sign({ id }, JWTREFRESH)
                                userModel.updateRefreshToken(refreshToken, id).then(() => {
                                    const data = {
                                        token: token,
                                        refreshToken: refreshToken
                                    }
                                    tokenResult(res, data, 'Login Sukses')
                                }).catch((err) => {
                                    failed(res, [], err.message)
                                })
                            } else {
                                const data = {
                                    token: token,
                                    refreshToken: userRefreshToken
                                }
                                tokenResult(res, data, 'Login sukses')
                            }
                        }
                    })
            } else {
                failed(res, [], 'Password salah')
            }
        }).catch(() => {
            failed(res, [], 'Username salah')
        })
    },
    // updateUser: (req, res) => {

    // },
    requestToken: (req, res) => {
        const refreshToken = req.body.refreshToken
        userModel.checkRefreshToken(refreshToken).then((result) => {
            if (result.length >= 1) {
                const user = result[0]
                const newToken = jwt.sign({ username: user.username }, JWTKEY, {expiresIn: 36000})
                const data = {
                    newToken: newToken
                }
                tokenResult(res, data, 'Refresh Token Sukses')
            } else {
                failed(res, [], 'Refresh token tidak ditemukan')
            }
        }).catch((err) => {
            failed(res, [], err.message)
        })
    }
}

module.exports = users