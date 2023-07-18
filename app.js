require("dotenv").config();

const express = require("express");
const bodyparser = require("body-parser");
const crypto = require("crypto-js");
const session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;

const age = 24 * 60 * 60 * 1000;
const options = {
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    port: "3306",
};
const sessionStore = new mysqlStore(options);
app.use(
    session({
        name: process.env.SESSION_NAME,
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        cookie: { maxAge: age },
        resave: false,
        store: sessionStore,
    })
);

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname)));
app.set("view engine", "ejs");
app.set("views", "./view");

const pages = require("./routes/pages");
const db = require("./utils/db").connection;
const tambahSoal = require("./controllers/soal-teori");
const penulisRoute = require("./routes/penulis");
const soalRoute = require("./routes/soal");

var hash = crypto.MD5("Message").toString();
var ciphertext = crypto.AES.encrypt("my message", "secret key 123").toString();
var bytes = crypto.AES.decrypt(ciphertext, "secret key 123");
var originalText = bytes.toString(crypto.enc.Utf8);

const auth = (req, res, next) => {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.redirect("/");
    }
};

app.use("/", pages);
app.use("/penulis", penulisRoute);
app.use("/tulis-soal", soalRoute);
app.use("/telaah-soal", soalRoute);
// app.use("/penulis", auth, penulisRoute);
// app.use("/tulis-soal", auth, soalRoute);
// app.use("/telaah-soal", auth, soalRoute);

app.use(express.static(__dirname + "/view"));
app.use(express.static(__dirname + "/view/assets"));

app.get("/login", (req, res) => {
    res.render("login");
});

app.listen(port, (e) => {
    console.log("Menerima sambungan pada ", port);
});
