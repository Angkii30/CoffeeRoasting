document.addEventListener("DOMContentLoaded", function () {

  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
      form.submit();
    }
  });

});

function validateForm() {

  let valid = true;

  /* ===== ดึง element ===== */
  const species = document.querySelector('input[name="species"]:checked');
  const radioGroup = document.querySelector(".radio-group");

  const process = document.querySelector('select[name="process_method"]');
  const roastDate = document.querySelector('input[name="roast_date"]');
  const roastLevel = document.querySelector('select[name="roast_level"]');

  const weightBefore = document.querySelector('input[name="weight_before"]');
  const weightAfter = document.querySelector('input[name="weight_after"]');

  const packSize = document.querySelector('select[name="pack_size"]');
  const packCount = document.querySelector('input[name="pack_count"]');
  const sellPrice = document.querySelector('input[name="sell_price"]');

  const userId = document.querySelector('input[name="user_id"]');

  /* ===== ล้าง error ===== */
  [process, roastDate, roastLevel, weightBefore, weightAfter,
   packSize, packCount, sellPrice, userId]
    .forEach(clearError);

  radioGroup.classList.remove("input-error");

  /* ===== ตรวจสอบ ===== */

  if (!species) {
    radioGroup.classList.add("input-error");
    valid = false;
  }

  if (!process.value) {
    showError(process, "เลือกกระบวนการ");
    valid = false;
  }

  if (!roastLevel.value) {
    showError(roastLevel, "เลือกระดับการคั่ว");
    valid = false;
  }

  if (!roastDate.value) {
    showError(roastDate, "เลือกวันที่คั่ว");
    valid = false;
  }

  if (!weightBefore.value || weightBefore.value <= 0) {
    showError(weightBefore, "กรอกน้ำหนักก่อนคั่ว");
    valid = false;
  }

  if (!weightAfter.value || weightAfter.value <= 0) {
    showError(weightAfter, "กรอกน้ำหนักหลังคั่ว");
    valid = false;
  }

  if (!packSize.value) {
    showError(packSize, "เลือกขนาดแพ็ค");
    valid = false;
  }

  if (!packCount.value || packCount.value <= 0) {
    showError(packCount, "กรอกจำนวนแพ็ค");
    valid = false;
  }

  if (!sellPrice.value || sellPrice.value <= 0) {
    showError(sellPrice, "กรอกราคาขาย");
    valid = false;
  }

  if (!userId.value.trim()) {
    showError(userId, "กรอกชื่อผู้รับผิดชอบ");
    valid = false;
  }

  return valid;
}

/* ===== error style ===== */

function showError(input, message) {
  if (!input) return;

  input.classList.add("input-error");
  input.value = "";
  input.placeholder = message;

  input.addEventListener("input", function clear() {
    input.classList.remove("input-error");
    input.placeholder = "";
    input.removeEventListener("input", clear);
  });
}

function clearError(el) {
  if (!el) return;
  el.classList.remove("input-error");
}
