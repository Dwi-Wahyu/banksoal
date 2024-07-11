const express = require("express")
const router = express.Router()
const loginController = require("../controllers/login")
const { getInfoBoxData } = require("../controllers/dashboard")

const loginAuth = (req, res, next) => {
  if (req.session.isAuthenticated) {
    res.redirect("/dashboard")
  } else {
    next()
  }
}

const auth = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next()
  } else {
    res.redirect("/")
  }
}

router.get("/", loginAuth, (req, res) => {
  res.render("index")
})

router.get("/signout", auth, (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err
    res.redirect("/")
  })
})

router.get("/dashboard", auth, async (req, res) => {
  const nama = req.session.nama
  const infoBoxData = await getInfoBoxData()

  res.locals.infoBoxData = infoBoxData
  res.locals.nama = req.session.nama

  if (nama.includes("admin")) {
    res.locals.roles = "admin"
  } else {
    res.locals.roles = "penulis"
    res.locals.namaDepartemen = req.session.namaDepartemen
  }

  res.render("dashboard")
})

router.post("/login", loginController)

module.exports = router
