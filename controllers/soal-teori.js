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
                                item.pertanyaan + "<br>" + item.vignette,
                            tbl_register: `${nomorSoal}/${item.departemen}/${
                                item.pembuat
                            }/${tanggal.getMonth()}/${tanggal.getFullYear()}`,
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

        // const skl = `INSERT INTO soal_teori VALUES (NULL, 'TmZYV1RkUHpIVnBicXdDbzVTb1krZz09', '03', '01.1', '03.1', '01.1', 'ini vignette', 'ini pertanyaan', '', 'a', 'b', 'c', 'd', 'e', 'A', '11', 'alasan', 'referensi yahahahyuyk');`;
        const sql = `INSERT INTO soal_teori VALUES (NULL, '${id}', '03', '${tinjauan1}', '${tinjauan2}', '${tinjauan3}', '${vignette}', '${pertanyaan}', '', '${jawabanA}', '${jawabanB}', '${jawabanC}', '${jawabanD}', '${jawabanE}', '${kunci}', '${departemen}', '${alasan}', '${referensi}', 'di Lokal')`;
        con.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    } else {
        res.status(200).json({ message: "ada gambar" });
        const gambarPath = req.file.path;

        const sql = `INSERT INTO soal_teori VALUES (NULL, '${id}', '03','${tinjauan1}', '${tinjauan2}', '${tinjauan3}', '${vignette}', '${pertanyaan}', '${gambarPath}', '${jawabanA}', '${jawabanB}', '${jawabanC}', '${jawabanD}', '${jawabanE}', '${kunci}', '${departemen}', '${alasan}', '${referensi}', 'di Lokal')`;
        con.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    }
};

module.exports = { TambahSoalTeori: tambahSoal, DaftarSoalTeori: daftarSoal };
