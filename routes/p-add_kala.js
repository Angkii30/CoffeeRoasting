const express = require("express");
const router = express.Router();
const db = require("../db");

/* =========================
   GET : หน้าเพิ่มกะลา
   ดึงข้อมูลจาก stock_cherry
========================= */
router.get("/add_stockkala", (req, res) => {
  const sql = `
    SELECT 
      cherry_id,
      species
    FROM stock_cherry
    ORDER BY cherry_id DESC
  `;

  db.query(sql, (err, cherry) => {
    if (err) {
      console.log(err);
      return res.send("DB Error");
    }

    res.render("add_stockkala", {
      cherry
    });
  });
});

/* =========================
   POST : บันทึก stock_kala
========================= */
router.post("/add_stock", (req, res) => {
  const {
    species,
    process_method,
    receiv_date,
    weight_before,
    weight_after,
    role,
    note
  } = req.body;

  const sql = `
    INSERT INTO stock_kala
    (species, process_method, receiv_date,
     weight_before, weight_after, role, note)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    species,
    process_method,
    receiv_date,
    weight_before,
    weight_after,
    role,
    note
  ], (err) => {
   // ❌ บันทึกไม่สำเร็จ
    if (err) {
      console.error(err);
      return res.send(`
        <script>
          alert("❌ บันทึกข้อมูลคลังกาแฟไม่สำเร็จ");
          window.location.href = "/add_stockkala";
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
