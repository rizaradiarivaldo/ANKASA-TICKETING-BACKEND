const flightModel = require('../models/flight')
const upload = require("../helpers/uploads");
const { success, successWithMeta, notfound, failed } = require('../helpers/response')
const fs = require('fs')

const flight = {
  getAll: (req, res) => {
    try {
      const fromcity = !req.query.fromcity ? '' : req.query.fromcity;
      const tocity = !req.query.tocity ? '' : req.query.tocity;
      const typeflight = !req.query.typeflight ? '' : req.query.typeflight;
      const child = !req.query.child ? '' : req.query.child;
      const adult = !req.query.adult ? '' : req.query.adult;
      const classflight = !req.query.classflight ? '' : req.query.classflight;
      const datedeparture = !req.query.datedeparture ? '' : req.query.datedeparture;

      const nameairlines = !req.query.nameairlines ? '' : req.query.nameairlines;
      const luggage = !req.query.luggage ? '' : req.query.luggage;
      const meal = !req.query.meal ? '' : req.query.meal;
      const wifi = !req.query.wifi ? '' : req.query.wifi;
      const direct = !req.query.direct ? '' : req.query.direct;
      const transit = !req.query.transit ? '' : req.query.transit;
      const moretransit = !req.query.moretransit ? '' : req.query.moretransit;

      const departurefrom = !req.query.departurefrom ? '00:00:00' : req.query.departurefrom;
      const departureto = !req.query.departureto ? '24:00:00' : req.query.departureto;
      
      const arrivedfrom = !req.query.arrivedfrom ? '00:00:00' : req.query.arrivedfrom;
      const arrivedto = !req.query.arrivedto ? '24:00:00' : req.query.arrivedto;
      
      const pricefrom = !req.query.pricefrom ? '0' : req.query.pricefrom;
      const priceto = !req.query.priceto ? '99999999999' : req.query.priceto;

      
      flightModel.getAll(fromcity, tocity, typeflight, child, adult, classflight, datedeparture,nameairlines,luggage,meal,wifi,direct,transit,moretransit,departurefrom,departureto, arrivedfrom,arrivedto, pricefrom, priceto)
        .then((result) => {
          if (result.length === 0) {
            notfound(res, [], 'Data empty')
          } else {
            success(res, result, 'Get all data success!')
          }
        }).catch((err) => {
          failed(res, [], err.message)
        });
    } catch (error) {
      failed(res, [], 'Error Internal Server')
    }
  },

  getDetail: (req, res) => {
    try {
      const id = req.params.idflight
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
      const id = req.params.idflight
      const body = req.body
      flightModel.update(body, id)
        .then((result) => {
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
      const id = req.params.idflight
      flightModel.delete(id)
        .then((result) => {
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