const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
    TambahSoalTeori,
    DaftarSoalTeori,
    LihatSoalTeori,
    UbahSoalTeori,
    UbahGambarTeori,
} = require("../controllers/soal-teori");

const storageTeori = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "images/soal-teori");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    },
});
const uploadTeori = multer({ storage: storageTeori });

router.get("/form-soal-teori", (req, res) => {
    res.render("tulis-soal/form-soal-teori");
});

router.get("/form-soal-praktek", (req, res) => {
    res.render("tulis-soal/form-soal-praktek");
});

router.get("/daftar-soal-teori", (req, res) => {
    res.render("tulis-soal/daftar-soal-teori");
});

router.get("/daftar-soal-teori/data", DaftarSoalTeori);

router.get("/daftar-soal-praktek", (req, res) => {
    res.render("tulis-soal/daftar-soal-praktek");
});

router.get("/lihat-soal/:id", LihatSoalTeori);

router.get("/ubah-soal-teori/:id", UbahSoalTeori);

router.post(
    "/lihat-soal/ubah-gambar/:id",
    uploadTeori.single("gambarBaru"),
    UbahGambarTeori
);

router.post(
    "/form-soal-teori/tambah-soal",
    uploadTeori.single("gambar"),
    TambahSoalTeori
);

router.get("/telaah-soal-teori", (req, res) => {
    res.render("telaah-soal/telaah-soal-teori");
});

router.get("/telaah-soal-praktek", (req, res) => {
    res.render("telaah-soal/telaah-soal-praktek");
});

module.exports = router;
