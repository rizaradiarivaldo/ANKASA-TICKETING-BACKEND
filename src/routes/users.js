const express = require('express')
const userController = require('../controllers/users')

const router = express.Router()

router
    .post('/register', userController.register)
    .post('/login', userController.login)
    .post('/refreshToken', userController.requestToken)
    .get('/active/:token', userController.active)

module.exports = router