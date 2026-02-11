document.addEventListener("DOMContentLoaded", function () {

  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {

    e.preventDefault();
    let valid = true;

    // ล้าง error
    document.querySelectorAll(".input-error, .select-error")
      .forEach(el => el.classList.remove("input-error", "select-error"));

    /* ===== cherry_id ===== */
    const cherry = document.querySelector('select[name="cherry_id"]');
    if (!cherry || !cherry.value) {
      cherry.classList.add("select-error");
      valid = false;
    }

    /* ===== process ===== */
    const process = document.querySelector('select[name="process_method"]');
    if (!process.value) {
      process.classList.add("select-error");
      valid = false;
    }

    /* ===== วันที่รับเข้า ===== */
    const receivDate = document.querySelector('input[name="receiv_date"]');
    if (!receivDate.value) {
      receivDate.classList.add("input-error");
      valid = false;
    }

    /* ===== น้ำหนักก่อน ===== */
    const weightBefore = document.querySelector('input[name="weight_before"]');
    if (!weightBefore.value || weightBefore.value <= 0) {
      weightBefore.classList.add("input-error");
      valid = false;
    }

    /* ===== น้ำหนักหลัง ===== */
    const weightAfter = document.querySelector('input[name="weight_after"]');
    if (!weightAfter.value || weightAfter.value <= 0) {
      weightAfter.classList.add("input-error");
      valid = false;
    }

    /* ===== ผู้รับผิดชอบ ===== */
    const role = document.getElementById("role");
    if (!role.value.trim()) {
      role.classList.add("input-error");
      valid = false;
    }

    /* ===== submit ===== */
    if (valid) {
      form.submit(); // ส่งจริง
    } else {
      alert("⚠️ กรุณากรอกข้อมูลให้ครบถ้วน");
    }

  });

});
