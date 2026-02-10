const express = require("express");
const router = express.Router();
const db = require("../db");

// router.get("/add_customer", (req, res) => {
//     res.render("add_customer", { query: req.query });
// });

router.get("/api/customer/:id", (req, res) => {

    const id = req.params.id;

    const sql = `
        SELECT first_name,last_name,address,province,phone,email
        FROM customer
        WHERE customer_id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            return res.json({ found: false });
        }

        res.json({
            found: true,
            data: result[0]
        });
    });

});

router.post("/add_customer", (req, res) => {

    const {
        first_name,
        last_name,
        address,
        province,
        phone,
        email
    } = req.body;

    const sql = `
        INSERT INTO customer
        (first_name, last_name, address, province, phone, email)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        first_name,
        last_name,
        address,
        province,
        phone,
        email
    ], (err, result) => {

        if (err) {
            console.log(err);
            return res.redirect("/add_customer?error=1");
        }

        // ✅ ต้องเป็นแบบนี้เท่านั้น
        return res.redirect("/add_customer?success=1");
    });

});
module.exports = router;