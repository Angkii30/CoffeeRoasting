const express = require("express");
const router = express.Router();
const db = require("../db");


// ================= GET =================
router.get("/api/kala", (req, res) => {

    const search = req.query.search || "";
    const date = req.query.date || "";

    let sql = `
        SELECT * FROM stock_kala
        WHERE 1=1
    `;

    let params = [];

    // ค้นหา text
    if (search) {

        sql += `
            AND (
                species LIKE ?
                OR process_method LIKE ?
                OR note LIKE ?
            )
        `;

        const key = `%${search}%`;

        params.push(key, key, key);
    }

    // ค้นหาวันที่
    if (date) {

        sql += `
            AND DATE(receive_date) = ?
        `;

        params.push(date);
    }

    sql += " ORDER BY kala_id DESC";

    db.query(sql, params, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);

    });
});


// ================= DELETE =================
router.delete("/api/kala/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM stock_kala WHERE kala_id=?",
        [id],
        err => {

            if (err)
                return res.status(500).json(err);

            res.json({ success: true });

        }
    );
});

module.exports = router;
