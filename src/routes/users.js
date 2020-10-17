const express = require('express')
const userController = require('../controllers/users')

const router = express.Router()

router
    .post('/register', userController.register)
    .post('/login', userController.login)
    .post('/refreshToken', userController.requestToken)
    .get('/active/:token', userController.active)
    .patch('/update/:idusers', userController.updateData)
    .get('/getDetail/:idusers', userController.getDetail)
    .get('/getAll', userController.getAll)
    // .post('/reset', userController.resetPassword)
    // .post('/confirm', userController.confirmPassword)

module.exports = router