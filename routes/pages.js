const express = require("express");
const router = express.Router();
const login = require("../controllers/login");

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/dashboard", (req, res) => {
    res.render("dashboard");
});

router.post("/login", login);

module.exports = router;
