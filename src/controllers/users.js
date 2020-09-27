const userModel = require('../models/users')
const { success, failed, tokenResult } = require('../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PRIVATEKEY, REFRESHTOKEN } = require('../helpers/env')
const nodemailer = require('nodemailer')
const env = require('../helpers/env')

const users = {
    register: async (req, res, next) => {
        const data = req.body
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const generate = await bcrypt.hash(password, salt)
        userModel.register(data, generate)
            .then(() => {
                success(res, [], 'Please check your email to activation')
                const token = jwt.sign({ email: data.email }, PRIVATEKEY)
                const output = `
                    <center><h1>HELLO ${req.body.email}</h1>
                    <h3>Thank you for registration</h3>
                    <p>You can confirm your email by clicking the link below <br> <a href="http://localhost:3000/users/active/${token}">Activation</a></p></center>
                    `
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth: {
                        user: env.EMAIL,
                        pass: env.PASSWORD_EMAIL
                    }
                });

                let Mail = {
                    from: 'ankasa.com',
                    to: req.body.email,
                    subject: "Verification Email",
                    text: "Plaintext version of the message",
                    html: output
                };
                transporter.sendMail(Mail)
            }).catch((err) => {
                if (err.message = 'Duplicate entry') {
                    failedReg(res, [], 'User Already Exist')
                }
            })
    },
    active: (req, res) => {
        const token = req.params.token
        jwt.verify(token, PRIVATEKEY, (err, decode) => {
            if (err) {
              failed(res, [], 'Failed authorization!')
            } else {
                const data = jwt.decode(token)
                const email = data.email
                userModel.updateUser(email).then((result) => {
                    // res.render('index', { email })
                    success(res, result, 'Activation success')
                }).catch(err => {
                    // res.render('404')
                    failed(res, [], err.message)
                })
            }
        })
    },
    login: async (req, res) => {
        const body = req.body
        userModel.login(body).then(async (result) => {
            if (!result[0]) {
                failed(res, [], 'Username not registered, Please register!')
            } else {
                const results = result[0]
                const password = results.password
                const userRefreshToken = results.refreshToken
                const isPasswordMatch = await bcrypt.compare(body.password, password)

                if (results.status === 0) {
                    failed(res, [], 'Activate your email first')
                } else {
                    if (!isPasswordMatch) {
                        failed(res, [], 'Password is wrong')
                    } else {
                        jwt.sign({
                            username: results.username
                        }, PRIVATEKEY, {expiresIn: 3600},
                            (err, token) => {
                            if (err) {
                                    console.log(err)
                            } else {
                                if (userRefreshToken === null) {
                                    const id = results.id
                                    const refreshToken = jwt.sign({ id }, REFRESHTOKEN)
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
                    }
                }
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
                const newToken = jwt.sign({ username: user.username }, PRIVATEKEY, {expiresIn: 36000})
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