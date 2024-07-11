require("dotenv").config()

const express = require("express")
const bodyparser = require("body-parser")
const session = require("express-session")
const mysqlStore = require("express-mysql-session")(session)
const path = require("path")
const app = express()
const port = process.env.PORT || 8080

const age = 24 * 60 * 60 * 1000
const options = {
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
  port: "3306",
}
const sessionStore = new mysqlStore(options)
app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: { maxAge: age },
    resave: false,
    store: sessionStore,
  })
)

// Middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname)))
app.use("/partials", express.static(path.join(__dirname, "view/partials")))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "view"))

// Import routes
const pages = require("./routes/pages")
const penulisRoute = require("./routes/penulis")
const soalRoute = require("./routes/soal")

// Routes middleware
const globalVariable = require("./middleware/globalVariable")
const auth = require("./middleware/auth")

app.use("/", pages)
app.use("/penulis", auth, globalVariable, penulisRoute)
app.use("/tulis-soal", auth, globalVariable, soalRoute)

app.use("/src", express.static(path.join(process.cwd(), "src")))

app.use(express.static(__dirname + "/src/view"))
app.use(express.static(__dirname + "/src/view/assets"))

app.get("/login", (req, res) => {
  res.render("login")
})

app.listen(port, (e) => {
  console.log(`http://localhost:${port}`)
})

module.exports = app
