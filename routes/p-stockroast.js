const express = require("express");
const router = express.Router();
const db = require("../db");


// ================= GET =================
router.get("/api/stockroast", (req, res) => {

    const search = req.query.search || "";

    let sql = `
        SELECT 
            r.roast_id,
            r.process_method,
            r.roast_level,
            r.roast_date,
            r.expire_date,
            r.weight_before,
            r.weight_after,
            r.loss_percent,
            r.pack_size,
            r.pack_count,
            r.sell_price,
            r.note,

            u.username,
            s.species

        FROM stock_roast r

        LEFT JOIN user u
            ON r.user_id = u.user_id

        LEFT JOIN stock_san s
            ON r.san_id = s.san_id

        WHERE 1=1
    `;

    let params = [];


    // Search
    if (search) {

        sql += `
            AND (
                s.species LIKE ?
                OR r.process_method LIKE ?
                OR r.roast_level LIKE ?
                OR u.username LIKE ?
            )
        `;

        const key = `%${search}%`;

        params.push(key, key, key, key);
    }


    sql += " ORDER BY r.roast_id DESC";


    db.query(sql, params, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);
    });

});



// ================= DELETE =================
router.delete("/api/stockroast/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM stock_roast WHERE roast_id = ?",
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
