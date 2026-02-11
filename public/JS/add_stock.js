document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (validateForm()) {
            // alert("✅ บันทึกข้อมูลเรียบร้อย");
            form.submit();
        }
    });

});

function validateForm() {

    let valid = true;

    const source = document.getElementById("source_farm");
    const receive = document.getElementById("receive_date");
    const weight = document.getElementById("weight");
    const price = document.getElementById("buy_price");
    const role = document.getElementById("user_id");

    const species = document.querySelector('input[name="species"]:checked');
    const radioGroup = document.querySelector(".radio-group");


    /* ล้าง error เก่า */
    clearError(source);
    clearError(receive);
    clearError(weight);
    clearError(price);
    clearError(role);
    radioGroup.classList.remove("input-error");


    /* ===== ตรวจสอบ ===== */

    if (!species) {
        radioGroup.classList.add("input-error");
        valid = false;
    }

    if (source.value.trim() === "") {
        showError(source, "กรุณากรอกแหล่งที่มา");
        valid = false;
    }

    if (receive.value === "") {
        showError(receive, "เลือกวันที่รับเข้า");
        valid = false;
    }

    if (weight.value === "" || weight.value <= 0) {
        showError(weight, "กรอกน้ำหนักให้ถูกต้อง");
        valid = false;
    }

    if (price.value === "" || price.value <= 0) {
        showError(price, "กรอกราคาให้ถูกต้อง");
        valid = false;
    }

    if (user_id.value.trim() === "") {
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
