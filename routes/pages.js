const express = require("express");
const router = express.Router();
const db = require("../db");
const path = require("path");

/* หน้าแรก → login */
router.get("/", (req, res) => {
    res.render("login");
});

/* login (เผื่อพิมพ์ /login) */
router.get("/login", (req, res) => {
    res.render("login");
});

/* LOGIN CHECK */
router.post("/login", (req, res) => {

    const { username, password } = req.body;

    const sql = `
        SELECT * FROM user
        WHERE username = ? AND password = ?
    `;

    db.query(sql, [username, password], (err, result) => {

        if (err) {
            console.log(err);
            return res.json({
                success: false,
                message: "Database Error"
            });
        }

        if (result.length > 0) {

            res.json({
                success: true
            });

        } else {

            res.json({
                success: false,
                message: "Username หรือ Password ไม่ถูกต้อง"
            });

        }

    });
});
function auth(req, res, next) {

    if (!req.session || !req.session.user) {
        return res.redirect("/login.html");
    }

    next();
}

router.get("/index.html", auth, (req, res) => {

    res.sendFile(path.join(__dirname, "..", "public", "index.html"));

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
