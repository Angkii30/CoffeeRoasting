require("dotenv").config();
const express = require("express");
const path = require("path");
const mysql = require("mysql2");

const pageRoutes = require("./routes/pages");

const app = express();
const port = 3000;

/* Middleware */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* View engine */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* Static files */
app.use(express.static(path.join(__dirname, "public")));

/* Routes (ต้องอยู่หลัง setup ทุกอย่าง) */
app.use("/", pageRoutes);

/* Start */
app.listen(port, () => {
    console.log("🚀 Server → http://localhost:" + port);
});
