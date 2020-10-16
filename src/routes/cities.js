const express = require('express')
const citiesController = require('../controllers/cities')
const router = express.Router()
const { admin, authentication, authorization } = require('../helpers/auth')

router
    .get('/getAll', authentication, authorization, citiesController.getAll)
    .get('/getDetail/:id', authentication, authorization, citiesController.getDetail)
    .post('/insert', authentication, authorization, admin, citiesController.insert)
    .patch('/update/:id', authentication, authorization, admin, citiesController.update)
    .delete('/delete/:id', authentication, authorization, admin, citiesController.delete)

module.exports = router