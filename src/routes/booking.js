const express = require('express')
const bookingController = require('../controllers/booking')
const { getBooking } = require('../helpers/redis')
const router = express.Router()
const { admin, authentication, authorization } = require('../helpers/auth')

router
    .get('/getAll', authentication, authorization, getBooking, bookingController.getAll)
    .get('/getDetail/:id', authentication, authorization, bookingController.getDetail)
    .post('/insert', authentication, authorization, bookingController.insert)
    .patch('/update/:id', admin, authentication, authorization, bookingController.update)
    .delete('/delete/:id', admin, authentication, authorization, bookingController.delete)

module.exports = router