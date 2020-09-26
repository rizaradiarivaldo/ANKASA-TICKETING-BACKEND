const express = require('express')
const bodyParser = require('body-parser')
const { PORT } = require('./src/helpers/env')
const userRouter = require('./src/routes/users')
const airlinesRouter = require('./src/routes/airlines')
const bookingRouter = require('./src/routes/booking')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/users', userRouter)
app.use("/airlines", airlinesRouter);
app.use('/booking', bookingRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})