const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.post("/add_user", async (req, res) => {

    const { username, password, role } = req.body;

    try {

        const hash = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO \`user\`
            (username, password, role)
            VALUES (?, ?, ?)
        `;

        db.query(sql, [username, hash, role], (err) => {

            // ❌ username ซ้ำ
            if (err && err.code === "ER_DUP_ENTRY") {

                return res.send(`
                    <script>
                        alert("❌ ชื่อผู้ใช้นี้มีอยู่แล้ว");
                        window.location.href = "/add_user";
                    </script>
                `);
            }

            // ❌ error อื่น
            if (err) {
                console.log(err);
                return res.send(`
                    <script>
                        alert("❌ เกิดข้อผิดพลาด");
                        window.location.href = "/add_user";
                    </script>
                `);
            }

            // ✅ สำเร็จ
            res.send(`
                <script>
                    alert("✅ เพิ่มผู้ใช้สำเร็จ");
                    window.location.href = "/user";
                </script>
            `);

        });

    } catch (error) {

        console.log(error);
        res.send("Server Error");

    }
});

module.exports = router;
