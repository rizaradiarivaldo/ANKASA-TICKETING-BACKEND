const flightModel = require('../models/flight')
const upload = require("../helpers/uploads");
const { success, successWithMeta, notfound, failed } = require('../helpers/response')
const fs = require('fs')

const redis = require("redis");
const redisClient = redis.createClient();

const flight = {
  getAll: (req, res) => {
    try {
      const name = !req.query.name ? "" : req.query.name;
      const sort = !req.query.sort ? "id" : req.query.sort;
      const typesort = !req.query.typesort ? "ASC" : req.query.typesort;

      const limit = !req.query.limit ? 10 : parseInt(req.query.limit);
      const page = !req.query.page ? 1 : parseInt(req.query.page);
      const offset = page <= 1 ? 0 : (page - 1) * limit;

      flightModel
        .getAll(name, sort, typesort, limit, offset)
        .then((result) => {
          // redisClient.set("products", JSON.stringify(result));
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

      //getRedis 
      flightModel.getAllData()
        .then((results) => {
          redisClient.set('flight', JSON.stringify(results))
        }).catch((err) => {
          failed(res, [], err.message)
        });
    } catch (error) {
      failed(res, [], 'Error Internal Server')
    }
  },
  getDetail: (req, res) => {
    try {
      const id = req.params.id
      flightModel.getDetail(id)
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
          body.image = !req.file.filename ? req.file : req.file.filename
          flightModel.insert(body)
            .then((result) => {
              redisClient.del("flight")
              success(res, result, `Insert data success!`)
            }).catch((err) => {
              failed(res, [], err.message)
            });
        }
      })
    } catch (error) {
      failed(res, [], 'Internal Server Error')
    }
  },

  update: (req, res) => {
    try {
      const id = req.params.id
      const body = req.body
      body.image = req.file.filename
      flightModel.getDetail(id)
        .then((response) => {
          const oldImage = response[0].image
          fs.unlink(`src/uploads/${oldImage}`, (err) => {
            if (err) {
              failed(res, [], err.message)
            } else {
              flightModel.update(body, id)
                .then((result) => {
                  success(res, result, 'Data Updated!')
                }).catch((error) => {
                  failed(res, [], error.message)
                });
            }
          })
        }).catch((err) => {
          failed(res, [], err.message)
        });
    } catch (error) {
      failed(res, [], error.message)
    }
  },

  // update: (req, res) => {
  //   try {
  //     const id = req.params.id
  //     const body = req.body
  //     flightModel.getDetail(id)
  //       .then((response) => {
  //         body.image = req.file.filename
  //         const oldImage = response[0].image
  //         let imageName = null
  //         if (!body.image) {
  //           imageName = oldImage
  //         } else {
  //           imageName = body.image
  //           fs.unlink(`src/uploads/${oldImage}`, (err) => {
  //             if (err) {
  //               failed(res, [], err.message)
  //             } else {
  //               flightModel.update(body, id)
  //                 .then((result) => {
  //                   success(res, result, 'Data Updated!')
  //                 }).catch((error) => {
  //                   failed(res, [], error.message)
  //                 });
  //             }
  //           })
  //         }
  //       }).catch((err) => {
  //         failed(res, [], err.message)
  //       });
  //   } catch (error) {
  //     failed(res, [], error.message)
  //   }
  // },
  delete: (req, res) => {
    try {
      const id = req.params.id
      flightModel.getDetail(id)
        .then((results) => {
          const dataImage = results[0].image
          fs.unlink(`src/uploads/${dataImage}`, (err) => {
            if (err) {
              failed(res, [], err.message)
            } else {
              flightModel.delete(id)
                .then((result) => {
                  redisClient.del("flight")
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
module.exports = flight