const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER_POSTGRES,
  port: process.env.PORT_POSTGRES,
  password: process.env.PASSWORD_POSTGRES,
  database: process.env.DATABASE,
  max: 10,
  idleTimeoutMillis: 20000,
  connectionTimeoutMillis: 20000,
});

function db(query) {
  return {
    query: () => {
      return new Promise((resolve, reject) => {
        pool
          .query(query)
          .then(({ rows }) => resolve(rows))
          .catch((error) => reject(error.message));
      });
    },

    queryWithArgs: (...args) => {
      return new Promise((resolve, reject) => {
        pool
          .query(query, args)
          .then(({ rows }) => resolve(rows[0]))
          .catch((error) => reject(error.message));
      });
    },
  };
}

module.exports = { db };
