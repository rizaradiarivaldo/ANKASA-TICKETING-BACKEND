const userModel = require('../models/users')
const { success, failed, tokenResult } = require('../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWTKEY } = require('../helpers/env')

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
        })
    }
}