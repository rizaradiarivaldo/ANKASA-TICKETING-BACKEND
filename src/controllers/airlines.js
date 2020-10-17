const airlinesModel = require('../models/airlines')
const upload = require("../helpers/uploads");
const { success, successWithMeta, notfound, failed } = require('../helpers/response')
const fs = require('fs')

const airlines = {
  getAll: (req, res) => {
    try {
      const name = !req.query.name ? "" : req.query.name;
      const sort = !req.query.sort ? "id" : req.query.sort;
      const typesort = !req.query.typesort ? "ASC" : req.query.typesort;

      const limit = !req.query.limit ? 10 : parseInt(req.query.limit);
      const page = !req.query.page ? 1 : parseInt(req.query.page);
      const offset = page <= 1 ? 0 : (page - 1) * limit;

      airlinesModel
        .getAll(name, sort, typesort, limit, offset)
        .then((result) => {
          const totalRows = result[0].count;
          const meta = {
            total: totalRows,
            totalPage: Math.ceil(totalRows / limit),
            page: page,
          };
          successWithMeta(res, result, meta, "Get all data success");
        })
        .catch((err) => {
          failed(res, [], err.message);
        });
    } catch (error) {
      failed(res, [], 'Error Internal Server')
    }
  },

  getAllData: (req, res) => {
    try {
      airlinesModel
        .getAllData().then((result) => {
          success(res, result, "Get all data success");
        })
        .catch((err) => {
          failed(res, [], err.message);
        });
    } catch (error) {
      failed(res, [], 'Error Internal Server')
    }
  },

  getDetail: (req, res) => {
    try {
      const id = req.params.idairlines
      airlinesModel.getDetail(id)
        .then((result) => {
          if (result.length === 0) {
            notfound(res, [], 'Data not found!')
          } else {
            success(res, result, `Get detail by ID: ${id} success`)
          }
        }).catch((err) => {
          failed(res, [], err.message)
        });
    } catch (error) {
      failed(res, [], 'Internal Server Error')
    }
  },

  insert: (req, res) => {
    try {
      upload.single("image")(req, res, (err) => {
        if (err) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            failed(res, [], 'Image must less 2mb')
          } else {
            failed(res, [], err.message)
          }
        } else {
          const body = req.body;
          body.image = !req.file ? 'default.jpg' : req.file.filename

          airlinesModel.insert(body).then((result) => {
            success(res, result, `Insert data success!`)
          }).catch((err) => {
            failed(res, [], err.message)
          })
        }
      })
    } catch (error) {
      failed(res, [], error.me)
    }
  },
  update: (req, res) => {
    try {
      upload.single('image')(req, res, (err) => {
        if (err) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            failed(res, [], 'Image must less 2mb')
          } else {
            failed(res, [], err.message)
          }
        } else {
          const id = req.params.idairlines
          const body = req.body
          airlinesModel.getDetail(id)
            .then((response) => {
              const responses = response[0].image
              const oldImage = responses
              body.image = !req.file ? oldImage : req.file.filename

              if (body.image !== oldImage) {
                if (body.image !== 'default.jpg') {
                  fs.unlink(`src/uploads/${oldImage}`, (err) => {
                    if (err) {
                      failed(res, [], err.message)
                    } else {
                      airlinesModel.update(body, id)
                        .then((result) => {
                          success(res, result, 'Update success')
                        })
                        .catch((err) => {
                          failed(res, [], err.message)
                        })
                    }
                  })
                } else {
                  airlinesModel.update(body, id).then((result) => {
                    success(res, result, 'Update success')
                  }).catch((err) => {
                    failed(res, [], err.message)
                  })
                }
              } else {
                airlinesModel.update(body, id)
                  .then((result) => {
                    success(res, result, 'Update data success')
                  })
                  .catch((err) => {
                    failed(res, [], err.message)
                  })
              }
            })
        }
      })
    } catch (error) {
      failed(res, [], 'Internal Server Error')
    }
  },

  delete: (req, res) => {
    try {
      const id = req.params.idairlines
      airlinesModel.getDetail(id)
        .then((results) => {
          const dataImage = results[0].image
          fs.unlink(`src/uploads/${dataImage}`, (err) => {
            if (err) {
              failed(res, [], err.message)
            } else {
              airlinesModel.delete(id)
                .then((result) => {
                  success(res, result, `ID ${id} success deleted!`)
                }).catch((err) => {
                  failed(res, [], err.message)
                });
            }
          })
        }).catch((err) => {
          console.log(err)
        });
    } catch (error) {
      failed(res, [], 'Internal Server Error')
    }
  },
}
module.exports = airlines