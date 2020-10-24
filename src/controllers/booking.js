const bookingModel = require('../models/booking')
const { success, failed } = require('../helpers/response')
const upload = require('../helpers/uploads')
const fs = require('fs')
const response = require('../helpers/response')

const booking = {
    getAllData: (req, res) => {
        try {
            bookingModel.getAllData().then((result) => {
                success(res, result, 'Get all data success')
            }).catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], error.message)
        }
    },
    getDetail: (req, res) => {
        try {
            const id = req.params.idbooking

            bookingModel.getDetail(id).then((result) => {
                if (result.length === 0) {
                    notfound(res, [], 'Data not found')
                } else {
                    success(res, result, 'Get detail success')
                }
            }).catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], error.message)
        }
    },
    getBookingUser: (req, res) => {
        try {
            const idusers = req.params.idusers
            bookingModel.getBookingUser(idusers).then((result) => {
                if (result.length === 0) {
                    notfound(res, [], 'Data not found')
                } else {
                    success(res, result, `Get data booking where ID users: ${idusers} success`)
                }
            }).catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], error.message)
        }
    },
    insert: (req, res) => {
        try {
            const body = req.body
            bookingModel.insert(body).then((result) => {
                success(res, result, 'Booking success')
            }).catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], error.message)
        }
    },
    update: (req, res) => {
        try {
            const id = req.params.idbooking
            const body = req.body
            bookingModel.update(body, id).then((result) => {
                success(res, result, 'Update success')
            }).catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], error.message)
        }
    },

    delete: (req, res) => {
        try {
            const id = req.params.idbooking
            bookingModel.delete(id).then((result) => {
                success(res, result, 'Delete success')
            }).catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], error.message)
        }
    },
    
    updatePayment: (req, res) => {
        try {
            upload.single('image')(req, res, (err) => {
                if (err) {
                    if (err.code === 'LIMIT_FILE_SIZE') {
                        failed(res, [], 'File size max 2Mb')
                    } else {
                        failed(res, [], err)
                    }
                } else {
                    const id = req.params.idbooking
                    const body = req.body

                    bookingModel.getDetail(id).then((result) => {
                        const oldImg = result[0].image
                        body.image = !req.file ? oldImg : req.file.filename

                        if (oldImg !== null) {
                            if (body.image !== oldImg) {
                                fs.unlink(`src/uploads/${oldImg}`, (err) => {
                                    if (err) {
                                        failed(res, [], err.message)
                                    } else {
                                        bookingModel.updatePayment(body, id).then((result) => {
                                            success(res, result, 'Update payment success')
                                        }).catch((err) => {
                                            failed(res, [], err.message)
                                        })
                                    }
                                })
                            } else {
                                bookingModel.updatePayment(body, id).then((result) => {
                                    success(res, result, 'Update payment success')
                                }).catch((err) => {
                                    failed(res, [], err.message)
                                })
                            }
                        } else {
                            bookingModel.updatePayment(body, id).then((result) => {
                                success(res, result, 'Update payment success')
                            }).catch((err) => {
                                failed(res, [], err.message)
                            })
                        }
                    }).catch((err) => {
                        failed(res, [], err.message)
                    })
                }
            })
        } catch (error) {
            failed(res, [], error.message)
        }
    }
}

module.exports = booking