const express = require('express')
const bookingController = require('../controllers/booking')
const { getBooking } = require('../helpers/redis')
const router = express.Router()

router
    .get('/getAll', getBooking, bookingController.getAll)
    .get('/getDetail/:id', bookingController.getDetail)
    .post('/insert', bookingController.insert)
    .patch('/update/:id', bookingController.update)
    .delete('/delete/:id', bookingController.delete)

module.exports = router