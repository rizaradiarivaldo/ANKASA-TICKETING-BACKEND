require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_NAME: process.env.DB_NAME,
    JWTKEY: process.env.JWTKEY
}