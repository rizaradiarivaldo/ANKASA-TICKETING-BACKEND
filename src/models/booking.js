const db = require('../configs/db')

const booking = {
    getAllData: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT idbooking, users.idusers, email,phone, username, city, address, postcode, users.image as imageusers, flight.idflight,airlines.idairlines,nameairlines,
            airlines.image as imageairlines, fromcity.idcities, 
            fromcity.namecity as fromnamecity, fromcountry.idcountries, fromcountry.namecountries as fromcountry,fromcountry.alias as fromalias, 
            tocity.idcities, tocity.namecity as tonamecity, tocountry.idcountries, 
            tocountry.namecountries as tocountry,tocountry.alias as toalias,code,classflight,typeflight,child,
            adult,transit,direct,moretransit,luggage,meal,wifi,date_departure,
            departure,arrived,price,rating,total_reviewed, title, fullname, nationality, insurance, payment_status, terminal, gate, total, booking.created_at FROM (((((((booking INNER JOIN users ON booking.idusers= users.idusers) INNER JOIN flight ON booking.idflight=flight.idflight) INNER JOIN airlines ON flight.idairlines=airlines.idairlines) 
            INNER JOIN cities as fromcity on flight.idfromcity=fromcity.idcities) 
            INNER JOIN countries as fromcountry ON fromcity.idcities=fromcountry.idcountries)
            INNER JOIN cities as tocity on flight.idtocity=tocity.idcities) 
            INNER JOIN countries as tocountry on tocity.idcities=tocountry.idcountries)`, (err, result) => {
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
            db.query(`SELECT idbooking, users.idusers, email,phone, username, city, address, postcode, users.image as imageusers, flight.idflight,airlines.idairlines,nameairlines,
            airlines.image as imageairlines, fromcity.idcities, 
            fromcity.namecity as fromnamecity, fromcountry.idcountries, fromcountry.namecountries as fromcountry,fromcountry.alias as fromalias, 
            tocity.idcities, tocity.namecity as tonamecity, tocountry.idcountries, 
            tocountry.namecountries as tocountry,tocountry.alias as toalias,code,classflight,typeflight,child,
            adult,transit,direct,moretransit,luggage,meal,wifi,date_departure,
            departure,arrived,price,rating,total_reviewed, title, fullname, nationality, insurance, payment_status, terminal, gate, total, booking.created_at FROM (((((((booking INNER JOIN users ON booking.idusers= users.idusers) INNER JOIN flight ON booking.idflight=flight.idflight) INNER JOIN airlines ON flight.idairlines=airlines.idairlines) 
            INNER JOIN cities as fromcity on flight.idfromcity=fromcity.idcities) 
            INNER JOIN countries as fromcountry ON fromcity.idcities=fromcountry.idcountries)
            INNER JOIN cities as tocity on flight.idtocity=tocity.idcities) 
            INNER JOIN countries as tocountry on tocity.idcities=tocountry.idcountries)
            WHERE users.idbooking=${id}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getBookingUser: (idusers) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT idbooking, users.idusers, email,phone, username, city, address, postcode, users.image as imageusers, flight.idflight,airlines.idairlines,nameairlines,
            airlines.image as imageairlines, fromcity.idcities, 
            fromcity.namecity as fromnamecity, fromcountry.idcountries, fromcountry.namecountries as fromcountry,fromcountry.alias as fromalias, 
            tocity.idcities, tocity.namecity as tonamecity, tocountry.idcountries, 
            tocountry.namecountries as tocountry,tocountry.alias as toalias,code,classflight,typeflight,child,
            adult,transit,direct,moretransit,luggage,meal,wifi,date_departure,
            departure,arrived,price,rating,total_reviewed, title, fullname, nationality, insurance, payment_status, terminal, gate, total, booking.created_at FROM (((((((booking INNER JOIN users ON booking.idusers= users.idusers) INNER JOIN flight ON booking.idflight=flight.idflight) INNER JOIN airlines ON flight.idairlines=airlines.idairlines) 
            INNER JOIN cities as fromcity on flight.idfromcity=fromcity.idcities) 
            INNER JOIN countries as fromcountry ON fromcity.idcities=fromcountry.idcountries)
            INNER JOIN cities as tocity on flight.idtocity=tocity.idcities) 
            INNER JOIN countries as tocountry on tocity.idcities=tocountry.idcountries)
            WHERE users.idusers=${idusers}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    insert: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO booking (idusers, idflight, title, fullname, nationality, insurance, payment_status, terminal, gate, total) VALUES ('${data.idusers}', '${data.idflight}','${data.title}','${data.fullname}','${data.nationality}','${data.insurance}','${data.payment_status}','${data.terminal}','${data.gate}','${data.total}')`, (err, result) => {
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
            db.query(`UPDATE booking SET ? WHERE idbooking = ?`, [data, id], (err, result) => {
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
            db.query(`DELETE FROM booking WHERE idbooking='${id}'`, (err, result) => {
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