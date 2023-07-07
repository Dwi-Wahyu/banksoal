const express = require("express");
const router = express.Router();

const {
    updatePenulis,
    tambahPenulis,
    detailPenulis,
    daftarPenulis,
} = require("../controllers/penulis");

router.get("/daftar-penulis", (req, res) => {
    res.render("penulis/daftar-penulis", { title: "datatable" });
});

router.get("/daftar-penulis/data", daftarPenulis);

router.get("/tambah-penulis", (req, res) => {
    res.render("penulis/form-tambah-penulis");
});

router.get("/form-tambah-penulis", (req, res) => {
    res.render("form-tambah-penulis");
});

router.get("/detail-penulis/:id", detailPenulis);

router.post("/tambah-penulis", tambahPenulis);

router.post("/update-penulis/:email", updatePenulis);

router.get("/profil", (req, res) => {
    res.render("penulis/profil");
});

module.exports = router;
