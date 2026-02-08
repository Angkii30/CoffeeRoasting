require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

/* ตั้งค่า */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Coffee/ejs"));
app.use(express.static(path.join(__dirname, "Coffee")));

app.get("/add-order", (req, res) => {
    res.render("add_order");
});


/* หน้าแรก */
app.get("/", (req, res) => {
    res.send("Coffee Roasting");
});

/* ตัวอย่างหน้า add order */
app.get("/index", (req, res) => {
    res.send("หน้าแรก (ต่อ EJS ทีหลัง)");
});

/* เปิด server */
app.listen(port, () => {
    console.log("Server started → http://localhost:" + port);
});

const mysql = require("mysql2");

// เชื่อม MariaDB
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


app.post("/add-order", (req, res) => {

    const {
        first_name,
        last_name,
        address,
        province,
        phone,
        email,

        order_status,
        order_date,
        delivery_date,

        quantity,
        price

    } = req.body;


    // 1. บันทึกลูกค้า
    const sqlCustomer = `
    INSERT INTO customer
    (first_name, last_name, address, province, phone, email)
    VALUES (?,?,?,?,?,?)
  `;

    db.query(sqlCustomer, [
        first_name,
        last_name,
        address,
        province,
        phone,
        email
    ], (err, resultCustomer) => {

        if (err) return res.send("❌ บันทึกลูกค้าไม่สำเร็จ");

        const customer_id = resultCustomer.insertId;


        // 2. บันทึก order
        const sqlOrder = `
      INSERT INTO orders
      (customer_id, order_status, order_date, delivery_date)
      VALUES (?,?,?,?)
    `;

        db.query(sqlOrder, [
            customer_id,
            order_status,
            order_date,
            delivery_date
        ], (err, resultOrder) => {

            if (err) return res.send("❌ บันทึก Order ไม่สำเร็จ");

            const order_id = resultOrder.insertId;


            // 3. บันทึก orderdetails
            const sqlDetail = `
        INSERT INTO orderdetails
        (order_id, quantity, price)
        VALUES (?,?,?)
      `;

            db.query(sqlDetail, [
                order_id,
                quantity,
                price
            ], (err) => {

                if (err) return res.send("❌ บันทึกรายละเอียดไม่สำเร็จ");

                res.send("✅ บันทึก Order สำเร็จแล้ว");

            });

        });

    });

});

