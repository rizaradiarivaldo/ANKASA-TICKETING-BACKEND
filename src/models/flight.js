const db = require('../configs/db')

const flight = {

  getAll: (fromcity, tocity, typeflight, child, adult, classflight,datedeparture) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT idflight,airlines.idairlines,nameairlines,
      airlines.image as imageairlines, fromcity.idcities, 
      fromcity.namecity, fromcountry.idcountries, fromcountry.namecountries,fromcountry.alias, 
      tocity.idcities, tocity.namecity, tocountry.idcountries, 
      tocountry.namecountries,tocountry.alias,code,classflight,typeflight,child,
      adult,transit,direct,moretransit,luggage,meal,wifi,date_departure,
      departure,arrived,price,rating,total_reviewed, 
      flight.created_at FROM (((((flight INNER JOIN airlines ON flight.idairlines=airlines.idairlines) 
      INNER join cities as fromcity on flight.idfromcity=fromcity.idcities) 
      INNER JOIN countries as fromcountry ON fromcity.idcities=fromcountry.idcountries)
      INNER JOIN cities as tocity on flight.idtocity=tocity.idcities) 
      INNER JOIN countries as tocountry on tocity.idcities=tocountry.idcountries) 
      WHERE fromcity.namecity LIKE '%${fromcity}%' AND tocity.namecity LIKE '%${tocity}%'
      AND typeflight LIKE '%${typeflight}%' AND child LIKE '%${child}%' AND adult LIKE '%${adult}%' AND classflight LIKE '%${classflight}%'
      AND date_departure LIKE '%${datedeparture}%'
      `, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result)
        }
      })
    })
  },
  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM flight WHERE idflight='${id}'`, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result)
        }
      })
    })
  },

  insert: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO flight SET ?`, data, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },

  update: (data, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE flight SET ? WHERE idflight = ?`, [data, id], (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM flight WHERE idflight='${id}'`, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result)
        }
      })
    })
  }
}

module.exports = flight