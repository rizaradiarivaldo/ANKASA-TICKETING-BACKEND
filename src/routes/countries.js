const express = require('express')
const countriesController = require('../controllers/countries')
const { admin, authentication, authorization } = require('../helpers/auth')

const router = express.Router()

router
  .get('/getAll', authentication, authorization, countriesController.getAllData)
  .get('/getDetail/:idcountries', authentication, authorization, countriesController.getDetail)
  .post('/insert', authentication, authorization, admin, countriesController.insert)
  .patch('/update/:idcountries', authentication, authorization, admin, countriesController.update)
  .delete('/delete/:idcountries', authentication, authorization, admin, countriesController.delete)

module.exports = router