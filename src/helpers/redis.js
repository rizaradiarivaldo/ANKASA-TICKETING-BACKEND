const redis = require("redis");
const redisClient = redis.createClient();

const { success, successWithMeta, failed, tokenResult } = require('../helpers/response')

const _ = require('lodash');

module.exports = {
  getAirlines: (req, res, next) => {
    redisClient.get('airlines', (err, reply) => {
      const data = JSON.parse(reply)
      if (reply) {
        const name = !req.query.name ? null : req.query.name;
        const sort = !req.query.sort ? "id" : req.query.sort;
        const typesort = !req.query.typesort ? "asc" : req.query.typesort;

        const limit = !req.query.limit ? 10 : parseInt(req.query.limit);
        const page = !req.query.page ? 1 : parseInt(req.query.page);
        const start = (page - 1) * limit
        const offset = page * limit

        const sorting = _.orderBy(data, [sort.toLowerCase()], [typesort.toLowerCase()])
        let results = sorting
        if (name !== null) {
          const searching = results.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
          results = searching
        }
        const meta = {
          totalRow: results.length,
          totalPage: Math.ceil(results.length / limit),
          page,
          limit,
        };
        const newResult = results.slice(start, offset)
        successWithMeta(res, newResult, meta, 'Get data success from redis')
      } else {
        next()
      }
    })
  },

  getBooking: (req, res, next) => {
    redisClient.get('booking', (err, reply) => {
      const data = JSON.parse(reply)
      if (reply) {
        success(res, reply, 'Get data from redis success')
      } else {
        next()
      }
    })
  }

  // getDetailProduct: (req, res, next) => {
  //   const id = req.params.id
  //   if (id) {
  //     redisClient.get('products', (err, reply) => {
  //       const data = JSON.parse(reply)
  //       const dataFilter = data.filter(e => e.id_product == id)
  //       if (dataFilter <= 0) {
  //         failed(res, [], 'Data Not Found!')
  //       } else {
  //         success(res, dataFilter, `Get data category by ID: ${id} from redis success!`)
  //       }
  //     })
  //   } else {
  //     next()
  //   }
  // },

  // getCategory: (req, res, next) => {
  //   const categoryname = !req.query.category ? false : req.query.category;
  //   const Sortby = !req.query.sortby ? null : req.query.sortby
  //   redisClient.get('category', (err, reply) => {
  //     const data = JSON.parse(reply)
  //     if (categoryname) {
  //       const dataFilter = data.filter(e => e.name.toLowerCase().includes(categoryname.toLowerCase()))
  //       if (dataFilter <= 0) {
  //         failed(res, [], 'Data Not Found!')
  //       } else {
  //         success(res, dataFilter, 'Get data by Category Name from redis success!')
  //       }
  //     } else if (Sortby === 'category') {
  //       const sort = data.sort((a, b) => a.category.localeCompare(b.category));
  //       success(res, sort, 'Get all data sort by Category Name')
  //     } else if (reply) {
  //       const result = JSON.parse(reply)
  //       successWithMeta(res, result, null, 'Get all data category from redis success!')
  //     }
  //     else {
  //       next()
  //     }
  //   })
  // },
}
