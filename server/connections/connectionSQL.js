const { createPool } = require("mysql2/promise");

function db(query) {
  const pool = createPool({
    host: process.env.HOST,
    user: process.env.USER_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    idleTimeout: 2000,
  });

  return {
    query: async () => {
      try {
        const connection = await pool.getConnection();
        const [results] = await connection.execute(query);
        console.table(results);
        connection.release();
        return results;
      } catch (error) {
        console.log(error);
        return;
      } finally {
        console.log("Connection terminated");
      }
    },

    queryWithArgs: async (...args) => {
      try {
        const connection = await pool.getConnection();
        const [results] = await connection.execute(query, [...args]);
        console.table(results);
        connection.release();
        return results;
      } catch (error) {
        console.log(error);
      } finally {
        console.log("Connection terminated");
      }
    },
  };
}

module.exports = { db };
