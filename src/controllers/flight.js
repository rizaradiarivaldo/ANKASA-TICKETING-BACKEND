const flightModel = require('../models/flight')
const upload = require("../helpers/uploads");
const { success, successWithMeta, notfound, failed } = require('../helpers/response')
const fs = require('fs')

const redis = require("redis");
const redisClient = redis.createClient();

const flight = {
  getAll: (req, res) => {
    try {
      //getRedis 
      flightModel.getAllData()
        .then((results) => {
          // console.log(results)
          if (results.length === 0) {
            notfound(res, [], 'Data empty')
          } else {
            success(res, results, 'Get all data success!')
          }
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
      const body = req.body;
      flightModel.insert(body)
        .then((result) => {
          redisClient.del("flight")
          success(res, result, `Insert data success!`)
        }).catch((err) => {
          failed(res, [], err.message)
        });
    } catch (error) {
      failed(res, [], 'Internal Server Error')
    }
  },

  update: (req, res) => {
    try {
      const id = req.params.id
      const body = req.body
      flightModel.update(body, id)
        .then((result) => {
          redisClient.del("flight")
          success(res, result, 'Data Updated!')
        }).catch((error) => {
          failed(res, [], error.message)
        });
    } catch (error) {
      failed(res, [], error.message)
    }
  },
  delete: (req, res) => {
    try {
      const id = req.params.id
      flightModel.delete(id)
        .then((result) => {
          redisClient.del("flight")
          success(res, result, `ID ${id} success deleted!`)
        }).catch((err) => {
          failed(res, [], err.message)
        });
    } catch (error) {
      failed(res, [], 'Internal Server Error')
    }
  },
}
module.exports = flight