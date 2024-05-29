const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "cam",
  password: "123123",
  database: "classicmodels",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// db.execute(
//   "SELECT * FROM classicmodels.products WHERE productLine LIKE ? AND productName LIKE ?",
//   ["%Sh%", "P%"]
// )
//   .then(([data, fields]) => {
//     console.log(data);
//   })
//   .catch((err) => console.log(err));

module.exports = { db };
