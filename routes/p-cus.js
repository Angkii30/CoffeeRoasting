const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/api/cus", (req, res) => {

    const search = req.query.search || "";
    const date = req.query.date || "";

    let sql = `
        SELECT * FROM customer
        WHERE 1=1
    `;

    let params = [];

    // ค้นหาจาก text
    if (search) {
        sql += `
            AND (
                customer_id LIKE ?
                OR first_name LIKE ?
                OR last_name LIKE ?
                OR province LIKE ?
            )
        `;

        const keyword = `%${search}%`;

        params.push(keyword, keyword, keyword, keyword);
    }

    // ค้นหาจากวันที่
    if (date) {
        sql += `
            AND DATE(created_at) = ?
        `;

        params.push(date);
    }

    sql += " ORDER BY customer_id DESC";

    db.query(sql, params, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);
    });
});


router.delete("/api/cus/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM customer WHERE customer_id = ?",
        [id],
        (err) => {
            if (err) return res.status(500).json(err);

            res.json({ success: true });
        }
    );

});


module.exports = router;
