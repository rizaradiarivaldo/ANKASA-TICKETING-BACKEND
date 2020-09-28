const db = require('../configs/db')

const users = {
    register: (data, generate) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO users (email, password, username, status, role, image) VALUES ('${data.email}','${generate}','${data.username}', 0, 2, 'default.jpg')`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    login: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE username = ?`, data.username, (err, result) => {
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
            db.query(`SELECT FROM users WHERE id = '${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    updateUser: (email) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET status = 1 WHERE email='${email}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    updateAllData: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET ? WHERE id = ?`, [data, id], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },

    updateRefreshToken: (token, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET refreshToken='${token}' WHERE id='${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    
    // updateRefreshToken: (token, id) => {
    //     return new Promise((resolve, reject) => {
    //         db.query(`UPDATE users SET refreshToken='${token}' WHERE id='${id}'`, (err, result) => {
    //             if (err) {
    //                 reject(new Error(err))
    //             } else {
    //                 resolve(result)
    //             }
    //         })
    //     })
    // },
    checkRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE refreshToken='${refreshToken}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }
}

module.exports = users