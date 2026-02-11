const express = require("express");
const router = express.Router();
const db = require("../db");

/* GET หน้าแก้ไข */
router.get("/", (req, res) => {
    const userId = req.query.id;

    const sql = "SELECT * FROM user WHERE user_id = ?";
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

    if (!password || password.trim() === "") {
        sql = "UPDATE user SET role = ? WHERE user_id = ?";
        params = [role, user_id];
    } else {
        sql = "UPDATE user SET password = ?, role = ? WHERE user_id = ?";
        params = [password, role, user_id];
    }

    db.query(sql, params, (err) => {
        if (err) throw err;

        res.send(`
            <script>
                alert("✅ บันทึกการแก้ไขเรียบร้อยแล้ว");
                window.location.href = "/user";
            </script>
        `);
    });
});

module.exports = router;
