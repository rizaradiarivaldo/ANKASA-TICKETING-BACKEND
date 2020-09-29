const express = require('express')
const flightController = require('../controllers/flight')
const { getAllFlight } = require('../helpers/redis')
const router = express.Router();
const upload = require("../helpers/uploads");

router
  .get("/getall",getAllFlight, flightController.getAll)
  .get("/getdetail/:id", flightController.getDetail)
  .post("/insert", flightController.insert)
  .delete("/delete/:id", flightController.delete)
  .patch('/update/:id', upload.single("image"), flightController.update)



module.exports = router