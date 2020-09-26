const upload = require('../../../pos-backend/src/helpers/uploads')
const airlinesModel = require('../models/airlines')
const upload = require("../helpers/uploads");
const { success, failed, tokenResult } = require('../helpers/response')

const airlines = {
  insert: (req, res) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          failed(res, [], 'Image must less 2mb')
        } else {
          failed(res, [], err.message)
        }
      } else {
        const body = req.body;
        body.image = !req.file.filename ? req.file : req.file.filename
        airlinesModel.insert(body)
          .then((result) => {
            redisClient.del("airlines")
            success(res, result, `Insert data success!`)
          }).catch((err) => {
            failed(res, [], err.message)
          });
      }
    })
  }
}

module.exports = airlines