const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "banksoal",
});

module.exports = {
    connect: con.connect((err) => {
        if (err) throw err;
        console.log("Terhubung");
    }),
    koneksi: con,
};
