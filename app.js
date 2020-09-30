const express = require('express')
const bodyParser = require('body-parser')
const { PORT } = require('./src/helpers/env')
const userRouter = require('./src/routes/users')
const airlinesRouter = require('./src/routes/airlines')
const flightRouter = require('./src/routes/flight')
const bookingRouter = require('./src/routes/booking')
const countriesRouter = require('./src/routes/countries')
const citiesRouter = require('./src/routes/cities')

const path = require('path')
const ejs = require('ejs')

const app = express()

app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('src/uploads'))

app.use('/users', userRouter)
app.use('/airlines', airlinesRouter);
app.use('/flight', flightRouter)
app.use('/booking', bookingRouter)
app.use('/countries', countriesRouter)
app.use('/cities', citiesRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
