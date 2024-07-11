const bcrypt = require("bcrypt")
const { koneksi } = require("../utils/db")

const loginController = async (req, res) => {
  const { user, pass } = req.body

  function getUser(user) {
    const sql = `SELECT * FROM penulis WHERE email = ?`
    return new Promise((resolve, reject) => {
      koneksi.query(sql, [user], (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })
  }

  const adaEmail = await getUser(user)
  let passBenar = false

  if (adaEmail.length) {
    const valid = await bcrypt.compare(pass, adaEmail[0].password)
    passBenar = valid
  } else {
    res.status(301).json({ message: "Tidak ada username" })
  }

  if (!passBenar && adaEmail.length) {
    res.status(302).json({ message: "Password salah" })
  }

  if (adaEmail.length && passBenar) {
    req.session.email = adaEmail[0].email
    req.session.departemen = adaEmail[0].departemen
    req.session.namaDepartemen = adaEmail[0].nama_departemen
    req.session.nama = adaEmail[0].first_name + " " + adaEmail[0].last_name
    req.session.isAuthenticated = true

    if (adaEmail[0].email.includes("admin")) {
      req.session.isAdmin = true
      req.session.save(() => {
        res.status(201).json({ message: "Berhasil login" })
      })
    } else {
      req.session.isAdmin = false
      req.session.save(() => {
        res.status(201).json({ message: "Berhasil login" })
      })
    }
  }
}

module.exports = loginController
