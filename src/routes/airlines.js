const express = require('express')
const airlinesController = require('../controllers/airlines')
const router = express.Router();
const { admin, authentication, authorization } = require('../helpers/auth')

router
  .get("/getall", authentication, authorization, airlinesController.getAllData)
  .get("/getdetail/:idairlines", authentication, authorization, airlinesController.getDetail)
  .post("/insert", authentication, authorization, admin, airlinesController.insert)
  .delete("/delete/:idairlines", authentication, authorization, admin, airlinesController.delete)
  .patch('/update/:idairlines', authentication, authorization, admin, airlinesController.update)


module.exports = router