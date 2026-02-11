const express = require("express");
const router = express.Router();
const db = require("../db");


// ================= GET =================
router.get("/api/stockkala", (req, res) => {

    const search = req.query.search || "";
    const date = req.query.date || "";

    let sql = `
       SELECT 
            k.kala_id,
            k.species,
            k.process_method,
            k.receive_date,
            k.weight_before,
            k.weight_after,
            k.note,
            u.username
        FROM stock_kala k

        LEFT JOIN user u
        ON k.user_id = u.user_id

        WHERE 1=1
    `;

    let params = [];


    // 🔍 Search
    if (search) {

        sql += `
            AND (
                k.species LIKE ?
                OR k.process_method LIKE ?
                OR u.username LIKE ?
            )

        `;

        const key = `%${search}%`;

        params.push(key, key, key);

    }


    // 📅 Date
    if (date) {

        sql += ` 
        AND DATE(k.receive_date) = ?
        `;

        params.push(date);
    }


    sql += " ORDER BY k.kala_id DESC";


    db.query(sql, params, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);
    });

});



// ================= DELETE =================
router.delete("/api/stockkala/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM stock_kala WHERE kala_id = ?",
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


module.exports = router;
