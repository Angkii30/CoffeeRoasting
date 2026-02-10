
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

    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const role = document.getElementById("roleSelect");

    clearError(username);
    clearError(password);
    clearError(role);

    if (username.value.trim() === "") {
        showError(username, "กรุณากรอกชื่อผู้ใช้");
        valid = false;
    }

    if (password.value.trim().length < 6) {
        showError(password, "รหัสผ่านต้องมีอย่างน้อย 6 ตัว");
        valid = false;
    }

    if (role.value === "") {
        role.classList.add("select-error");
        valid = false;
    }

    return valid;
}


/* ===== error style ===== */

function showError(input, message) {

    input.classList.add("input-error");
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
    el.classList.remove("select-error");
}

