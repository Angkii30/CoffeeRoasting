const express = require("express");
const router = express.Router(); // ✅ ต้องมี
const db = require("../db");     // เชื่อม database

// ================= API STOCK =================

router.get("/api/stock", (req, res) => {

    const search = req.query.search || "";
    const date = req.query.date || "";

    let sql = `
        SELECT 
            s.cherry_id,
            s.species,
            s.source_farm,
            s.receive_date,
            s.weight,
            s.buy_price,
            s.total_price,
            s.note, 
            u.username
        FROM stock_cherry s
        LEFT JOIN user u
        ON s.user_id = u.user_id
        WHERE 1=1
    `;

    let params = [];

    // 🔍 ค้นหา
    if (search) {

        sql += `
            AND (
                s.species LIKE ?
                OR s.source_farm LIKE ?
                OR u.username LIKE ?
            )
        `;

        const keyword = `%${search}%`;

        params.push(keyword, keyword, keyword);
    }

    // 📅 วันที่
    if (date) {

        sql += `
            AND DATE(s.receive_date) = ?
        `;

        params.push(date);
    }

    sql += " ORDER BY s.cherry_id DESC";

    db.query(sql, params, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

// ================= DELETE STOCK =================
router.delete("/api/stock/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM stock_cherry WHERE cherry_id = ?",
        [id],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {
                return res.json({ success: false });
            }

            res.json({ success: true });
        }
    );
});
// ================= EXPORT =================
module.exports = router; 
