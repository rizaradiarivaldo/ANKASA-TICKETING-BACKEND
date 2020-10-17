const citiesModel = require('../models/cities')
const upload = require('../helpers/uploads')
const { success, failed, notfound } = require('../helpers/response')
const fs = require('fs')

const cities = {
    getAll: (req, res) => {
        try {
            citiesModel.getAll().then((result) => {
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
            const id = req.params.idcities
            citiesModel.getDetail(id).then((result) => {
                if (result.length === 0) {
                    notfound(res, [], 'Data not found')
                } else {
                    success(res, result, `Get detail by ID: ${id} success`)
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
            upload.single('image')(req, res, (err) => {
                if (err) {
                    if (err.code === 'LIMIT_FILE_SIZE') {
                        failed(res, [], 'Image must less than 2mb')
                    } else {
                        failed(res, [], err.message)
                    }
                } else {
                    const body = req.body
                    body.image = !req.file ? undefined : req.file.filename
                    if (body.image === undefined) {
                        failed(res, [], 'Image must have value')
                    } else {
                        citiesModel.insert(body).then((result) => {
                            success(res, result, 'Insert data success !')
                        }).catch((err) => {
                            failed(res, [], err.message)
                        })
                    }
                }
            })
        } catch (error) {
            failed(res, [], error.message)
        }
    },
    update: (req, res) => {
        try {
            upload.single('image')(req, res, (err) => {
                if (err) {
                    if (err.code === 'LIMIT_FILE_SIZE') {
                        failed(res, [], 'Image must less than 2mb')
                    } else {
                        failed(res, [], err.message)
                    }
                } else {
                    const id = req.params.idcities
                    const body = req.body
                    citiesModel.getDetail(id).then((response) => {
                        const results = response[0].imagecities
                        const oldImage = results
                        body.image = !req.file ? oldImage : req.file.filename

                        if (body.image !== oldImage) {
                            if (oldImage !== null) {
                                fs.unlink(`src/uploads/${oldImage}`, (err) => {
                                    if (err) {
                                        failed(res, [], err.message)
                                    } else {
                                        citiesModel.update(body, id).then((result) => {
                                            success(res, result, 'Update success')
                                        }).catch((err) => {
                                            failed(res, [], err.message)
                                        })
                                    }
                                })
                            } else {
                                citiesModel.update(body, id).then((result) => {
                                    success(res, result, 'Update success')
                                }).catch((err) => {
                                    failed(res, [], err.message)
                                })
                            }
                        } else {
                            citiesModel.update(body, id).then((result) => {
                                success(res, result, 'Update success')
                            }).catch((err) => {
                                failed(res, [], err.message)
                            })
                        }
                    })
                }
            })
        } catch (error) {
            failed(res, [], error.message)
        }
    },
    delete: (req, res) => {
        try {
            const id = req.params.idcities
            citiesModel.getDetail(id).then((result) => {
                const dataImages = result[0].imagecities
                fs.unlink(`src/uploads/${dataImages}`, (err) => {
                    if (err) {
                        failed(res, [], err.message)
                    } else {
                        citiesModel.delete(id).then((result) => {
                            success(res, result, 'Delete data success')
                        }).catch((err) => {
                            failed(res, [], err.message)
                        })
                    }
                })
            }).catch((err) => {
                failed(res, [], err.message)
            })
        } catch (error) {
            failed(res, [], error.message)
        }
    }
}

module.exports = cities