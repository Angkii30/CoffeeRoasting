const express = require("express");
const router = express.Router();

/* หน้าแรก → login */
router.get("/", (req, res) => {
    res.render("login");
});

/* login (เผื่อพิมพ์ /login) */
router.get("/login", (req, res) => {
    res.render("login");
});

/* หน้าแรกหลัง login */
router.get("/index", (req, res) => {
    res.render("index");
});

/* อื่น ๆ */
router.get("/stockall", (req, res) => {
    res.render("stockall");
});

router.get("/stock", (req, res) => {
    res.render("stock");
});

router.get("/customer", (req, res) => {
    res.render("customer");
});

router.get("/plan", (req, res) => {
    res.render("plan");
});

router.get("/user", (req, res) => {
    res.render("user");
});

module.exports = router;
