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
  const process = document.querySelector('select[name="process_method"]');
  const receive = document.querySelector('input[name="receive_date"]');
  const weightBefore = document.querySelector('input[name="weight_before"]');
  const weightAfter = document.querySelector('input[name="weight_after"]');
  const role = document.getElementById("role");

  const species = document.querySelector('input[name="species"]:checked');
  const radioGroup = document.querySelector(".radio-group");

  /* ===== ล้าง error เก่า ===== */
  clearError(process);
  clearError(receive);
  clearError(weightBefore);
  clearError(weightAfter);
  clearError(role);
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

  if (!receive.value) {
    showError(receive, "เลือกวันที่รับเข้า");
    valid = false;
  }

  if (!weightBefore.value || weightBefore.value <= 0) {
    showError(weightBefore, "กรอกน้ำหนักก่อนคัด");
    valid = false;
  }

  if (!weightAfter.value || weightAfter.value <= 0) {
    showError(weightAfter, "กรอกน้ำหนักหลังคัด");
    valid = false;
  }

  if (!user_id.value.trim()) {
    showError(user_id, "กรอกชื่อผู้รับผิดชอบ");
    valid = false;
  }

  return valid;
}

/* ===== error style ===== */

function showError(input, message) {
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
