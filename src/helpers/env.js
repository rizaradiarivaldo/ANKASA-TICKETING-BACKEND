require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    PRIVATEKEY: process.env.PRIVATEKEY,
    REFRESHTOKEN: process.env.REFRESHTOKEN,
    EMAIL: process.env.EMAIL,
    PASSWORD_EMAIL: process.env.PASSWORD_EMAIL
}