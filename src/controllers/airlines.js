const upload = require('../../../pos-backend/src/helpers/uploads')
const airlinesModel = require('../models/airlines')
// const upload = require("../helpers/uploads");

const airlines = {
  insert: (req, res) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          const result = {
            message: 'Size image must less 2mb',
            success: false,
            code: 200,
            data: data,
          };
          res.json(result).status(200);
        } else {
          const result = {
            message: err.message,
            success: false,
            code: 500,
            data: data,
          };
          res.json(result).status(500);
        }
      } else {
        const body = req.body;
        body.image = !req.file.filename ? req.file : req.file.filename
        airlinesModel.insert(body)
        .then((result) => {
          const results = {
            message: err.message,
            success: false,
            code: 500,
            data: results,
          };
          res.json(result).status(200);
        }).catch((err) => {
          const result = {
            message: err.message,
            success: false,
            code: 500,
            data: data,
          };
          res.json(result).status(500);
        });
      }
    })

  }
}

module.exports = airlines