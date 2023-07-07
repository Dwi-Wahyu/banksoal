const express = require("express");

const buatSoal = (req, res) => {
    console.log(req.body);
    console.log(req.file.path);

    res.status(200).json({ message: "Berhasil menerima data" });
};

module.exports = buatSoal;
