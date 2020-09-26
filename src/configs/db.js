const mysql = require('mysql2')
const { DB_HOST, DB_USERNAME, DB_NAME } = require('../helpers/env')

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    database: DB_NAME
})

module.exports = connection