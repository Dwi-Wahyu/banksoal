const express = require("express");
const con = require("../utils/db").koneksi;

const login = (req, res) => {
    const { user, pass } = req.body;

    const sql = `SELECT * FROM penulis WHERE email = '${user}'`;
    con.query(sql, (err, result) => {
        if (result.length > 0) {
            const sqlPass = `SELECT * FROM penulis WHERE password = '${pass}' AND email = '${user}'`;
            con.query(sqlPass, (err, hasil) => {
                if (hasil.length > 0) {
                    req.session.email = hasil[0].email;
                    req.session.departemen = hasil[0].departemen;
                    req.session.nama =
                        hasil[0].first_name + " " + hasil[0].last_name;
                    req.session.isAuthenticated = true;
                    res.status(201).json({ message: "Berhasil login" });
                } else {
                    res.status(302).json({ message: "Password salah" });
                }
            });
        } else {
            res.status(301).json({ message: "Tidak ada email" });
        }
    });
};

module.exports = login;
