require("dotenv").config();

const express = require("express");
const path = require("path");
const mysql = require("mysql2");

const pageRoutes = require("./routes/pages"); // ✅ เพิ่ม

const app = express();
const port = 3000;

/* Middleware */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* View */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Coffee/ejs"));
app.use(express.static(path.join(__dirname, "Coffee")));

/* DB */
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.log("❌ DB Error:", err);
    } else {
        console.log("✅ Database Connected");
    }
});

/* ใช้ routes */
app.use("/", pageRoutes); // ✅ เพิ่มตรงนี้


/* POST add order */
app.post("/add_order", (req, res) => {

    console.log("📦 รับข้อมูล:", req.body);

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

        if (err) {
            console.log(err);
            return res.send("❌ บันทึกลูกค้าไม่สำเร็จ");
        }

        const customer_id = resultCustomer.insertId;


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

            if (err) {
                console.log(err);
                return res.send("❌ บันทึก Order ไม่สำเร็จ");
            }

            const order_id = resultOrder.insertId;


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

                if (err) {
                    console.log(err);
                    return res.send("❌ บันทึกรายละเอียดไม่สำเร็จ");
                }

                res.redirect("/index"); // ✅ แนะนำให้ redirect

            });

        });

    });

});


/* Start */
app.listen(port, () => {
    console.log("🚀 Server → http://localhost:" + port);
});
