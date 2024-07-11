const { koneksi } = require("../utils/db")

var dashboardController = {}

function getJumlah(table) {
  return new Promise((resolve, reject) => {
    koneksi.query(`SELECT COUNT(nomor) AS nomor FROM ${table}`, (err, data) => {
      if (err) throw err

      resolve(data[0].nomor)
    })
  })
}

dashboardController.getInfoBoxData = async (req, res) => {
  var jumlahSoalTeori = await getJumlah("soal_teori")
  var jumlahSoalPraktek = await getJumlah("soal_praktek")
  var jumlahPenulis = await getJumlah("penulis")
  const data = { jumlahPenulis, jumlahSoalTeori, jumlahSoalPraktek }

  return data
}

module.exports = dashboardController
