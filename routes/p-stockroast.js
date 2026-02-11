const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/api/stockroast", (req, res) => {

    const search = req.query.search || "";
    const roastDate = req.query.roastDate || "";

    let sql = `
        SELECT 
            sr.roast_id,
            sr.process_method,
            sr.roast_level,
            sr.roast_date,
            sr.expire_date,
            sr.pack_size,
            sr.pack_count,

            ss.species,
            u.username

        FROM stock_roast sr

        LEFT JOIN stock_san ss
            ON sr.san_id = ss.san_id

        LEFT JOIN user u
            ON sr.user_id = u.user_id

        WHERE 1=1
    `;

    let params = [];


    // 🔍 ค้นหาข้อความ
    if (search) {

        sql += `
            AND (
                ss.species LIKE ?
                OR sr.process_method LIKE ?
                OR sr.roast_level LIKE ?
                OR u.username LIKE ?
            )
        `;

        const key = `%${search}%`;
        params.push(key, key, key, key);
    }


    // 📅 ค้นหาวันที่คั่ว (สำคัญมาก)
    if (roastDate) {

        sql += `
            AND DATE(sr.roast_date) = ?
        `;

        params.push(roastDate);
    }


    sql += " ORDER BY sr.roast_id DESC";


    db.query(sql, params, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);
    });

});
module.exports = router;