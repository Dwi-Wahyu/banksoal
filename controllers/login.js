const express = require("express");
const con = require("../utils/db").koneksi;
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    const { user, pass } = req.body;

    const sql = `SELECT * FROM penulis WHERE email = '${user}'`;
    con.query(sql, async (err, result) => {
        if (result.length > 0) {
            const valid = await bcrypt.compare(pass, result[0].password);
            if (valid) {
                req.session.email = result[0].email;
                req.session.departemen = result[0].departemen;
                req.session.namaDepartemen = result[0].nama_departemen;
                req.session.nama =
                    result[0].first_name + " " + result[0].last_name;
                req.session.isAuthenticated = true;
                if (result[0].email.includes("admin")) {
                    req.session.isAdmin = true;
                    if (req.session.isAuthenticated) {
                        res.status(201).json({ message: "Berhasil login" });
                    }
                    console.log("berhasil login admin");
                } else {
                    req.session.isAdmin = false;
                    if (req.session.isAuthenticated) {
                        res.status(201).json({ message: "Berhasil login" });
                    }
                    console.log("berhasil login penulis");
                }
            } else {
                res.status(302).json({ message: "Password salah" });
            }
        } else {
            res.status(301).json({ message: "Tidak ada email" });
        }
    });
};

module.exports = login;
