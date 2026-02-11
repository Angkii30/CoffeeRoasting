const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/add_stockroast", (req, res) => {

  const {
    species,
    process_method,
    roast_level,
    roast_date,
    weight_before,
    weight_after,
    loss_percent,
    expire_date,
    pack_size,
    pack_count,
    sell_price,
    user_id,
    note
  } = req.body;

  const sql = `
    INSERT INTO stock_roast (
      species,
      process_method,
      roast_level,
      roast_date,
      weight_before,
      weight_after,
      loss_percent,
      expire_date,
      pack_size,
      pack_count,
      sell_price,
      user_id,
      note,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;

  db.query(
    sql,
    [
      species,
      process_method,
      roast_level,
      roast_date,
      weight_before,
      weight_after,
      loss_percent,
      expire_date,
      pack_size,
      pack_count,
      sell_price,
      user_id,
      note
    ],
    (err) => {
      if (err) {
        console.error("❌ stock_roast error:", err);
        return res.send(`
          <script>
            alert("❌ บันทึกข้อมูลคลังกาแฟคั่วไม่สำเร็จ");
            window.location.href = "/add_stockroast";
          </script>
        `);
      }

      res.send(`
        <script>
          alert("✅ บันทึกข้อมูลคลังกาแฟคั่วสำเร็จ");
          window.location.href = "/stockroast";
        </script>
      `);
    }
  );
});

module.exports = router;
