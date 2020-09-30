const { result } = require('lodash')
const db = require('../configs/db')

const booking = {
    insert: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO booking (id_user, id_flight, title, fullname, nationality, insurance, payment_status, terminal, gate, total) VALUES ('${data.id_user}', '${data.id_flight}','${data.title}','${data.fullname}','${data.nationality}','${data.insurance}','${data.payment_status}','${data.terminal}','${data.gate}','${data.total}')`), (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            }
        })
    },
    update: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE booking SET ? WHERE id=?`, [data, id], (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(err)
                }
            })
        })
    },
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * ((FROM booking INNER JOIN users ON booking.id_user = users.id) INNER JOIN flight ON booking.id_flight = flight.id`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getDetail: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT booking.id, users.username, users.phone, users.city, users.address, users.image, flight.date_departure, (SELECT COUNT(*) FROM booking) as count FROM booking INNER JOIN users ON booking.id_user = users.id, booking.id_flight = flight.id WHERE id='${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`'DELETE FROM booking WHERE id='${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = booking