document.addEventListener("DOMContentLoaded", function () {

    /* =====================
       โหลดรายชื่อจังหวัด
    ===================== */
    const provinces = [
        "กรุงเทพมหานคร", "กระบี่", "กาญจนบุรี", "ขอนแก่น", "เชียงใหม่", "เชียงราย",
        "ชลบุรี", "ตรัง", "นครราชสีมา", "นครปฐม", "นนทบุรี", "ปทุมธานี",
        "พระนครศรีอยุธยา", "พะเยา", "ภูเก็ต", "มหาสารคาม", "ลำปาง", "ลำพูน",
        "สงขลา", "สมุทรปราการ", "สุราษฎร์ธานี", "อุดรธานี", "อุบลราชธานี"
    ];

    const provinceSelect = document.getElementById("province");

    provinces.forEach(p => {
        const option = document.createElement("option");
        option.value = p;
        option.textContent = p;
        provinceSelect.appendChild(option);
    });


    /* =====================
       ตรวจสอบฟอร์ม
    ===================== */
    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (validateForm()) {
            alert("✅ บันทึกข้อมูลเรียบร้อย");
            form.submit();
        }
    });

});


/* =====================
   ตรวจสอบข้อมูล
===================== */
function validateForm() {

    const customer = document.getElementById("customer_id").value.trim();
    const fname = document.getElementById("first_name").value.trim();
    const lname = document.getElementById("last_name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const province = document.getElementById("province").value;
    const price = document.getElementById("price").value;

    if (customer === "") {
        alert("กรุณากรอกรหัสลูกค้า");
        return false;
    }

    if (fname === "") {
        alert("กรุณากรอกชื่อ");
        return false;
    }

    if (lname === "") {
        alert("กรุณากรอกนามสกุล");
        return false;
    }

    if (province === "") {
        alert("กรุณาเลือกจังหวัด");
        return false;
    }

    if (!/^[0-9]{9,10}$/.test(phone)) {
        alert("เบอร์โทรไม่ถูกต้อง");
        return false;
    }

    if (!email.includes("@")) {
        alert("อีเมลไม่ถูกต้อง");
        return false;
    }

    if (price <= 0 || price === "") {
        alert("กรุณากรอกราคา");
        return false;
    }

    return true;
}
