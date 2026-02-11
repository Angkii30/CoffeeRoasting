const express = require("express");
const router = express.Router();
const db = require("../db");
const path = require("path");
const bcrypt = require("bcrypt");


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
        WHERE username = ?
    `;

    db.query(sql, [username], async (err, result) => {

        if (err) {
            console.log(err);
            return res.json({
                success: false,
                message: "Database Error"
            });
        }

        // ไม่เจอ user
        if (result.length === 0) {
            return res.json({
                success: false,
                message: "Username หรือ Password ไม่ถูกต้อง"
            });
        }

        const user = result[0];
        const dbPassword = user.password;

        let isMatch = false;

        // ✅ กรณี password ถูก hash แล้ว
        if (dbPassword.startsWith("$2")) {

            isMatch = await bcrypt.compare(password, dbPassword);

        }
        // ✅ กรณี password ยังไม่ hash
        else {

            isMatch = (password === dbPassword);

            // ⭐ อัปเกรดเป็น hash อัตโนมัติ
            if (isMatch) {

                const newHash = await bcrypt.hash(password, 10);

                db.query(
                    "UPDATE user SET password=? WHERE user_id=?",
                    [newHash, user.user_id]
                );
            }
        }

        // ❌ รหัสผิด
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Username หรือ Password ไม่ถูกต้อง"
            });
        }

        // ✅ ผ่าน
        res.json({
            success: true
        });

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

router.get("/stockkala", (req, res) => {
    res.render("stockkala");
});

router.get("/stockroast", (req, res) => {
    res.render("stockroast");
});

router.get("/stocksan", (req, res) => {
    res.render("stocksan");
});

router.get("/customer", (req, res) => {
    res.render("customer");
});

////////////customer/////////////

router.get("/add_customer", (req, res) => {
    res.render("add_customer", { query: req.query });
});


router.get("/plan", (req, res) => {
    res.render("plan");
});

router.get("/user", (req, res) => {
    res.render("user");
});


router.get("/add_order", (req, res) => {
    res.render("add_order");
});

router.get("/add_customer", (req, res) => {
    res.render("add_customer");
});

router.get("/add_stock", (req, res) => {
    res.render("add_stock");
});

router.get("/add_stockkala", (req, res) => {
    res.render("add_stockkala");
});

router.get("/add_stockroast", (req, res) => {
    res.render("add_stockroast");
});

router.get("/add_stocksan", (req, res) => {
    res.render("add_stocksan");
});

router.get("/add_user", (req, res) => {
    res.render("add_user");
});

router.get("/edit_customer", (req, res) => {
    const id = req.query.id;

    db.query("SELECT * FROM customer WHERE customer_id = ?", [id], (err, result) => {
        if (err) throw err;

        console.log(result[0]); // 👈 ใส่ตรงนี้

        res.render("edit_customer", {
            customer: result[0]
        });
    });
});




router.get("/edit_stock", (req, res) => {
    res.render("edit_stock");
});

router.get("/edit_stockkala", (req, res) => {
    res.render("edit_stockkala");
});

router.get("/edit_stockroast", (req, res) => {
    res.render("edit_stockroast");
});

router.get("/edit_stocksan", (req, res) => {
    res.render("edit_stocksan");
});

router.get('/edit_user/:id', (req, res) => {
    const id = req.params.id;

    db.query(
        'SELECT * FROM user WHERE user_id = ?',
        [id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.send('Database error');
            }

            res.render('edit_user', {
                user: result[0]   // ⭐ ตรงนี้สำคัญ
            });
        }
    );
});




router.get("/edit_order", (req, res) => {
    res.render("edit_order");
});
module.exports = router;
