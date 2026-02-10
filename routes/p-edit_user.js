const express = require("express");
const router = express.Router();
const db = require("../db"); // ปรับ path ให้ตรงโปรเจกต์อัง

/* GET หน้าแก้ไข */
router.get("/", (req, res) => {
    const userId = req.query.id;

    const sql = "SELECT * FROM users WHERE user_id = ?";
    db.query(sql, [userId], (err, result) => {
        if (err) throw err;

        res.render("edit_user", {
            user: result[0]
        });
    });
});

/* POST บันทึกการแก้ไข */
router.post("/update", (req, res) => {
    const { user_id, password, role } = req.body;

    let sql;
    let params;

    // 🔑 ถ้าไม่กรอกรหัสผ่าน → ไม่เปลี่ยน
    if (!password || password.trim() === "") {
        sql = "UPDATE users SET role = ? WHERE user_id = ?";
        params = [role, user_id];
    } else {
        sql = "UPDATE users SET password = ?, role = ? WHERE user_id = ?";
        params = [password, role, user_id];
        // 👉 ถ้าใช้จริง แนะนำ hash password ก่อน
    }

    db.query(sql, params, (err) => {
        if (err) throw err;

        res.redirect("/user");
    });
});

module.exports = router;
