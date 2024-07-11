const express = require("express")
const randomize = require("./random")
const multer = require("multer")
const fs = require("fs")
const { koneksi } = require("../utils/db")

var praktek = {}

const storagePraktek = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "images/soal-praktek")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname)
  },
})
const uploadPraktek = multer({
  storage: storagePraktek,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      const err = new Error("Only .png, .jpg and .jpeg format allowed!")
      err.name = "ExtensionError"
      return cb(err)
    }
  },
}).array("gambar", 2)
const uploadSatuGambar = multer({
  storage: storagePraktek,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      const err = new Error("Only .png, .jpg and .jpeg format allowed!")
      err.name = "ExtensionError"
      return cb(err)
    }
  },
}).single("gambar")

const ubahGambar = multer({
  storage: storagePraktek,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      const err = new Error("Only .png, .jpg and .jpeg format allowed!")
      err.name = "ExtensionError"
      return cb(err)
    }
  },
}).fields([
  { name: "gambar1", maxCount: 1 },
  { name: "gambar2", maxCount: 1 },
])

praktek.tambahSoal = (req, res) => {
  uploadPraktek(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res
        .status(500)
        .send({
          error: {
            message: `Multer uploading error: ${err.message}`,
          },
        })
        .end()
      return
    } else if (err) {
      if (err.name == "ExtensionError") {
        res
          .status(413)
          .send({ error: { message: err.message } })
          .end()
      } else {
        res
          .status(500)
          .send({
            error: {
              message: `unknown uploading error: ${err.message}`,
            },
          })
          .end()
      }
      return
    }

    const {
      tinjauan1,
      tinjauan2,
      subtinjauan2,
      tinjauan3,
      tinjauan4,
      tujuan,
      skenarioKlinik,
      tugasKandidat,
      tugasPenguji,
      intruksiPasien,
      peralatan,
      departemen,
      namaDepartemen,
      referensi,
    } = req.body
    const pembuat = req.session.nama

    const tanggal = new Date()
    const id = randomize(32)

    if (req.files.length == 1) {
      const gambar1 = req.files[0].path
      const replaceGambar1 = gambar1.split("\\").join("\\\\")
      const sql = `INSERT INTO soal_praktek VALUES (NULL, '${id}', '${pembuat}', '${tinjauan1}', '${tinjauan2}', '${subtinjauan2}', '${tinjauan3}', '${tinjauan4}', '${tujuan}', '${skenarioKlinik}', '${tugasKandidat}', '${tugasPenguji}', '${intruksiPasien}', '${peralatan}', '${replaceGambar1}', '', '${departemen}', '${namaDepartemen}', '${referensi}', 'diLokal', '${
        tanggal.getMonth() + 1
      }', '${tanggal.getFullYear()}')`
      koneksi.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.statusMessage = "Berhasil input ke database"
        res.status(200).json({ message: "Berhasil input ke database" })
      })
    } else {
      const gambar1 = req.files[0].path
      const replaceGambar1 = gambar1.split("\\").join("\\\\")
      const gambar2 = req.files[1].path
      const replaceGambar2 = gambar2.split("\\").join("\\\\")
      const sql = `INSERT INTO soal_praktek VALUES (NULL, '${id}', '${pembuat}', '${tinjauan1}', '${tinjauan2}', '${subtinjauan2}', '${tinjauan3}', '${tinjauan4}', '${tujuan}', '${skenarioKlinik}', '${tugasKandidat}', '${tugasPenguji}', '${intruksiPasien}', '${peralatan}', '${replaceGambar1}', '${replaceGambar2}', '${departemen}', '${namaDepartemen}', '${referensi}', 'diLokal', '${
        tanggal.getMonth() + 1
      }', '${tanggal.getFullYear()}')`
      koneksi.query(sql, (err, result) => {
        if (err) throw err
        console.log(result)
        res.statusMessage = "Berhasil input ke database"
        res.status(200).json({ message: "Berhasil input ke database" })
      })
    }
  })
}

praktek.daftarSoal = (req, res) => {
  if (typeof req.query.order == "undefined") {
    var column_name = "nomor"
    var column_sort_order = "desc"
  } else {
    var column_index = req.query.order[0]["column"]
    var column_name = req.query.columns[column_index]["data"]
    var column_sort_order = req.query.order[0]["dir"]
  }
  var search_value = req.query.search["value"]

  var search = `AND (nomor LIKE '%${search_value}%'
        OR tinjauan1 LIKE '%${search_value}%'
        OR tinjauan2 LIKE '%${search_value}%'
        OR subtinjauan2 LIKE '%${search_value}%'
        OR tinjauan3 LIKE '%${search_value}%'
    )`

  if (req.session.isAdmin) {
    koneksi.query(`SELECT COUNT(nomor) AS Total FROM soal_praktek `, (err, data) => {
      var recordsTotal = data[0].Total

      koneksi.query(
        `SELECT COUNT(nomor) AS Total FROM soal_praktek WHERE 1 ${search} `,
        (err, hasil) => {
          var recordsFiltered = hasil[0].Total

          var sql = `SELECT * FROM soal_praktek WHERE 1 ${search}  ORDER BY nomor ${column_sort_order} LIMIT ${req.query.start}, ${req.query.length} `
          var resultData = []
          koneksi.query(sql, (err, data) => {
            if (err) throw err

            var tanggal = new Date()
            data.forEach((item) => {
              var nomorSoal
              var nomorLength = item.nomor
              switch (nomorLength.toString().length) {
                case 1:
                  nomorSoal = `000${item.nomor}`
                  break
                case 2:
                  nomorSoal = `00${item.nomor}`
                  break
                case 3:
                  nomorSoal = `0${item.nomor}`
                  break
                case 4:
                  nomorSoal = `${item.nomor}`
                  break
              }

              resultData.push({
                tbl_nomor: item.nomor,
                tbl_register: `${nomorSoal}/${item.tinjauan1}/${item.tinjauan2}/${item.tinjauan3}/${item.tinjauan4}/${item.bulan}/${item.tahun}`,
                tbl_skenario_klinik: item.skenario_klinik,
                tbl_status: item.status,
                tbl_id: item.id,
              })
            })
            var output = {
              draw: req.query.draw,
              recordsTotal: recordsTotal,
              recordsFiltered: recordsFiltered,
              data: resultData,
            }
            res.json(output)
          })
        }
      )
    })
  } else {
    koneksi.query(
      `SELECT COUNT(nomor) AS Total FROM soal_praktek WHERE departemen = '${req.session.departemen}'`,
      (err, data) => {
        var recordsTotal = data[0].Total

        koneksi.query(
          `SELECT COUNT(nomor) AS Total FROM soal_praktek WHERE 1 ${search} AND departemen = '${req.session.departemen}'`,
          (err, hasil) => {
            var recordsFiltered = hasil[0].Total

            var sql = `SELECT * FROM soal_praktek WHERE 1 ${search} AND departemen = '${req.session.departemen}' ORDER BY nomor ${column_sort_order} LIMIT ${req.query.start}, ${req.query.length} `
            var resultData = []
            koneksi.query(sql, (err, data) => {
              if (err) throw err

              var tanggal = new Date()
              data.forEach((item) => {
                var nomorSoal
                var nomorLength = item.nomor
                switch (nomorLength.toString().length) {
                  case 1:
                    nomorSoal = `000${item.nomor}`
                    break
                  case 2:
                    nomorSoal = `00${item.nomor}`
                    break
                  case 3:
                    nomorSoal = `0${item.nomor}`
                    break
                  case 4:
                    nomorSoal = `${item.nomor}`
                    break
                }

                resultData.push({
                  tbl_nomor: item.nomor,
                  tbl_register: `${nomorSoal}/${item.tinjauan1}/${item.tinjauan2}/${item.tinjauan3}/${item.bulan}/${item.tahun}`,
                  tbl_skenario_klinik: item.skenario_klinik,
                  tbl_status: item.status,
                  tbl_id: item.id,
                })
              })

              var output = {
                draw: req.query.draw,
                recordsTotal: recordsTotal,
                recordsFiltered: recordsFiltered,
                data: resultData,
              }
              res.json(output)
            })
          }
        )
      }
    )
  }
}

praktek.lihatSoal = (req, res) => {
  const sql = `SELECT * FROM soal_praktek WHERE id = '${req.params.id}'`
  res.locals.nama = req.session.nama
  res.locals.isAdmin = req.session.isAdmin
  koneksi.query(sql, (err, result) => {
    const sql = `SELECT * FROM aspek_praktek WHERE id_soal = '${req.params.id}'`
    koneksi.query(sql, (err, hasil) => {
      res.render("tulis-soal/lihat-soal/lihat-soal-praktek", {
        data: result,
        aspek: hasil,
      })
    })
  })
}

praktek.lihatTambahAspek = (req, res) => {
  res.locals.nama = req.session.nama
  res.locals.isAdmin = req.session.isAdmin
  const sql = `SELECT * FROM soal_praktek WHERE id = '${req.params.id}'`
  koneksi.query(sql, (err, result) => {
    const sql = `SELECT * FROM aspek_praktek WHERE id_soal = '${req.params.id}'`
    koneksi.query(sql, (err, hasil) => {
      res.render("tulis-soal/lihat-soal/tambah-aspek", {
        data: result,
        aspek: hasil,
      })
    })
  })
}

praktek.tambahAspek = (req, res) => {
  const { aspekDinilai, inp0, inp1, inp2, skor0, skor1, skor2 } = req.body
  const id = randomize(32)
  const sql = `INSERT INTO aspek_praktek VALUES (null,  '${aspekDinilai}', '${req.params.id}', '${id}', '${skor0}', '${skor1}', '${skor2}', '${inp0}', '${inp1}', '${inp2}')`
  koneksi.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.statusMessage = "Berhasil tambah aspek"
    res.status(200).end()
  })
}

praktek.ubahSoal = (req, res) => {
  res.locals.nama = req.session.nama
  res.locals.isAdmin = req.session.isAdmin
  const sql = `SELECT * FROM soal_praktek WHERE id = '${req.params.id}'`
  koneksi.query(sql, (err, result) => {
    res.render("tulis-soal/lihat-soal/ubah-soal-praktek", {
      data: result,
      departemen: req.session.departemen,
    })
  })
}

praktek.updateSoal = (req, res) => {
  const {
    tinjauan1,
    subtinjauan2,
    tinjauan2,
    tinjauan3,
    tinjauan4,
    tujuan,
    skenarioKlinik,
    tugasKandidat,
    tugasPenguji,
    intruksiPasien,
    peralatan,
    departemen,
    namaDepartemen,
    referensi,
  } = req.body

  if (req.session.isAdmin) {
    const sql = `UPDATE soal_praktek SET tinjauan1 = '${tinjauan1}', tinjauan2 = '${tinjauan2}', subtinjauan2 = '${subtinjauan2}', tinjauan3 = '${tinjauan3}', tinjauan4 = '${tinjauan4}', tujuan = '${tujuan}', skenario_klinik = '${skenarioKlinik}', tugas_kandidat = '${tugasKandidat}', tugas_penguji = '${tugasPenguji}', intruksi_pasien = '${intruksiPasien}', peralatan = '${peralatan}', departemen = '${departemen}', nama_departemen = '${namaDepartemen}',referensi = '${referensi}' WHERE id = '${req.params.id}'`
    koneksi.query(sql, (err, result) => {
      if (err) throw err
      console.log(result)
      res.statusMessage = "Berhasil update soal"
      res.status(200).json({ message: "Berhasil mengubah soal praktek" })
    })
  } else {
    const sql = `UPDATE soal_praktek SET tinjauan1 = '${tinjauan1}', tinjauan2 = '${tinjauan2}', subtinjauan2 = '${subtinjauan2}', tinjauan3 = '${tinjauan3}', tinjauan4 = '${tinjauan4}', tujuan = '${tujuan}', skenario_klinik = '${skenarioKlinik}', tugas_kandidat = '${tugasKandidat}', tugas_penguji = '${tugasPenguji}', intruksi_pasien = '${intruksiPasien}', peralatan = '${peralatan}', referensi = '${referensi}' WHERE id = '${req.params.id}'`
    koneksi.query(sql, (err, result) => {
      if (err) throw err
      console.log(result)
      res.statusMessage = "Berhasil update soal"
      res.status(200).json({ message: "Berhasil mengubah soal praktek" })
    })
  }
}

praktek.ubahAspek = (req, res) => {
  res.locals.nama = req.session.nama
  res.locals.isAdmin = req.session.isAdmin
  const sql = `SELECT * FROM aspek_praktek WHERE id = '${req.params.idAspek}'`
  koneksi.query(sql, (err, result) => {
    if (err) throw err
    res.render("tulis-soal/lihat-soal/ubah-aspek", {
      data: result,
      idSoal: req.params.idSoal,
    })
  })
}

praktek.updateAspek = (req, res) => {
  const { aspekDinilai, inp0, inp1, inp2, skor0, skor1, skor2 } = req.body

  const sql = `UPDATE aspek_praktek SET aspek_dinilai = '${aspekDinilai}', skor0 = '${skor0}', skor1 = '${skor1}', skor2 = '${skor2}', ket_skor0 = '${inp0}', ket_skor1 = '${inp1}', ket_skor2 = '${inp2}' WHERE id = '${req.params.id}'`
  koneksi.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.statusMessage = "Berhasil mengubah aspek"
    res.status(201).end()
  })
}

praktek.ubahGambar = (req, res) => {
  ubahGambar(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res
        .status(500)
        .send({
          error: {
            message: `Multer uploading error: ${err.message}`,
          },
        })
        .end()
      return
    } else if (err) {
      if (err.name == "ExtensionError") {
        res
          .status(413)
          .send({ error: { message: err.message } })
          .end()
      } else {
        res
          .status(500)
          .send({
            error: {
              message: `unknown uploading error: ${err.message}`,
            },
          })
          .end()
      }
      return
    }

    const sql = `SELECT * FROM soal_praktek WHERE id = '${req.params.id}'`
    if (req.files.gambar1 && !req.files.gambar2) {
      const gambar1 = req.files.gambar1[0].path
      const replaceGambar1 = gambar1.split("\\").join("\\\\")
      koneksi.query(sql, (err, result) => {
        fs.unlink(result[0].gambar1, (err) => {
          if (err) throw err
        })
        koneksi.query(
          `UPDATE soal_praktek SET gambar1 = '${replaceGambar1}' WHERE id = '${req.params.id}'`,
          (err, result) => {
            res.statusMessage = "gambar 1 berhasil diubah"
            res.status(201).end()
          }
        )
      })
    } else if (!req.files.gambar1 && req.files.gambar2) {
      const gambar2 = req.files.gambar2[0].path
      const replaceGambar2 = gambar2.split("\\").join("\\\\")
      koneksi.query(sql, (err, result) => {
        fs.unlink(result[0].gambar2, (err) => {
          if (err) throw err
        })
        koneksi.query(
          `UPDATE soal_praktek SET gambar2 = '${replaceGambar2}' WHERE id = '${req.params.id}'`,
          (err, result) => {
            res.statusMessage = "gambar 1 berhasil diubah"
            res.status(201).end()
          }
        )
      })
    } else {
      const gambar1 = req.files.gambar1[0].path
      const replaceGambar1 = gambar1.split("\\").join("\\\\")
      const gambar2 = req.files.gambar2[0].path
      const replaceGambar2 = gambar2.split("\\").join("\\\\")
      koneksi.query(sql, (err, result) => {
        fs.unlink(result[0].gambar1, (err) => {
          if (err) throw err
        })
        fs.unlink(result[0].gambar2, (err) => {
          if (err) throw err
        })
        koneksi.query(
          `UPDATE soal_praktek set gambar1 = '${replaceGambar1}', gambar2 = '${replaceGambar2}' WHERE id = '${req.params.id}'`,
          (err, result) => {
            if (err) throw err
            res.statusMessage = "kedua gambar berhasil diubah"
            res.status(201).end()
          }
        )
      })
    }
  })
}

praktek.tambahGambar = (req, res) => {
  uploadSatuGambar(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res
        .status(500)
        .send({
          error: {
            message: `Multer uploading error: ${err.message}`,
          },
        })
        .end()
      return
    } else if (err) {
      if (err.name == "ExtensionError") {
        res
          .status(413)
          .send({ error: { message: err.message } })
          .end()
      } else {
        res
          .status(500)
          .send({
            error: {
              message: `unknown uploading error: ${err.message}`,
            },
          })
          .end()
      }
      return
    }

    koneksi.query(`SELECT * FROM soal_praktek WHERE id = '${req.params.id}'`, (err, result) => {
      console.log(result[0].gambar1)
      console.log(result[0].gambar2)
      if (result[0].gambar1 == "") {
        const gambar1 = req.file.path
        const replaceGambar1 = gambar1.split("\\").join("\\\\")
        const sql = `UPDATE soal_praktek SET gambar1 = '${replaceGambar1}' WHERE id = '${req.params.id}'`
        koneksi.query(sql, (err, result) => {
          if (err) throw err
          res.statusMessage = "gambar pertama berhasil diubah"
          res.status(201).end()
        })
      }

      if (result[0].gambar2 == "") {
        const gambar2 = req.file.path
        const replaceGambar2 = gambar2.split("\\").join("\\\\")
        const sql = `UPDATE soal_praktek SET gambar2 = '${replaceGambar2}' WHERE id = '${req.params.id}'`
        koneksi.query(sql, (err, result) => {
          if (err) throw err
          res.statusMessage = "gambar kedua berhasil diubah"
          res.status(201).end()
        })
      }
    })
  })
}

praktek.hapusGambar = (req, res) => {
  const gambarDihapus = req.params.gambar

  if (gambarDihapus == "gambar1") {
    koneksi.query(`SELECT * FROM soal_praktek WHERE id = '${req.params.id}'`, (err, result) => {
      fs.unlink(result[0].gambar1, (err) => {
        if (err) throw err
      })
      koneksi.query(
        `UPDATE soal_praktek SET gambar1 = '' WHERE id = '${req.params.id}'`,
        (err, result) => {
          if (err) throw err
          res.status(201).end()
        }
      )
    })
  } else {
    koneksi.query(`SELECT * FROM soal_praktek WHERE id = '${req.params.id}'`, (err, result) => {
      fs.unlink(result[0].gambar2, (err) => {
        if (err) throw err
      })
      koneksi.query(
        `UPDATE soal_praktek SET gambar2 = '' WHERE id = '${req.params.id}'`,
        (err, result) => {
          if (err) throw err
          res.status(201).end()
        }
      )
    })
  }
}

praktek.lihatHapusAspek = (req, res) => {
  res.locals.nama = req.session.nama
  const idSoal = req.params.id_soal
  const idAspek = req.params.id_aspek
  res.render("tulis-soal/lihat-soal/hapus-aspek", {
    idSoal,
    idAspek,
  })
}

praktek.hapusAspek = (req, res) => {
  const idSoal = req.params.idSoal
  const idAspek = req.params.idAspek
  const sql = `DELETE FROM aspek_praktek WHERE id = '${idAspek}' AND id_soal = '${idSoal}'`
  koneksi.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.status(201).end()
  })
}

module.exports = praktek
