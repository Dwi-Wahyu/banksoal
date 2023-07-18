const express = require("express");
const router = express.Router();

const penulis = require("../controllers/penulis");

router.get("/daftar-penulis", (req, res) => {
    res.locals.nama = req.session.nama;
    res.render("penulis/daftar-penulis", { title: "datatable" });
});

router.get("/daftar-penulis/data", penulis.daftarPenulis);

router.get("/tambah-penulis", (req, res) => {
    res.locals.nama = req.session.nama;
    res.render("penulis/form-tambah-penulis");
});

router.get("/detail-penulis/:id", penulis.detailPenulis);

router.post("/tambah-penulis", penulis.tambahPenulis);

router.post("/update-penulis/:id", penulis.updatePenulis);

router.get("/profil", (req, res) => {
    res.render("penulis/profil");
});

module.exports = router;
