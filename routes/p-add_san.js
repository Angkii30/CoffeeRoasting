const express = require("express");
const router = express.Router();
const db = require("../db");

router.post('/add_stocksan', (req, res) => {
  const {
    species,
    process_method,
    receive_date,
    weight_before,
    weight_after,
    user_id,
    note
  } = req.body;

  const sql = `
    INSERT INTO stock_san
    (species, process_method, receive_date,weight_before, weight_after, user_id, note,  created_at)
    VALUES (?, ?, ?, ?, ?, ?, ? , NOW())
  `;

  db.query(sql, [
    species,
    process_method,
    receive_date,
    weight_before,
    weight_after,
    user_id,
    note
  ], (err) => {

   // ❌ บันทึกไม่สำเร็จ
    if (err) {
      console.error(err);
      return res.send(`
        <script>
          alert("❌ บันทึกข้อมูลคลังกาแฟไม่สำเร็จ");
          window.location.href = "/add_stocksan";
        </script>
      `);
    }

    // ✅ บันทึกสำเร็จ
    res.send(`
      <script>
        alert("✅ บันทึกข้อมูลคลังกาแฟสารสำเร็จ");
        window.location.href = "/stocksan";
      </script>
    `);

  });
});

module.exports = router;
