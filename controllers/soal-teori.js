const express = require("express");
const randomize = require("./random");
const con = require("../utils/db").koneksi;

const daftarSoal = (req, res) => {
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

    con.query("SELECT COUNT(nomor) AS Total FROM soal_teori", (err, data) => {
        var recordsTotal = data[0].Total;

        con.query(
            `SELECT COUNT(nomor) AS Total FROM soal_teori WHERE 1 ${search}`,
            (err, data) => {
                var recordsFiltered = data[0].Total;
                var sql = `SELECT * FROM soal_teori WHERE 1 ${search} ORDER BY nomor ${column_sort_order} LIMIT ${req.query.start}, ${req.query.length} `;
                var resultData = [];
                con.query(sql, (err, data) => {
                    if (err) throw err;

                    let nomor;
                    switch (nomor.length) {
                        case 1:
                            nomor = `000${item.nomor}`;
                            break;
                        case 2:
                            nomor = `00${item.nomor}`;
                            break;
                        case 3:
                            nomor = `0${item.nomor}`;
                            break;
                        case 4:
                            nomor = `${item.nomor}`;
                            break;
                    }
                    var bulan = [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ];
                    var tanggal = new Date();
                    data.forEach((item) => {
                        resultData.push({
                            tbl_nomor: item.nomor,
                            tbl_pertanyaan_vignette:
                                item.pertanyaan + item.vignette,
                            tbl_register: `${nomor}/${item.departemen}/3/${
                                bulan[tanggal.getMonth]
                            }/${tanggal.getFullYear()}`,
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

const tambahSoal = (req, res) => {
    console.log(req.body);

    const id = randomize(32);
    const {
        tinjauan1,
        tinjauan2,
        tinjauan3,
        kunci,
        departemen,
        jawabanA,
        jawabanB,
        jawabanC,
        jawabanD,
        jawabanE,
        alasan,
        referensi,
        vignette,
        pertanyaan,
    } = req.body;

    if (req.file == undefined) {
        res.status(200).json({ message: "tidak ada gambar" });

        const sql = `INSERT INTO soal_teori VALUES (NULL, '${id}', '${tinjauan1}', '${tinjauan2}', '${tinjauan3}', '${vignette}', '${pertanyaan}', '', '${jawabanA}', '${jawabanB}', '${jawabanC}', '${jawabanD}', '${jawabanE}', '${kunci}', '${departemen}', '${alasan}', '${referensi}')`;
        con.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    } else {
        res.status(200).json({ message: "ada gambar" });
        const gambarPath = req.file.path;

        const sql = `INSERT INTO soal_teori VALUES (NULL, '${id}', '${tinjauan1}', '${tinjauan2}', '${tinjauan3}', '${vignette}', '${pertanyaan}', '${gambarPath}', '${jawabanA}', '${jawabanB}', '${jawabanC}', '${jawabanD}', '${jawabanE}', '${kunci}', '${departemen}', '${alasan}', '${referensi}')`;
        con.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    }
};

module.exports = { TambahSoalTeori: tambahSoal, DaftarSoalTeori: daftarSoal };
