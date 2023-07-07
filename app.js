const express = require("express");
const multer = require("multer");
const bodyparser = require("body-parser");
const crypto = require("crypto-js");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
const slugify = require("slugify");

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    },
});
const upload = multer({ storage: storage });
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname)));

app.set("view engine", "ejs");
app.set("views", "./view");

const pages = require("./routes/pages");
const db = require("./utils/db");
const buatSoal = require("./controllers/buatSoal");
const tambahSoal = require("./controllers/soal-teori");
const penulisRoute = require("./routes/penulis");
const soalRotue = require("./routes/soal");

var hash = crypto.MD5("Message").toString();
var ciphertext = crypto.AES.encrypt("my message", "secret key 123").toString();
var bytes = crypto.AES.decrypt(ciphertext, "secret key 123");
var originalText = bytes.toString(crypto.enc.Utf8);

app.use("/", pages);
app.use("/penulis", penulisRoute);
app.use("/tulis-soal", soalRotue);
app.post("/buat-soal", upload.single("gambar"), buatSoal);

app.use(express.static(__dirname + "/view/"));

app.listen(port, (e) => {
    console.log("Menerima sambungan pada ", port);
});

// push dari wahyu
