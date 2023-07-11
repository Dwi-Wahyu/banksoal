const express = require("express");
const randomize = require("./random");
const fs = require("fs");
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
        OR vignette LIKE '%${search_value}%'
        OR pertanyaan LIKE '%${search_value}%'
        OR alasan_singkat LIKE '%${search_value}%'
        OR referensi LIKE '%${search_value}%'
    )`;

    con.query("SELECT COUNT(nomor) AS Total FROM soal_teori", (err, data) => {
        var recordsTotal = data[0].Total;

        con.query(
            `SELECT COUNT(nomor) AS Total FROM soal_teori WHERE 1 ${search}`,
            (err, hasil) => {
                var recordsFiltered = hasil[0].Total;

                var sql = `SELECT * FROM soal_teori WHERE 1 ${search} ORDER BY nomor ${column_sort_order} LIMIT ${req.query.start}, ${req.query.length} `;
                var resultData = [];
                con.query(sql, (err, data) => {
                    if (err) throw err;

                    var tanggal = new Date();
                    data.forEach((item) => {
                        var nomorSoal;
                        var nomorLength = item.nomor;
                        switch (nomorLength.toString().length) {
                            case 1:
                                nomorSoal = `000${item.nomor}`;
                                break;
                            case 2:
                                nomorSoal = `00${item.nomor}`;
                                break;
                            case 3:
                                nomorSoal = `0${item.nomor}`;
                                break;
                            case 4:
                                nomorSoal = `${item.nomor}`;
                                break;
                        }

                        resultData.push({
                            tbl_nomor: item.nomor,
                            tbl_pertanyaan_vignette:
                                item.vignette + "<br><br>" + item.pertanyaan,
                            tbl_register: `${nomorSoal}/${item.departemen}/${item.pembuat}/${item.bulan}/${item.tahun}`,
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

    const tanggal = new Date();

    if (req.file == undefined) {
        res.status(200).json({ message: "tidak ada gambar" });
        const sql = `INSERT INTO soal_teori VALUES (NULL, '${id}', '03', '${tinjauan1}', '${tinjauan2}', '${tinjauan3}', '${vignette}', '${pertanyaan}', '', '${jawabanA}', '${jawabanB}', '${jawabanC}', '${jawabanD}', '${jawabanE}', '${kunci}', '${departemen}', '${alasan}', '${referensi}', 'di Lokal', ${
            tanggal.getMonth() + 1
        }, ${tanggal.getFullYear()})`;
        con.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    } else {
        res.status(200).json({ message: "ada gambar" });
        const gambarPath = req.file.path;
        const replacedGambarPath = gambarPath.split("\\").join("\\\\");
        const sql = `INSERT INTO soal_teori VALUES (NULL, '${id}', '03','${tinjauan1}', '${tinjauan2}', '${tinjauan3}', '${vignette}', '${pertanyaan}', '${replacedGambarPath}', '${jawabanA}', '${jawabanB}', '${jawabanC}', '${jawabanD}', '${jawabanE}', '${kunci}', '${departemen}', '${alasan}', '${referensi}', 'di Lokal', ${
            tanggal.getMonth() + 1
        }, ${tanggal.getFullYear()})`;
        con.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    }
};

const lihatSoal = (req, res) => {
    const sql = `SELECT * FROM soal_teori WHERE id = '${req.params.id}'`;
    con.query(sql, (err, result) => {
        res.render("tulis-soal/lihat-soal/lihat-soal-teori", { data: result });
    });
};

const ubahSoal = (req, res) => {
    const sql = `SELECT * FROM soal_teori WHERE id = '${req.params.id}'`;
    con.query(sql, (err, result) => {
        res.render("tulis-soal/lihat-soal/ubah-soal-teori", { data: result });
    });
};

const ubahGambar = (req, res) => {
    const gambarPath = req.file.path;
    const replacedGambarPath = gambarPath.split("\\").join("\\\\");
    const sql = `SELECT gambar FROM soal_teori WHERE id = '${req.params.id}'`;
    con.query(sql, (err, result) => {
        fs.unlink(result[0].gambar, (err) => {
            if (err) throw err;
        });
        console.log(result[0].gambar);
        const sql = `UPDATE soal_teori SET gambar = '${replacedGambarPath}' WHERE id = '${req.params.id}'`;
        con.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    });
};

const updateSoal = (req, res) => {
    // const {
    //     tinjauan1,
    //     tinjauan2,
    //     tinjauan3,
    //     kunci,
    //     departemen,
    //     jawabanA,
    //     jawabanB,
    //     jawabanC,
    //     jawabanD,
    //     jawabanE,
    //     alasan,
    //     referensi,
    //     vignette,
    //     pertanyaan,
    // } = req.body;
    // const sql = `UPDATE soal_teori SET tinjauan1 = '${tinjauan1}', tinjauan2 = '${tinjauan2}', tinjauan3 = '${tinjauan3}', vignette = '${vignette}', pertanyaan = '${pertanyaan}', jawabanA = '${jawabanA}', jawabanB = '${jawabanB}', jawabanC = '${jawabanC}', jawabanD = '${jawabanD}', jawabanE = '${jawabanE}', kunci = '${kunci}', departemen = '${departemen}', alasan_singkat = '${alasan}', referensi = '${referensi}' WHERE id = ${req.params.id};`;
    // con.query(sql, (err, result) => {
    //     if (err) throw err;
    //     console.log(result);
    // });
    console.log(req.body);
};

module.exports = {
    TambahSoalTeori: tambahSoal,
    DaftarSoalTeori: daftarSoal,
    LihatSoalTeori: lihatSoal,
    UbahSoalTeori: ubahSoal,
    UbahGambarTeori: ubahGambar,
    UpdateSoalTeori: updateSoal,
};
