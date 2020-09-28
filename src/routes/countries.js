const express = require('express')
const countriesController = require('../controllers/countries')
const { getAllCountry } = require('../helpers/redis')
const { admin, authentication, authorization } = require('../helpers/auth')

const router = express.Router()

router
  .get('/getAll', authentication, authorization, getAllCountry, countriesController.getAll)
  .get('/getDetail/:id', authentication, authorization, countriesController.getDetail)
  .post('/insert', authentication, authorization, admin, countriesController.insert)
  .patch('/update/:id', authentication, authorization, admin, countriesController.update)
  .delete('/delete/:id', authentication, authorization, admin, countriesController.delete)

module.exports = router