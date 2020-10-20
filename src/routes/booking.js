const express = require('express')
const bookingController = require('../controllers/booking')
const router = express.Router()
const { admin, authentication, authorization } = require('../helpers/auth')

router
    .get('/getAll', authentication, authorization, bookingController.getAllData)
    .get('/getDetail/:idbooking', authentication, authorization, bookingController.getDetail)
    .get('/getBookingUser/:idusers', authentication, authorization, bookingController.getBookingUser)
    .post('/insert', authentication, authorization, bookingController.insert)
    .patch('/update/:idbooking', admin, authentication, authorization, bookingController.update)
    .delete('/delete/:idbooking', admin, authentication, authorization, bookingController.delete)

module.exports = router