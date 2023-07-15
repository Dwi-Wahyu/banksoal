const express = require("express");
const db = require("../utils/db");
const randomize = require("./random");
const con = db.koneksi;

const tambahPenulis = (req, res) => {
    const { firstName, lastName, email, password, departemen, namaDepartemen } =
        req.body;

    console.log(req.body);
    const status = 1;
    const id = randomize(32);
    var sql = `SELECT * FROM PENULIS WHERE email = '${email}'`;
    con.query(sql, (err, data) => {
        console.log(data);
        if (data == "") {
            var sql = `INSERT INTO penulis VALUES ('', '${id}', '${departemen}', '${namaDepartemen}','${email}', '${password}', '${firstName}', '${lastName}', '${status}')`;
            con.query(sql, function (err, result, field) {
                if (err) throw err;
                res.status(200).json({
                    message: "Berhasil menambahkan penulis",
                });
            });
        } else {
            res.status(300).json({ message: "Email sudah terdaftar" });
        }
    });
};

const daftarPenulis = (req, res) => {
    if (typeof req.query.order == "undefined") {
        var column_name = "nomor";
        var column_sort_order = "desc";
    } else {
        var column_index = req.query.order[0]["column"];
        var column_name = req.query.columns[column_index]["data"];
        var column_sort_order = req.query.order[0]["dir"];
    }
    var search_value = req.query.search["value"];

    var search = `AND (nomor LIKE '%${search_value}%'
        OR email LIKE '%${search_value}%'
        OR first_name LIKE '%${search_value}%'
        OR last_name LIKE '%${search_value}%'
    )`;

    con.query("SELECT COUNT(nomor) AS Total FROM penulis", (err, data) => {
        var recordsTotal = data[0].Total;

        con.query(
            `SELECT COUNT(nomor) AS Total FROM penulis WHERE 1 ${search}`,
            (err, data) => {
                var recordsFiltered = data[0].Total;
                var sql = `SELECT * FROM penulis WHERE 1 ${search} ORDER BY nomor ${column_sort_order} LIMIT ${req.query.start}, ${req.query.length} `;
                var resultData = [];
                con.query(sql, (err, data) => {
                    if (err) throw err;
                    data.forEach((item) => {
                        resultData.push({
                            tbl_nomor: item.nomor,
                            tbl_email: item.email,
                            tbl_nama: item.first_name + " " + item.last_name,
                            tbl_status: item.status,
                            tbl_id: item.id,
                        });
                    });
                    var output = {
                        draw: req.query.draw,
                        recordsTotal: recordsTotal,
                        recordsFiltered: recordsFiltered,
                        data: resultData,
                    };
                    res.json(output);
                });
            }
        );
    });
};

const detailPenulis = (req, res) => {
    var sql = `SELECT * FROM penulis WHERE id = '${req.params.id}';`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.render("penulis/detail-penulis", { data: result });
    });
};

const updatePenulis = (req, res) => {
    const { firstName, lastName, email, departemen, namaDepartemen } = req.body;
    console.log(departemen);
    console.log(namaDepartemen);
    const sql = `UPDATE penulis SET first_name = '${firstName}', last_name = '${lastName}', email = '${email}', departemen = '${departemen}', nama_departemen = '${namaDepartemen}' WHERE id = '${req.params.id}'`;
    con.query(sql, (err, result) => {
        if (result) {
            res.status(201).json({ message: "Berhasil update data penulis" });
        }
    });
};

module.exports = {
    tambahPenulis,
    daftarPenulis,
    detailPenulis,
    updatePenulis,
};
