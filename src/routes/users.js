const express = require('express')
const userController = require('../controllers/users')

const router = express.Router()

router
    .post('/register', userController.register)
    .post('/login', userController.login)
    .post('/refreshToken', userController.requestToken)
    .get('/active/:token', userController.active)
    .patch('/update/:id', userController.updateData)
    // .post('/reset', userController.resetPassword)
    // .post('/confirm', userController.confirmPassword)

module.exports = router