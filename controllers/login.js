const express = require("express");
const con = require("../utils/db").koneksi;
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    const { user, pass } = req.body;

    const sql = `SELECT * FROM penulis WHERE email = '${user}'`;
    con.query(sql, async (err, result) => {
        if (result.length > 0) {
            console.log(pass);
            console.log(result[0].pass);
            const valid = await bcrypt.compare(pass, result[0].password);
            console.log(valid);
            if (valid) {
                req.session.email = result[0].email;
                req.session.departemen = result[0].departemen;
                req.session.namaDepartemen = result[0].nama_departemen;
                req.session.nama =
                    result[0].first_name + " " + result[0].last_name;
                req.session.isAuthenticated = true;
                if (result[0].email.includes("admin")) {
                    req.session.isAdmin = true;
                    res.status(201).json({ message: "Berhasil login" });
                    // res.redirect("/dashboard");
                } else {
                    req.session.isAdmin = false;
                    res.status(201).json({ message: "Berhasil login" });
                    // res.redirect("/dashboard");
                }
            } else {
                res.status(302).json({ message: "Password salah" });
            }

            // const sqlPass = `SELECT * FROM penulis WHERE password = '${pass}' AND email = '${user}'`;
            // con.query(sqlPass, (err, hasil) => {
            //     if (hasil.length > 0) {
            //         req.session.email = hasil[0].email;
            //         req.session.departemen = hasil[0].departemen;
            //         req.session.namaDepartemen = hasil[0].nama_departemen;
            //         req.session.nama =
            //             hasil[0].first_name + " " + hasil[0].last_name;
            //         req.session.isAuthenticated = true;
            //         if (hasil[0].email.includes("admin")) {
            //             req.session.isAdmin = true;
            //             res.status(201).json({ message: "Berhasil login" });
            //         } else {
            //             req.session.isAdmin = false;
            //             res.status(201).json({ message: "Berhasil login" });
            //         }
            //     } else {
            //         res.status(302).json({ message: "Password salah" });
            //     }
            // });
        } else {
            res.status(301).json({ message: "Tidak ada email" });
        }
    });
};

module.exports = login;
