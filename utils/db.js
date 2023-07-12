const mysql = require("mysql");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "banksoal",
    port: "3306",
});

const connection = pool.getConnection((err, result) => {
    if (err) throw err;
    console.log("Terhubung ke database");
});

module.exports = {
    connection,
    koneksi: pool,
};
