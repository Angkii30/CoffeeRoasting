//เหลือ โชว์order_id กับ customer_id (ยังไม่ได้เชื่อมกับฐานข้อมูล)

document.addEventListener("DOMContentLoaded", function () {

    const orderInput = document.getElementById("order_date");
    const deliveryInput = document.getElementById("delivery_date");

    const today = new Date().toISOString().split("T")[0];

    // ตั้งวันสั่ง = วันนี้
    orderInput.value = today;
    orderInput.min = today;

    // วันจัดส่ง เริ่มจากวันสั่ง
    deliveryInput.min = today;

    // ถ้าเปลี่ยนวันสั่ง → อัปเดตวันจัดส่ง
    orderInput.addEventListener("change", function () {

        deliveryInput.min = this.value;

        // ถ้าวันจัดส่งน้อยกว่าวันสั่ง → รีเซ็ต
        if (deliveryInput.value < this.value) {
            deliveryInput.value = this.value;
        }
    });

});


document.addEventListener("DOMContentLoaded", function () {
    const provinces = [
        "กรุงเทพมหานคร",
        "กระบี่",
        "กาญจนบุรี",
        "กาฬสินธุ์",
        "กำแพงเพชร",
        "ขอนแก่น",
        "จันทบุรี",
        "ฉะเชิงเทรา",
        "ชลบุรี",
        "ชัยนาท",
        "ชัยภูมิ",
        "ชุมพร",
        "เชียงราย",
        "เชียงใหม่",
        "ตรัง",
        "ตราด",
        "ตาก",
        "นครนายก",
        "นครปฐม",
        "นครพนม",
        "นครราชสีมา",
        "นครศรีธรรมราช",
        "นครสวรรค์",
        "นนทบุรี",
        "นราธิวาส",
        "น่าน",
        "บึงกาฬ",
        "บุรีรัมย์",
        "ปทุมธานี",
        "ประจวบคีรีขันธ์",
        "ปราจีนบุรี",
        "ปัตตานี",
        "พระนครศรีอยุธยา",
        "พะเยา",
        "พังงา",
        "พัทลุง",
        "พิจิตร",
        "พิษณุโลก",
        "เพชรบุรี",
        "เพชรบูรณ์",
        "แพร่",
        "ภูเก็ต",
        "มหาสารคาม",
        "มุกดาหาร",
        "แม่ฮ่องสอน",
        "ยโสธร",
        "ยะลา",
        "ร้อยเอ็ด",
        "ระนอง",
        "ระยอง",
        "ราชบุรี",
        "ลพบุรี",
        "ลำปาง",
        "ลำพูน",
        "เลย",
        "ศรีสะเกษ",
        "สกลนคร",
        "สงขลา",
        "สตูล",
        "สมุทรปราการ",
        "สมุทรสงคราม",
        "สมุทรสาคร",
        "สระแก้ว",
        "สระบุรี",
        "สิงห์บุรี",
        "สุโขทัย",
        "สุพรรณบุรี",
        "สุราษฎร์ธานี",
        "สุรินทร์",
        "หนองคาย",
        "หนองบัวลำภู",
        "อ่างทอง",
        "อำนาจเจริญ",
        "อุดรธานี",
        "อุตรดิตถ์",
        "อุทัยธานี",
        "อุบลราชธานี"
    ];

    const provinceSelect = document.getElementById("province");

    provinces.forEach(p => {
        const option = document.createElement("option");
        option.value = p;
        option.textContent = p;
        provinceSelect.appendChild(option);
    });


    /* ตรวจฟอร์ม */
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

    let valid = true;

    // ดึง element
    // const customer = document.getElementById("customer_id");
    // coust order = document.getElementById("order_id");
    const fname = document.getElementById("first_name");
    const lname = document.getElementById("last_name");
    const address = document.getElementById("address");

    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const province = document.getElementById("province");
    const status = document.getElementById("order_status");


    const process = document.querySelector(".select-process");
    const roast = document.querySelector(".select-lavel");
    const orderDate = document.getElementById("order_date");
    const deliveryDate = document.getElementById("delivery_date");
    const pack = document.querySelector(".select-size");
    const quantity = document.getElementById("quantity");
    const price = document.getElementById("price");


    // ล้าง error เก่า
    [
        fname, lname, address, phone, email,
        province, status, process, roast,
        pack, quantity, price,
        orderDate, deliveryDate
    ].forEach(el => clearError(el));


    /* ตรวจทีละช่อง */
    if (fname.value.trim() === "") {
        showError(fname, "กรุณากรอกชื่อ");
        valid = false;
    }

    if (lname.value.trim() === "") {
        showError(lname, "กรุณากรอกนามสกุล");
        valid = false;
    }

    if (address.value.trim() === "") {
        showError(address, "กรุณากรอกที่อยู่");
        valid = false;
    }

    if (status.value === "") {
        showErrorSelect(status, "กรุณาเลือกสถานะ");
        valid = false;
    }

    if (province.value === "") {
        showErrorSelect(province, "กรุณาเลือกจังหวัด");
        valid = false;
    }



    if (process.value === "") {
        showError(process, "กรุณาเลือกกระบวนการ");
        valid = false;
    }

    if (roast.value === "") {
        showError(roast, "กรุณาเลือกระดับการคั่ว");
        valid = false;
    }

    /* วันที่สั่งซื้อ */
    if (orderDate.value === "") {
        showError(orderDate, "กรุณาเลือกวันที่สั่งซื้อ");
        valid = false;
    }

    /* วันที่จัดส่ง */
    if (deliveryDate.value === "") {
        showError(deliveryDate, "กรุณาเลือกวันที่จัดส่ง");
        valid = false;
    }

    /* ตรวจว่าวันจัดส่งต้องไม่ก่อนวันสั่ง */
    if (orderDate.value !== "" && deliveryDate.value !== "") {

        if (deliveryDate.value < orderDate.value) {
            showError(deliveryDate, "วันจัดส่งต้องไม่น้อยกว่าวันสั่ง");
            valid = false;
        }

    }


    if (!/^[0-9]{9,10}$/.test(phone.value)) {
        showError(phone, "เบอร์โทรไม่ถูกต้อง");
        valid = false;
    }

    // ตัดช่องว่างหน้า-หลัง
    email.value = email.value.trim();

    if (!email.value.includes("@")) {
        showError(email, "อีเมลไม่ถูกต้อง");
        valid = false;
    }

    if (pack.value === "" || pack.value === "pack_size") {
        showError(pack, "กรุณาเลือกขนาด");
        valid = false;
    }

    if (quantity.value === "" || quantity.value <= 0) {
        showError(quantity, "*");
        valid = false;
    }

    if (price.value === "" || price.value <= 0) {
        showError(price, "*");
        valid = false;
    }

    return valid;
}

function showError(input, message) {

    // เก็บค่าเดิมไว้
    input.dataset.oldValue = input.value;

    // ล้างค่าเดิม
    input.value = "";

    // ใส่ placeholder เป็นข้อความ error
    input.placeholder = message;

    // ใส่ class สีแดง
    input.classList.add("input-error");


    // เวลากดพิมพ์ → เอา error ออก
    input.addEventListener("input", function clear() {

        input.classList.remove("input-error");
        input.placeholder = "";
        input.removeEventListener("input", clear);

    });
}

function clearError(input) {

    input.classList.remove("input-error");

    const error = input.parentElement.querySelector(".error-text");

    if (error) {
        error.remove();
    }
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

    if (!input) return; // กันพัง

    input.classList.remove("input-error");

    const error = input.parentElement?.querySelector(".error-text");

    if (error) {
        error.remove();
    }
}

document.addEventListener("DOMContentLoaded", function () {

    const quantity = document.getElementById("quantity");
    const price = document.getElementById("price");
    const total = document.getElementById("total_price");

    function calculateTotal() {

        const q = parseFloat(quantity.value) || 0;
        const p = parseFloat(price.value) || 0;

        total.value = q * p;
    }

    quantity.addEventListener("input", calculateTotal);
    price.addEventListener("input", calculateTotal);

});
