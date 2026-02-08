const express = require("express");
const router = express.Router();

/* หน้าแรก */
router.get("/index", (req, res) => {
    res.render("index");
});

/* login เดี๋ยวค่อยเปลี่ยนเป็นหน้าแรก*/
router.get("/login", (req, res) => {
    res.render("login");
});

/* เพิ่มออเดอร์ */
router.get("/add_order", (req, res) => {
    res.render("add_order");
});

/* เพิ่มลูกค้า */
router.get("/add_customer", (req, res) => {
    res.render("add_customer");
});

/* เพิ่ม user */
router.get("/add_user", (req, res) => {
    res.render("add_user");
});

router.get("/add_stock", (req, res) => {
    res.render("add_stock");
});

/* แก้ไข order */
router.get("/edit_order", (req, res) => {
    res.render("edit_order");
});

router.get("/edit_customer", (req, res) => {
    res.render("add_customer");
});

router.get("/edit_user", (req, res) => {
    res.render("add_user");
});

router.get("/edit_stock", (req, res) => {
    res.render("add_stock");
});

router.get("/stock", (req, res) => {
    res.render("stock");
});

router.get("/stockall", (req, res) => {
    res.render("stockall");
});

router.get("/stockkala", (req, res) => {
    res.render("stockkala");
});

router.get("/stockroast", (req, res) => {
    res.render("stockroast");
});

router.get("/stocksan", (req, res) => {
    res.render("stocksan");
});

router.get("/user", (req, res) => {
    res.render("user");
});

router.get("/plan", (req, res) => {
    res.render("plan");
});

router.get("/customer", (req, res) => {
    res.render("customer");
});

module.exports = router;
