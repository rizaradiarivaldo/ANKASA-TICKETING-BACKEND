const db = require('../configs/db')

const countries = {
  getAll: (name, sort, typesort, limit, offset) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT *, (SELECT COUNT(*) FROM countries) as count FROM countries WHERE name LIKE '%${name}%' ORDER BY ${sort} ${typesort} LIMIT ${limit} OFFSET ${offset} `;
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
      db.query(`SELECT * FROM countries`, (err, result) => {
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
      db.query(`SELECT * FROM countries WHERE id='${id}'`, (err, result) => {
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
      db.query(`INSERT INTO countries (name) VALUES ('${data.name}')`, (err, result) => {
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
      db.query(`UPDATE countries SET ? WHERE id = ?`, [data, id], (err, result) => {
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
      db.query(`DELETE FROM countries WHERE id='${id}'`, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result)
        }
      })
    })
  }
}

module.exports = countries