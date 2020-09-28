const express = require('express')
const countriesController = require('../controllers/countries')
const router = express.Router()

router
  .get('/getAll', countriesController.getAll)
  .get('/getDetail/:id', countriesController.getDetail)
  .post('/insert', countriesController.insert)
  .patch('/update/:id', countriesController.update)
  .delete('/delete/:id', countriesController.delete)

module.exports = router