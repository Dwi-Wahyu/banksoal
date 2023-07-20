const express = require("express");
const multer = require("multer");
const router = express.Router();

const teori = require("../controllers/soal-teori");
const praktek = require("../controllers/soal-praktek");
const path = require("path");

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

router.get("/export-soal-teori", (req, res) => {
    res.locals.isAdmin = req.session.isAdmin;
    res.locals.nama = req.session.nama;
    res.render("tulis-soal/export-soal-teori");
});

router.get("/daftar-soal-teori/data", teori.daftarSoal);

router.get("/daftar-soal-praktek/data", praktek.daftarSoal);

router.get("/lihat-soal-teori/:id", teori.lihatSoal);

router.get("/lihat-soal-praktek/:id", praktek.lihatSoal);

router.get("/ubah-soal-teori/:id", teori.ubahSoal);

router.get("/ubah-soal-praktek/:id", praktek.ubahSoal);

router.get("/tambah-aspek/:id", praktek.lihatTambahAspek);

router.get("/ubah-aspek/:idSoal/:idAspek", praktek.ubahAspek);

router.get("/:id_soal/:id_aspek", praktek.lihatHapusAspek);

router.get("/get-template-teori", (req, res) => {
    res.download("teori.csv", { root: path.join(__dirname) }, (err) => {
        if (err) throw err;
    });
});

router.post("/tambah-aspek/:id", praktek.tambahAspek);

router.post("/lihat-soal/ubah-gambar-teori/:id", teori.ubahGambar);

router.post("/lihat-soal/tambah-gambar-teori/:id", teori.tambahGambar);

router.post("/lihat-soal/ubah-gambar-praktek/:id", praktek.ubahGambar);

router.post("/lihat-soal/tambah-gambar-praktek/:id", praktek.tambahGambar);

router.post("/lihat-soal/ubah-soal-teori/:id", teori.updateSoal);

router.post("/lihat-soal/ubah-soal-praktek/:id", praktek.updateSoal);

router.post("/ubah-aspek/:id", praktek.updateAspek);

router.post("/form-soal-teori/tambah-soal", teori.tambahSoal);

router.post("/form-soal-praktek/tambah-soal", praktek.tambahSoal);

router.delete("/lihat-soal/hapus-gambar-teori/:id", teori.hapusGambar);

router.delete("/hapus-aspek/:idSoal/:idAspek", praktek.hapusAspek);

router.delete("/hapus-gambar-praktek/:id/:gambar", praktek.hapusGambar);

router.get("/telaah-soal-teori", (req, res) => {
    res.render("telaah-soal/telaah-soal-teori");
});

router.get("/telaah-soal-praktek", (req, res) => {
    res.render("telaah-soal/telaah-soal-praktek");
});

module.exports = router;
