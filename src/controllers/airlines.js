const airlinesModel = require('../models/airlines')
const upload = require("../helpers/uploads");
const { success, successWithMeta, failed, tokenResult } = require('../helpers/response')

const redis = require("redis");
const redisClient = redis.createClient();

const airlines = {
  getAll: (req, res) => {
    const name = !req.query.name ? "" : req.query.name;
    const sort = !req.query.sort ? "id" : req.query.sort;
    const typesort = !req.query.typesort ? "ASC" : req.query.typesort;

    const limit = !req.query.limit ? 10 : parseInt(req.query.limit);
    const page = !req.query.page ? 1 : parseInt(req.query.page);
    const offset = page <= 1 ? 0 : (page - 1) * limit;

    airlinesModel
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
    airlinesModel.getAllData()
      .then((results) => {
        redisClient.set('airlines', JSON.stringify(results))
      }).catch((err) => {
        failed(result)
      });
  },
  getDetail: (req, res) => {
    const id = req.params.id
    airlinesModel.getDetail(id)
      .then((result) => {
        success(res, result, `Get detail by ID: ${id} success`)
      }).catch((err) => {
        failed(res, [], err.message)
      });
  },
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