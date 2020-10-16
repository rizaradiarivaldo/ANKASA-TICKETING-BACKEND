const bookingModel = require('../models/booking')
const { success, failed } = require('../helpers/response')

const booking = {
    insert: (req, res) => {
        try {
            const body = req.body
            bookingModel.insert(body).then((result) => {
                success(res, result, 'Booking success')
            }).catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], 'Internal Server Error')
        }
    },
    update: (req, res) => {
        try {
            const id = req.params.id
            const body = req.body
            bookingModel.update(body, id).then((result) => {
                success(res, result, 'Update success')
            })
        } catch (error) {
            failed(res, [], 'Internal Server Error')
        }
    },
    getAll: (req, res) => {
        try {
            bookingModel.getAll().then((result) => {
                success(res, result, 'Get all data success')
            }).catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], 'Internal Server Error')
        }
    },
    getDetail: (req, res) => {
        try {
            const id = req.params.id
            bookingModel.getDetail(id).then((result) => {
                success(res, result, 'Get detail success')
            }).catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], 'Internal Server Error')
        }
    },
    delete: (req, res) => {
        try {
            const id = req.params.id
            bookingModel.delete(id).then((result) => {
                success(res, result, 'Delete success')
            }).catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], 'Internal Server Error')
        }
    }
}

module.exports = booking