const db = require('../configs/db')

const airlines = {
  getAll: (name, sort, typesort, limit, offset) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT *, (SELECT COUNT(*) FROM airlines) as count FROM airlines WHERE name LIKE '%${name}%' ORDER BY ${sort} ${typesort} LIMIT ${limit} OFFSET ${offset} `;
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
      db.query(`SELECT * FROM airlines`, (err, result) => {
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
      const query = `INSERT INTO airlines (name, image) VALUES ('${data.name}','${data.image}')`;
      db.query(query, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = airlines