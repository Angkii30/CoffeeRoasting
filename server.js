require("dotenv").config();
const express = require("express");
const path = require("path");

const pageRoutes = require("./routes/pages");
const addcusRoutes = require("./routes/p-add_cus");
const cus = require("./routes/p-cus");
const index = require("./routes/p-index");
const stock = require("./routes/p-stock");
const stockkala = require("./routes/p-stockkala");
const stockroast = require("./routes/p-stockroast");
const stocksan = require("./routes/p-stocksan");
const stockall = require("./routes/p-stockall");
const plan = require("./routes/p-plan");
const user = require("./routes/p-user");
const addorder = require("./routes/p-add_order");
const addstock = require("./routes/p-add_stock");
const addstockkala = require("./routes/p-add_kala");
const addstockroast = require("./routes/p-add_roast");
const addstocksan = require("./routes/p-add_san");
const adduser = require("./routes/p-add_user");
const editcus = require("./routes/p-edit_cus");
const editstock = require("./routes/p-edit_stock");
const editKala = require("./routes/p-edit_kala");
const editRoast = require("./routes/p-edit_roast");
const editSan = require("./routes/p-edit_san");
const edituser = require("./routes/p-edit_user");
const editorder = require("./routes/p-edit_order");


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
app.use("/", addcusRoutes);
app.use("/", cus);
app.use("/", index);
app.use("/", stock);
app.use("/", stockkala);
app.use("/", stockroast);
app.use("/", stocksan);
app.use("/", stockall);
app.use("/", plan);
app.use("/", user);
app.use("/", addorder);
app.use("/", addstock);
app.use("/", addstockkala);
app.use("/", addstockroast);
app.use("/", addstocksan);
app.use("/", adduser);
app.use("/", editcus);
app.use("/", editstock);
app.use("/", editKala);
app.use("/", editRoast);
app.use("/", editSan);
app.use("/", edituser);
app.use("/", editorder);

/* Start server (มีแค่รอบเดียวพอ) */
app.listen(PORT, () => {
    console.log("Server → http://localhost:" + PORT);
});
