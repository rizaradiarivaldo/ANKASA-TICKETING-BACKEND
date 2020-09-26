const express = require('express')
const airlinesController = require('../controllers/airlines')
const { getAirlines } = require('../helpers/redis')
const router = express.Router();

router
  .get("/getall", getAirlines, airlinesController.getAll)
  .get("/getdetail/:id", airlinesController.getDetail)
  .post("/insert", airlinesController.insert)



module.exports = router