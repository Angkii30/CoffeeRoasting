
document.addEventListener("DOMContentLoaded", function () {

    /* ===== จังหวัด ===== */

    const provinces = [
        "กรุงเทพมหานคร", "กระบี่", "กาญจนบุรี", "กาฬสินธุ์", "กำแพงเพชร",
        "ขอนแก่น", "จันทบุรี", "ฉะเชิงเทรา", "ชลบุรี", "ชัยนาท", "ชัยภูมิ",
        "ชุมพร", "เชียงราย", "เชียงใหม่", "ตรัง", "ตราด", "ตาก", "นครนายก",
        "นครปฐม", "นครพนม", "นครราชสีมา", "นครศรีธรรมราช", "นครสวรรค์",
        "นนทบุรี", "นราธิวาส", "น่าน", "บึงกาฬ", "บุรีรัมย์", "ปทุมธานี",
        "ประจวบคีรีขันธ์", "ปราจีนบุรี", "ปัตตานี", "อยุธยา", "พะเยา",
        "พังงา", "พัทลุง", "พิจิตร", "พิษณุโลก", "เพชรบุรี", "เพชรบูรณ์",
        "แพร่", "ภูเก็ต", "มหาสารคาม", "มุกดาหาร", "แม่ฮ่องสอน", "ยโสธร",
        "ยะลา", "ร้อยเอ็ด", "ระนอง", "ระยอง", "ราชบุรี", "ลพบุรี", "ลำปาง",
        "ลำพูน", "เลย", "ศรีสะเกษ", "สกลนคร", "สงขลา", "สตูล", "สมุทรปราการ",
        "สมุทรสงคราม", "สมุทรสาคร", "สระแก้ว", "สระบุรี", "สิงห์บุรี",
        "สุโขทัย", "สุพรรณบุรี", "สุราษฎร์ธานี", "สุรินทร์", "หนองคาย",
        "หนองบัวลำภู", "อ่างทอง", "อำนาจเจริญ", "อุดรธานี", "อุตรดิตถ์",
        "อุทัยธานี", "อุบลราชธานี"
    ];

    const provinceSelect = document.getElementById("province");

    provinces.forEach(p => {
        const option = document.createElement("option");
        option.value = p;
        option.textContent = p;
        provinceSelect.appendChild(option);
    });


    /* ===== form ===== */

    const form = document.getElementById("customerForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (validateForm()) {
            alert("✅ บันทึกข้อมูลเรียบร้อยแล้ว");
            form.submit();
        }
    });

});



/* =====================
   ตรวจสอบข้อมูล
===================== */
function validateForm() {

    let valid = true;

    const fname = document.getElementById("first_name");
    const lname = document.getElementById("last_name");
    const address = document.getElementById("address");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const province = document.getElementById("province");

    [fname, lname, address, phone, email, province].forEach(el => clearError(el));

    if (fname.value.trim() === "") {
        showError(fname, "กรุณากรอกชื่อ");
        valid = false;
    }

    if (lname.value.trim() === "") {
        showError(lname, "กรุณากรอกนามสกุล");
        valid = false;
    }

    if (address.value.trim() === "") {
        showErrorTextarea(address, "กรุณากรอกที่อยู่");
        valid = false;
    }

    if (province.value === "") {
        showErrorSelect(province);
        valid = false;
    }

    if (!/^[0-9]{9,10}$/.test(phone.value)) {
        showError(phone, "เบอร์โทรไม่ถูกต้อง");
        valid = false;
    }

    if (!email.value.includes("@")) {
        showError(email, "อีเมลไม่ถูกต้อง");
        valid = false;
    }

    return valid;
}


/* =====================
   แสดง Error
===================== */

function showError(input, message) {

    input.classList.add("input-error");

    // แสดงข้อความ error ใต้ placeholder
    input.placeholder = message;

    input.addEventListener("input", function clear() {
        input.classList.remove("input-error");
        input.placeholder = "";
        input.removeEventListener("input", clear);
    });
}





function showErrorTextarea(textarea, message) {

    textarea.classList.add("input-error");
    textarea.placeholder = message;

    textarea.addEventListener("input", function clear() {
        textarea.classList.remove("input-error");
        textarea.placeholder = "";
        textarea.removeEventListener("input", clear);
    });
}

function showErrorSelect(select) {

    select.classList.add("select-error");

    select.addEventListener("change", function clear() {
        select.classList.remove("select-error");
        select.removeEventListener("change", clear);
    });
}



function clearError(input) {

    if (!input) return;

    input.classList.remove("input-error");
    input.classList.remove("select-error");

}

