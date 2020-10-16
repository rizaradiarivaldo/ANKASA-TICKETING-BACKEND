const express = require('express')
const airlinesController = require('../controllers/airlines')
const router = express.Router();
const { admin, authentication, authorization } = require('../helpers/auth')

router
  .get("/getall", authentication, authorization, airlinesController.getAll)
  .get("/getdetail/:id", authentication, authorization, airlinesController.getDetail)
  .post("/insert", authentication, authorization, admin, airlinesController.insert)
  .delete("/delete/:id", authentication, authorization, admin, airlinesController.delete)
  .patch('/update/:id', authentication, authorization, admin, airlinesController.update)


module.exports = router