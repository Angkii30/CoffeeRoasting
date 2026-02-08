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


db.connect(err => {
    if (err) {
        console.log("❌ DB Error:", err);
    } else {
        console.log("✅ MariaDB Connected");
    }
}); 
