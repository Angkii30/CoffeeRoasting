const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/api/users", (req, res) => {

    const sql = "SELECT * FROM user ORDER BY user_id DESC";

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

router.delete("/api/users/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM user WHERE user_id = ?",
        [id],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({ success: true });
        }
    );
});


module.exports = router;
