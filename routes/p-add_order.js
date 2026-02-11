console.log("🔥 USING FIXED VERSION");

const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/add_order", (req, res) => {

    console.log("BODY =", req.body);

    const {
        customer_id,
        order_date,
        delivery_date,
        order_status,
        quantity,
        price,
        total_price
    } = req.body;

    // ✅ เช็คค่าจำเป็นก่อน
    if (!customer_id || !order_date || !delivery_date || !quantity || !price) {
        return res.status(400).send("Missing required fields");
    }

    const roast_id = 1;
    const user_id = 1;

    // เริ่ม transaction ป้องกันข้อมูลค้าง
    db.beginTransaction((err) => {

        if (err) {
            console.error("Transaction error:", err);
            return res.status(500).send("Transaction error");
        }

        // 1️⃣ INSERT orders
        const sqlOrder = `
            INSERT INTO orders
            (customer_id, order_date, delivery_date, order_status)
            VALUES (?, ?, ?, ?)
        `;

        db.query(
            sqlOrder,
            [customer_id, order_date, delivery_date, order_status || "pending"],
            (err, result) => {

                if (err) {
                    return db.rollback(() => {
                        console.error("Insert order error:", err);
                        res.status(500).send("Insert order error");
                    });
                }

                const orderId = result.insertId;

                // 2️⃣ INSERT orderdetails
                const sqlDetail = `
                    INSERT INTO orderdetails
                    (order_id, roast_id, quantity, price, total_price, user_id)
                    VALUES (?, ?, ?, ?, ?, ?)
                `;

                db.query(
                    sqlDetail,
                    [
                        orderId,
                        roast_id,
                        quantity,
                        price,
                        total_price || (quantity * price),
                        user_id
                    ],
                    (err2) => {

                        if (err2) {
                            return db.rollback(() => {
                                console.error("Insert detail error:", err2);
                                res.status(500).send("Insert detail error");
                            });
                        }

                        // ✅ commit ถ้าสำเร็จทั้งหมด
                        db.commit((err3) => {
                            if (err3) {
                                return db.rollback(() => {
                                    console.error("Commit error:", err3);
                                    res.status(500).send("Commit error");
                                });
                            }

                            console.log("✅ ORDER SAVED SUCCESS");
                            res.redirect("/order_list");
                        });

                    }
                );

            }
        );

    });

});

module.exports = router;
