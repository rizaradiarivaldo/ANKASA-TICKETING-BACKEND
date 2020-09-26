const express = require('express')
const airlinesController = require('../controllers/airlines')
const { getAirlines } = require('../helpers/redis')
const router = express.Router();
const upload = require("../helpers/uploads");

router
  .get("/getall", getAirlines, airlinesController.getAll)
  .get("/getdetail/:id", airlinesController.getDetail)
  .post("/insert", airlinesController.insert)
  .delete("/delete/:id", airlinesController.delete)
  .patch('/update/:id', upload.single("image"), airlinesController.update)



module.exports = router