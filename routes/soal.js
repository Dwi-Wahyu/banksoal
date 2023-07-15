const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
    TambahSoalTeori,
    DaftarSoalTeori,
    LihatSoalTeori,
    UbahSoalTeori,
    UbahGambarTeori,
    UpdateSoalTeori,
} = require("../controllers/soal-teori");

const praktek = require("../controllers/soal-praktek");

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
    res.locals.nama = req.session.nama;
    if (req.session.isAdmin) {
        res.render("tulis-soal/form-soal-teori", {
            departemen: "admin",
        });
    } else {
        res.render("tulis-soal/form-soal-teori", {
            departemen: req.session.departemen,
        });
    }
});

router.get("/form-soal-praktek", (req, res) => {
    res.locals.nama = req.session.nama;
    if (req.session.isAdmin) {
        res.render("tulis-soal/form-soal-praktek", {
            departemen: "admin",
        });
    } else {
        res.render("tulis-soal/form-soal-praktek", {
            departemen: req.session.departemen,
        });
    }
});

router.get("/daftar-soal-teori", (req, res) => {
    res.locals.isAdmin = req.session.isAdmin;
    res.locals.nama = req.session.nama;
    res.render("tulis-soal/daftar-soal-teori");
});

router.get("/daftar-soal-praktek", (req, res) => {
    res.locals.isAdmin = req.session.isAdmin;
    res.locals.nama = req.session.nama;
    res.render("tulis-soal/daftar-soal-praktek");
});

router.get("/daftar-soal-teori/data", DaftarSoalTeori);

router.get("/daftar-soal-praktek/data", praktek.daftarSoal);

router.get("/lihat-soal/:id", LihatSoalTeori);

router.get("/lihat-soal-praktek/:id", praktek.lihatSoal);

router.get("/ubah-soal-teori/:id", UbahSoalTeori);

router.get("/ubah-soal-praktek/:id", praktek.ubahSoal);

router.get("/tambah-aspek/:id", praktek.lihatTambahAspek);

router.get("/ubah-aspek/:id", praktek.ubahAspek);

router.post("/tambah-aspek/:id", praktek.tambahAspek);

router.post(
    "/lihat-soal/ubah-gambar/:id",
    uploadTeori.single("gambarBaru"),
    UbahGambarTeori
);

router.post("/lihat-soal/ubah-soal-teori/:id", UpdateSoalTeori);

router.post("/lihat-soal/ubah-soal-praktek/:id", praktek.updateSoal);

router.post("/ubah-aspek/:id", praktek.updateAspek);

router.post(
    "/form-soal-teori/tambah-soal",
    uploadTeori.single("gambar"),
    TambahSoalTeori
);

router.post("/form-soal-praktek/tambah-soal", praktek.tambahSoal);

router.get("/telaah-soal-teori", (req, res) => {
    res.render("telaah-soal/telaah-soal-teori");
});

router.get("/telaah-soal-praktek", (req, res) => {
    res.render("telaah-soal/telaah-soal-praktek");
});

module.exports = router;
