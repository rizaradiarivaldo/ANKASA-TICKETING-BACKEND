const db = require('../configs/db')

const cities = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT idcities, countries.idcountries,namecity, namecountries,alias, image as imagecities,cities.created_at FROM cities INNER JOIN countries ON cities.idcountries=countries.idcountries`, (err, result) => {
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
            db.query(`SELECT idcities, countries.idcountries,namecity, namecountries,alias, image as imagecities,cities.created_at FROM cities INNER JOIN countries ON cities.idcountries=countries.idcountries WHERE idcities='${id}'`, (err, result) => {
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
            db.query(`INSERT INTO cities (idcountries, namecity, image) VALUES ('${data.idcountries}','${data.namecity}','${data.image}')`, (err, result) => {
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
            db.query(`UPDATE cities SET ? WHERE idcities = ?`, [data, id], (err, result) => {
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
            db.query(`DELETE FROM cities WHERE idcities = '${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = cities