require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// test connection safely
db.getConnection((err, connection) => {
  if (err) {
    console.error(" DB Connection Error:", err.message);
    return;
  }

  console.log("MySQL Pool Connected");
  connection.release();
});

module.exports = db;