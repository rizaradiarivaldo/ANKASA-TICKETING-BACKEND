const userModel = require('../models/users')
const { success, failed, tokenResult } = require('../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PRIVATEKEY, REFRESHTOKEN } = require('../helpers/env')
const nodemailer = require('nodemailer')
const env = require('../helpers/env')
const fs = require('fs')

const users = {
    register: async (req, res, next) => {
        try {
            const body = req.body
            const password = req.body.password
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const img = "default.jpg"
            userModel.register(body, hashPassword, img).then((result) => {
                const token = jwt.sign({ email: body.email }, PRIVATEKEY)
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
                })

                let Mail = {
                    from: 'ankasa.com',
                    to: req.body.email,
                    subject: "Verification Email",
                    text: "Plaintext version of the message",
                    html: output
                }

                transporter.sendMail(Mail)
                success(res, result, 'Please check your email to activation')
            }).catch((err) => {
                if (err.message = 'Duplicate entry') {
                    failed(res, [], 'Email Already Exist')
                }
                // failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], 'Internal Server Error')
        }
    },
    active: (req, res) => {
        try {
            const token = req.params.token
            jwt.verify(token, PRIVATEKEY, (err, decode) => {
                if (err) {
                failed(res, [], 'Failed authorization!')
                } else {
                    const data = jwt.decode(token)
                    const email = data.email
                    userModel.updateUser(email).then((result) => {
                        res.render('index', { email })
                    }).catch(err => {
                        failed(res, [], err.message)
                    })
                }
            })
        } catch (error) {
            failed(res, [], 'Internal Server Error')
        }
    },
    login: async (req, res) => {
        try {
            const body = req.body
            userModel.login(body).then(async (result) => {
                if (!result[0]) {
                    failed(res, [], 'Username not registered, Please register!')
                } else {
                    const results = result[0]
                    const password = results.password
                    const userRefreshToken = results.refreshToken
                    const isPasswordMatch = await bcrypt.compare(body.password, password)

                    const dataUser = {
                        username: results.username,
                        role: results.role
                    }

                    if (results.status === 0) {
                        failed(res, [], 'Activate your email first')
                    } else {
                        if (!isPasswordMatch) {
                            failed(res, [], 'Password is wrong')
                        } else {
                            jwt.sign({ dataUser }, PRIVATEKEY, {expiresIn: 3600},
                                (err, token) => {
                                if (err) {
                                        console.log(err)
                                } else {
                                    if (userRefreshToken === null) {
                                        const refreshToken = jwt.sign({ dataUser }, REFRESHTOKEN)
                                        const token = newerToken(dataUser)
                                        userModel.updateRefreshToken(refreshToken, id).then((result) => {
                                            const data = {
                                                token: token,
                                                refreshToken: refreshToken
                                            }
                                            tokenResult(res, data, 'Login successful')
                                        }).catch((err) => {
                                            failed(res, [], err.message)
                                        })
                                    } else {
                                        const data = {
                                            token: token,
                                            refreshToken: userRefreshToken
                                        }
                                        tokenResult(res, data, 'Login successful')
                                    }
                                }
                            })
                        }
                    }
                }
            }).catch(() => {
                failed(res, [], 'Username is wrong')
            })
        } catch (error) {
            failed(res, [], 'Internal Server Error')
        }
    },
    updateData: (req, res) => {
        try {
            upload.single('image')(req, res, (err) => {
                if (err) {
                    if (err.code === 'LIMIT_FILE_SIZE') {
                        failed(res, [], 'File size max 2Mb')
                    } else {
                        failed(res, [], err)
                    }
                } else {
                    const id = req.params.id
                    userModel.getDetail(id)
                    .then((result) => {
                        const oldImg = result[0].image
                        body.image = !req.file ? oldImg : req.file.filename

                        if (body.image !== oldImg) {
                            if (oldImg !== 'default.jpg') {
                                fs.unlink(`src/upload/${oldImg}`, (err) => {
                                    if (err) {
                                        failed(res, [], err.message)
                                    } else {
                                        userModel.updateAllData(body, id).then((result) => {
                                            success(res, result, 'Update data success')
                                        }).catch((err) => {
                                            failed(res, [], err.message)
                                        })
                                    }
                                })
                            } else {
                                userModel.updateAllData(body, id).then((result) => {
                                    success(res, result, 'Update data success')
                                }).catch((err) => {
                                    failed(res, [], err.message)
                                })
                            }
                        } else {
                            userModel.updateAllData(body, id).then((result) => {
                                success(res, result, 'Update data success')
                            }).catch((err) => {
                                failed(res, [], err.message)
                            })
                        }
                    })
                    .catch((err) => {
                        failed(res, [], err.message)
                    })
                }
            })
        } catch (error) {
            failed(res, [], 'Internal Server Error')
        }
    },
    requestToken: (req, res) => {
        try {
            const refreshToken = req.body.refreshToken
            userModel.checkRefreshToken(refreshToken).then((result) => {
                if (result.length >= 1) {
                    const user = result[0]
                    const newToken = jwt.sign({ username: user.username }, PRIVATEKEY, {expiresIn: 36000})
                    const data = {
                        newToken: newToken
                    }
                    tokenResult(res, data, 'Refresh token success')
                } else {
                    failed(res, [], 'Refresh token not found')
                }
            }).catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], 'Internal Server Error')
        }
    }
}

const newerToken = (userData) => {
    return jwt.sign(userData, PRIVATEKEY, { expiresIn: '1h' })
}

module.exports = users