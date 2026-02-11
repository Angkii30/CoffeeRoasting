const express = require("express");
const router = express.Router();
const db = require("../db");

// const total = weight * buy_price;

// const sql = `
// INSERT INTO stock_cherry
// (species, source_farm, receive_date, weight, buy_price, total_price, user_id)
// VALUES (?, ?, ?, ?, ?, ?, ?)
// `;

// db.query(sql, [
//     species,
//     source_farm,
//     receive_date,
//     weight,
//     buy_price,
//     total,
//     user_id
// ]);


module.exports = router;