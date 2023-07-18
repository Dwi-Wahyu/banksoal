const express = require("express");
const router = express.Router();
const login = require("../controllers/login");

const loginAuth = (req, res, next) => {
    if (req.session.isAuthenticated) {
        res.redirect("/dashboard");
    } else {
        next();
    }
};

const auth = (req, res, next) => {
    if (req.session.isAuthenticated) {
        next();
    } else {
        res.redirect("/");
    }
};

router.get("/", loginAuth, (req, res) => {
    res.render("index");
});

router.get("/signout", auth, (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

router.get("/dashboard", auth, (req, res) => {
    const nama = req.session.nama;
    if (nama.includes("admin")) {
        res.render("dashboardAdmin", { nama: req.session.nama });
    } else {
        res.render("dashboardPenulis", {
            nama: req.session.nama,
            namaDepartemen: req.session.namaDepartemen,
        });
    }
});

router.post("/login", login);

module.exports = router;
