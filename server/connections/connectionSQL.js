const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "cam",
  password: "123123",
  database: "geckos",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = { db };
