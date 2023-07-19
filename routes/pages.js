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
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/");
    });
});

router.get("/dashboard", (req, res) => {
    const nama = req.session.nama;
    res.locals.isAuthenticated = req.session.isAuthenticated;
    if (req.session.isAuthenticated) {
        if (nama.includes("admin")) {
            res.render("dashboardAdmin", { nama: req.session.nama });
        } else {
            res.render("dashboardPenulis", {
                nama: req.session.nama,
                namaDepartemen: req.session.namaDepartemen,
            });
        }
    } else {
        res.render("dashboardAdmin");
    }
});

router.post("/login", login);

module.exports = router;
