const db = require('../configs/db')

const users = {
    register: (data, img) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO users (email, password, username, status, role, image) VALUES ('${data.email}','${data.password}','${data.username}', 0, 2, '${img}')`, (err, result) => {
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

    getAllUser: () => {
        return new Promise((resolve, result) => {
            db.query(`SELECT * FROM users`, (err, result) => {
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
            db.query(`SELECT * FROM users WHERE id = '${id}'`, (err, result) => {
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
    }

    // searchEmail: (email) => {
    //     return new Promise((resolve, reject) => {
    //         db.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
    //             if (err) {
    //                 reject(new Error(err))
    //             } else {
    //                 resolve(result)
    //             }
    //         })
    //     })
    // },

    // updateKeyReset: (key, email) => {
    //     return new Promise((resolve, reject) => {
    //         db.query(`UPDATE users SET key_reset='${key}' WHERE email='${email}'`, (err, result) => {
    //             if (err) {
    //                 reject(new Error(err))
    //             } else {
    //                 resolve(result)
    //             }
    //         })
    //     })
    // },

    // setNewPassword: (password, key) => {
    //     return new Promise((resolve, reject) => {
    //         db.query(`UPDATE users SET password='${password}', key_reset=null WHERE key='${key}'`, (err, result) => {
    //             if (err) {
    //                 reject(new Error(err))
    //             } else {
    //                 resolve(result)
    //             }
    //         })
    //     })
    // }
}

module.exports = users