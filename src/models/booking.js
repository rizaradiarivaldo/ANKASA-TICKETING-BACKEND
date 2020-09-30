const db = require('../configs/db')

const booking = {
    insert: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO booking (id_user, id_flight, title, fullname, nationality, insurance, payment_status, terminal, gate, total) VALUES ('${data.id_user}', '${data.id_flight}','${data.title}','${data.fullname}','${data.nationality}','${data.insurance}','${data.payment_status}','${data.terminal}','${data.gate}','${data.total}')`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    update: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE booking SET ? WHERE id = ?`, [data, id], (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT booking.id as id_booking, users.id as id_user, users.username, users.city, users.address, users.postcode, flight.id, airlines.name as name_airlines, c.name as fromcountry, d.name as tocountry, flight.date_departure, airlines.image, flight.code, flight.classflight, title, fullname, nationality, insurance, payment_status, terminal, gate, total  FROM (((((((booking INNER JOIN users ON booking.id_user = users.id) INNER JOIN flight on booking.id_flight = flight.id) INNER JOIN airlines ON flight.id_airlines = airlines.id) INNER JOIN cities as a on flight.from_city = a.id ) INNER JOIN cities as b on flight.to_city = b.id) INNER JOIN countries as c on a.id_country = c.id) INNER JOIN countries as d on b.id_country = d.id)`, (err, result) => {
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
            db.query(`SELECT booking.id as id_booking, users.id as id_user, users.username, users.city, users.address, users.postcode, flight.id, airlines.name as name_airlines, c.name as fromcountry, d.name as tocountry, flight.date_departure, airlines.image, flight.code, flight.classflight, title, fullname, nationality, insurance, payment_status, terminal, gate, total  FROM (((((((booking INNER JOIN users ON booking.id_user = users.id) INNER JOIN flight on booking.id_flight = flight.id) INNER JOIN airlines ON flight.id_airlines = airlines.id) INNER JOIN cities as a on flight.from_city = a.id ) INNER JOIN cities as b on flight.to_city = b.id) INNER JOIN countries as c on a.id_country = c.id) INNER JOIN countries as d on b.id_country = d.id) WHERE booking.id='${id}'`, (err, result) => {
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
            db.query(`DELETE FROM booking WHERE id='${id}'`, (err, result) => {
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