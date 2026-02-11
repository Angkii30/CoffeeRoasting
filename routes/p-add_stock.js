const express = require("express");
const router = express.Router();
const db = require("../db");

router.post('/add_stock', (req, res) => {
  const {
    species,
    source_farm,
    receive_date,
    weight,
    buy_price,
    user_id,
    note
  } = req.body;

  const sql = `
    INSERT INTO stock_cherry
    (species, source_farm, receive_date, weight, buy_price, user_id, note, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  db.query(sql, [
    species,
    source_farm,
    receive_date,
    weight,
    buy_price,
    user_id,
    note
  ], (err, result) => {

    // ❌ บันทึกไม่สำเร็จ
    if (err) {
      console.error(err);
      return res.send(`
        <script>
          alert("❌ บันทึกข้อมูลคลังกาแฟไม่สำเร็จ");
          window.location.href = "/add_stock";
        </script>
      `);
    }

    // ✅ บันทึกสำเร็จ
    res.send(`
      <script>
        alert("✅ บันทึกข้อมูลคลังกาแฟเชอร์รี่สำเร็จ");
        window.location.href = "/stock";
      </script>
    `);

  });
});

module.exports = router;
