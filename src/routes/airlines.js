const express = require('express')
const airlinesController = require('../controllers/airlines')

const router = router.express()

router
// .get("/getall", airlinesController.getall)
.post("/insert", airlinesController.insert)
