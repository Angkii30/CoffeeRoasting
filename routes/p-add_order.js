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

        roast_id,
        quantity,
        price,
        total_price,
        user_id
    } = req.body;


    // 1. insert orders
    const sqlOrder = `
        INSERT INTO orders
        (customer_id, order_date, delivery_date, order_status)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sqlOrder,
        [customer_id, order_date, delivery_date, order_status],
        (err, result) => {

            if (err) {
                console.error(err);
                return res.status(500).send("Insert order error");
            }


            const orderId = result.insertId;


            // 2. insert orderdetails
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
                    total_price,
                    user_id
                ],
                (err2) => {

                    if (err2) {
                        console.error(err2);
                        return res.status(500).send("Insert detail error");
                    }

                    res.redirect("/order_list");

                }
            );

        }
    );

});




module.exports = router;




