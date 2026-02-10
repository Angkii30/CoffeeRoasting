const express = require("express");
const router = express.Router();
const db = require("../db");


/* ดึงรายการสั่งซื้อ */
router.get("/api/plan", (req, res) => {

    const sql = `
        SELECT
            o.order_id,
            o.order_status,
            o.created_at,

            c.customer_id,
            c.first_name,
            c.last_name,

            r.roast_level,
            r.process_method

        FROM orders o

        LEFT JOIN customer c
        ON o.customer_id = c.customer_id

        LEFT JOIN orderdetails d
        ON o.order_id = d.order_id

        LEFT JOIN stock_roast r
        ON d.roast_id = r.roast_id

        ORDER BY o.order_id DESC;

    `;

    db.query(sql, (err, result) => {

        if (err) return res.status(500).json(err);

        res.json(result);
    });
});


/* ลบ order */
router.delete("/api/plan/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM orders WHERE order_id = ?",
        [id],
        err => {

            if (err) return res.status(500).json(err);

            res.json({ success: true });
        }
    );
});

module.exports = router;
