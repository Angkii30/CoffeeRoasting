const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project"   
});


router.get("/edit_customer", (req, res) => {
    const id = req.query.id;

    const sql = "SELECT * FROM customer WHERE customer_id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.send("เกิดข้อผิดพลาด");
        }

        res.render("edit_customer", {
            customer: result[0]
        });
    });
});

// =========================
// อัปเดตข้อมูลลูกค้า
// =========================
router.post("/update_customer", (req, res) => {

    const { 
        customer_id,
        firstname,
        lastname,
        address,
        phone,
        province,
        email
    } = req.body;

    const sql = `
        UPDATE customer
        SET first_name = ?,
            last_name = ?,
            address = ?,
            phone = ?,
            province = ?,
            email = ?
        WHERE customer_id = ?
    `;

    const params = [
        firstname,
        lastname,
        address,
        phone,
        province,
        email,
        customer_id
    ];

    connection.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return res.send("เกิดข้อผิดพลาด");
        }

        res.send(`
            <script>
                alert("แก้ไขข้อมูลสำเร็จ");
                window.location.href = "/customer";
            </script>
        `);
    });

});

module.exports = router;
