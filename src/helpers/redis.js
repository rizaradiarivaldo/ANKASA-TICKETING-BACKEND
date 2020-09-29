const redis = require("redis");
const redisClient = redis.createClient();

const { success, successWithMeta, failed, tokenResult } = require('../helpers/response')

const _ = require('lodash');

module.exports = {
  // getAirlines: (req, res, next) => {
  //   redisClient.get('airlines', (err, reply) => {
  //     const data = JSON.parse(reply)
  //     if (reply) {
  //       const name = !req.query.name ? null : req.query.name;
  //       const sort = !req.query.sort ? "id" : req.query.sort;
  //       const typesort = !req.query.typesort ? "asc" : req.query.typesort;

  //       const limit = !req.query.limit ? 10 : parseInt(req.query.limit);
  //       const page = !req.query.page ? 1 : parseInt(req.query.page);
  //       const start = (page - 1) * limit
  //       const offset = page * limit

  //       const sorting = _.orderBy(data, [sort.toLowerCase()], [typesort.toLowerCase()])
  //       let results = sorting
  //       if (name !== null) {
  //         const searching = results.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
  //         results = searching
  //       }
  //       const meta = {
  //         totalRow: results.length,
  //         totalPage: Math.ceil(results.length / limit),
  //         page,
  //         limit,
  //       };
  //       const newResult = results.slice(start, offset)
  //       successWithMeta(res, newResult, meta, 'Get data success from redis')
  //     } else {
  //       next()
  //     }
  //   })
  // },
  getAirlines: (req, res, next) => {
    redisClient.get('airlines', (err, reply) => {
      const data = JSON.parse(reply)
      if (reply) {
        success(res, data, 'Get data from redis success')
      } else {
        next()
      }
    })
  },

  getBooking: (req, res, next) => {
    redisClient.get('booking', (err, reply) => {
      const data = JSON.parse(reply)
      if (reply) {
        success(res, data, 'Get data from redis success')
      } else {
        next()
      }
    })
  },

  getAllCountry: (req, res, next) => {
    redisClient.get('countries', (err, reply) => {
      const data = JSON.parse(reply)
      if (reply) {
        success(res, data, 'Get data from redis success')
      } else {
        next()
      }
    })
  },

  getAllCities: (req, res, next) => {
    redisClient.get('cities', (err, reply) => {
      const data = JSON.parse(reply)
      if (reply) {
        success(res, data, 'Get data from redis success')
      } else {
        next()
      }
    })
  },

  getAllFlight: (req, res, next) => {
    redisClient.get('flight', (err, reply) => {
      const data = JSON.parse(reply)
      if (reply) {
        success(res, data, 'Get data from redis success')
      } else {
        next()
      }
    })
  },
}
