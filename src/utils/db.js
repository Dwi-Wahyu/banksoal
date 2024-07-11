const mysql = require("mysql")

const pool = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
  port: "3306",
})

const connection = pool.getConnection((err, result) => {
  if (err) throw err
  console.log("Terhubung ke database")
})

module.exports = {
  connection,
  koneksi: pool,
}
