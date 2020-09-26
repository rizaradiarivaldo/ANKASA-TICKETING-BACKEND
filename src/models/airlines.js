const db = require('../configs/db')

const airlines = {
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