const express = require('express')
const flightController = require('../controllers/flight')
const { admin, authentication, authorization } = require('../helpers/auth')
const router = express.Router();

router
  .get("/getAll", authentication, authorization,flightController.getAll)
  .get("/getDetail/:idflight", authentication, authorization, flightController.getDetail)
  .post("/insert", authentication, authorization, admin, flightController.insert)
  .delete("/delete/:idflight", authentication, authorization, admin, flightController.delete)
  .patch('/update/:idflight', authentication, authorization, admin, flightController.update)


module.exports = router