const express = require('express')
const citiesController = require('../controllers/cities')
const router = express.Router()
const { admin, authentication, authorization } = require('../helpers/auth')

router
    .get('/getAll', citiesController.getAll)
    .get('/getDetail/:idcities', citiesController.getDetail)
    .post('/insert', authentication, authorization, admin, citiesController.insert)
    .patch('/update/:idcities', authentication, authorization, admin, citiesController.update)
    .delete('/delete/:idcities', authentication, authorization, admin, citiesController.delete)

module.exports = router