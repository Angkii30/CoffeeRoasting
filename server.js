require("dotenv").config();
const express = require("express");
const path = require("path");

const pageRoutes = require("./routes/pages");

const app = express();
const PORT = process.env.PORT || 3000;

/* View engine */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* Middleware */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* Static files */
app.use(express.static(path.join(__dirname, "public")));

/* Routes */
app.use("/", pageRoutes);

/* Start server (มีแค่รอบเดียวพอ) */
app.listen(PORT, () => {
    console.log("Server → http://localhost:" + PORT);
});
