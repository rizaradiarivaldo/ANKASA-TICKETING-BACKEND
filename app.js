const express = require('express')
// const bodyParser = require('body-parser')
const { PORT } = require('./src/helpers/env')
const airlinesRouter = require('./src/routes/airlines')

const app = express()

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World !')
})
app.use("/airlines", airlinesRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})