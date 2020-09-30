const express = require('express')
const flightController = require('../controllers/flight')
const { admin, authentication, authorization } = require('../helpers/auth')
const router = express.Router();

router
  .get("/getall", flightController.getAll)
  .get("/getdetail/:id", authentication, authorization, flightController.getDetail)
  .post("/insert", authentication, authorization, admin, flightController.insert)
  .delete("/delete/:id", authentication, authorization, admin, flightController.delete)
  .patch('/update/:id', authentication, authorization, admin, flightController.update)


module.exports = router