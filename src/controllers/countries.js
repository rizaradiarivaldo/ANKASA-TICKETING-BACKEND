const countriesModel = require('../models/countries.js')

const { success, successWithMeta, notfound, failed } = require('../helpers/response')

const redis = require("redis");
const redisClient = redis.createClient();

const countries = {
  getAll: (req, res) => {
    try {
      const name = !req.query.name ? "" : req.query.name;
      const sort = !req.query.sort ? "id" : req.query.sort;
      const typesort = !req.query.typesort ? "ASC" : req.query.typesort;

      const limit = !req.query.limit ? 10 : parseInt(req.query.limit);
      const page = !req.query.page ? 1 : parseInt(req.query.page);
      const offset = page <= 1 ? 0 : (page - 1) * limit;

      countriesModel
        .getAll(name, sort, typesort, limit, offset)
        .then((result) => {
          if (result.length === 0) {
            notfound(res, [], 'Data empty')
          } else {
            const totalRows = result[0].count;
            const meta = {
              total: totalRows,
              totalPage: Math.ceil(totalRows / limit),
              page: page,
            };
            successWithMeta(res, result, meta, "Get all data success");
          }
        })
        .catch((err) => {
          failed(res, [], err.message);
        });

      //getRedis 
      countriesModel.getAllData()
        .then((results) => {
          redisClient.set('countries', JSON.stringify(results))
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
      countriesModel.getDetail(id)
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
      const body = req.body
      if (body.name === '') {
        failed(res, [], 'Data must have a value')
      } else {
        countriesModel.insert(body)
          .then((result) => {
            redisClient.del("countries")
            success(res, result, `Insert data success!`)
          }).catch((err) => {
            failed(res, [], err.message)
          });
      }
    } catch (error) {
      failed(res, [], 'Internal Server Error')
    }
  },
  update: (req, res) => {
    try {
      const id = req.params.id
      const body = req.body
      countriesModel.update(body, id)
        .then((result) => {
          if (result.affectedRows === 0) {
            failed(res, [], 'Data not found for update')
          } else {
            redisClient.del("countries")
            success(res, result, `ID ${id} success updated!`)
          }
        })
        .catch((err) => {
          failed(res, [], err.message)
        })
    } catch (error) {
      failed(res, [], 'Internal Server Error')
    }
  },

  delete: (req, res) => {
    try {
      const id = req.params.id
      countriesModel.delete(id)
        .then((result) => {
          if (result.affectedRows === 0) {
            failed(res, [], 'Data not found for delete')
          } else {
            redisClient.del("countries")
            success(res, result, `ID ${id} success deleted!`)
          }
        }).catch((err) => {
          failed(res, [], err.message)
        });
    } catch (error) {
      failed(res, [], 'Internal Server Error')
    }
  },
}

module.exports = countries