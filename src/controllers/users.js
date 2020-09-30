const userModel = require('../models/users')
const { success, failed, tokenResult } = require('../helpers/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PRIVATEKEY, REFRESHTOKEN } = require('../helpers/env')
const nodemailer = require('nodemailer')
const env = require('../helpers/env')
const fs = require('fs')

const users = {
    register: async (req, res) => {
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
                    from: '"Ankasa" <testerweb533@gmail.com>',
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
                } else {
                    failed(res, [], err.message)
                }
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
            const usersData = {
                username: body.username,
                password: body.password,
            }
            userModel.login(usersData).then(async (result) => {
                const results = result[0]
                const id = results.id

                if (!results) {
                    failed(res, [], 'Email not registered, Please register!')
                } else {
                    const password = results.password

                    const isMatch = bcrypt.compareSync(usersData.password, password)

                    if (isMatch) {
                        if (results.status === 1) {
                            const dataUser = {
                                username: results.username,
                                role: results.role
                            }

                            const refreshToken = jwt.sign(dataUser, REFRESHTOKEN)
                            const token = newerToken(dataUser)

                            if (results.refreshToken === null) {
                                userModel.updateRefreshToken(refreshToken, id).then((result) => {
                                    const data = {
                                        token,
                                        refreshToken: refreshToken
                                    }
                                    tokenResult(res, data, 'Login success')
                                }).catch((err) => {
                                    failed(res, [], err.message)
                                })
                            } else {
                                const data = {
                                    token,
                                    refreshToken: refreshToken
                                }
                                tokenResult(res, data, 'Login successful')
                            }
                        } else {
                            failed(res, [], 'Activation needed!')
                        }
                    } else {
                        failed(res, [], 'Password is wrong')
                    }
                }
            }).catch((err) => {
                if (err.message === `Cannot read property 'id' of undefined`) {
                    failed(res, [], 'Username is wrong')
                } else {
                    failed(res, [], err.message)
                }
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
        const tokenReq = req.body.refreshToken
        if (!tokenReq) {
          failed(res, [], 'Token must have a value!')
        } else {
          jwt.verify(tokenReq, REFRESHTOKEN, (err, result) => {
            const newtoken = newerToken({ username: result.username, role: result.role })
            res.json({ newtoken: newtoken })
          })
        }
    },

    // resetPassword: (req, res) => {
    //     try {
    //         const email = req.body.email
    //         userModel.searchEmail(email).then((result) => {
    //             if (!result[0]) {
    //                 failed(res, [], 'Email invalid')
    //             } else {
    //                 const key = Math.floor(Math.random(111999777) * Math.floor(222999777))
    //                 userModel.updateKeyReset(key, email).then((result) => {
    //                     success(res, result, 'Check your email for reset password')
                        
    //                     const output = `<center>
    //                         <h4>Reset Password</h4>
    //                         <p>You can confirm email by clicking the link below
    //                             <a href="">Reset Password</a>
    //                         </p>
    //                         </center>`
                        
    //                         let transporter = nodemailer.createTransport({
    //                             host: 'smtp.gmail.com',
    //                             port: 587,
    //                             secure: false,
    //                             requireTLS: true,
    //                             auth: {
    //                                 user: env.EMAIL,
    //                                 pass: env.PASSWORD_EMAIL
    //                             }
    //                         })

    //                         let Mail = {
    //                             from: '"Ankasa"',
    //                             to: req.body.email,
    //                             subject: "Verification Email",
    //                             text: "Plaintext version of the message",
    //                             html: output
    //                         }
    //                         transporter.sendMail(Mail)
    //                 }).catch((err) => {
    //                     failed(res, [], err.message)
    //                 })
    //             }
    //         }).catch((err) => {
    //             failed(res, [], err.message)
    //         })
    //     } catch (error) {
    //         failed(res, [], 'Internal Server Error')
    //     }
    // },

    // confirmPassword: async (req, res) => {
    //     try {
    //         const body = req.body
    //         const key = req.body.key

    //         if (body.password !== body.confirmPwd) {
    //             failed(res, [], 'password and confirmation password do not match')
    //         } else {
    //             if (!key) {
    //                 failed(res, [], 'Key reset not found')
    //             } else {
    //                 const password = body.password
    //                 const salt = await bcrypt.genSalt(1)
    //                 const hashPwd = await bcrypt.hash(password, salt)

    //                 userModel.setNewPassword(hashPwd, key).then((result) => {
    //                     success(res, result, 'Reset password success')
    //                 }).catch((err) => {
    //                     failed(res, [], err.message)
    //                 })
    //             }
    //         }
    //     } catch (error) {
    //         failed(res, [], 'Internal Server Error')
    //     }
    // }
}

const newerToken = (userData) => {
    return jwt.sign(userData, PRIVATEKEY, { expiresIn: 3600 })
}

module.exports = users