const db = require('../configs/db')

const flight = {

  getAll: (from_city, to_city, typeflight, date_departure, child, adult, classflight) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT flight.id, id_airlines, airlines.name as airlanes_name, airlines.image, from_city, a.name as fromcity, c.name as fromcountry, to_city, b.name as tocity, d.name as tocountry, code, classflight, typeflight,child,adult, transit,direct,more_transit,luggage,meal,wifi,date_departure,departure,arrived,price,rating,total_reviewed FROM (((((flight INNER JOIN airlines on flight.id_airlines = airlines.id) INNER JOIN cities as a on flight.from_city = a.id )INNER JOIN cities as b on flight.to_city = b.id) INNER JOIN countries as c on a.id_country = c.id) INNER JOIN countries as d on b.id_country = d.id) WHERE a.name LIKE '%${from_city}%' AND b.name LIKE '%${to_city}%' AND typeflight LIKE '%${typeflight}%' AND date_departure LIKE '%${date_departure}%' AND child LIKE '%${child}%' AND adult LIKE '%${adult}%' AND classflight LIKE '%${classflight}%'`;
      db.query(query, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },



  getAllData: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM flight`, (err, result) => {
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
      db.query(`SELECT * FROM flight WHERE id='${id}'`, (err, result) => {
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
      db.query(`UPDATE flight SET ? WHERE id = ?`, [data, id], (err, result) => {
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
      db.query(`DELETE FROM flight WHERE id='${id}'`, (err, result) => {
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