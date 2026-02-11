document.addEventListener("DOMContentLoaded", function () {

    /* =====================
       GET ELEMENTS
    ====================== */
    const form = document.querySelector("form");

    const orderDate = document.getElementById("order_date");
    const deliveryDate = document.getElementById("delivery_date");

    const quantity = document.getElementById("quantity");
    const price = document.getElementById("price");
    const total = document.getElementById("total_price");

    const customerInput = document.getElementById("customer_id");

    const provinceSelect = document.getElementById("province");


    /* =====================
       LOAD CUSTOMER DATA
    ====================== */

    customerInput.addEventListener("blur", loadCustomerData);

    async function loadCustomerData() {

        const customerId = customerInput.value.trim();

        if (customerId === "") return;

        try {

            const res = await fetch(`/api/customer/${customerId}`);
            const data = await res.json();

            if (data.found) {

                document.getElementById("first_name").value = data.data.first_name;
                document.getElementById("last_name").value = data.data.last_name;
                document.getElementById("address").value = data.data.address;
                document.getElementById("province").value = data.data.province;
                document.getElementById("phone").value = data.data.phone;
                document.getElementById("email").value = data.data.email;

                clearError(customerInput);

            } else {

                clearCustomerForm();
                showError(customerInput, "ไม่พบรหัสลูกค้า");

            }

        } catch (err) {

            console.error(err);
            alert("โหลดข้อมูลลูกค้าไม่สำเร็จ");

        }
    }


    function clearCustomerForm() {

        [
            "first_name",
            "last_name",
            "address",
            "province",
            "phone",
            "email"
        ].forEach(id => document.getElementById(id).value = "");
    }


    /* =====================
       SET TODAY DATE
    ====================== */

    const today = new Date().toISOString().split("T")[0];

    orderDate.value = today;
    orderDate.min = today;

    deliveryDate.min = today;

    orderDate.addEventListener("change", function () {

        deliveryDate.min = this.value;

        if (deliveryDate.value < this.value) {
            deliveryDate.value = this.value;
        }
    });


    /* =====================
       LOAD PROVINCES
    ====================== */

    const provinces = [
        "กรุงเทพมหานคร", "กระบี่", "กาญจนบุรี", "กาฬสินธุ์", "กำแพงเพชร",
        "ขอนแก่น", "จันทบุรี", "ฉะเชิงเทรา", "ชลบุรี", "ชัยนาท", "ชัยภูมิ",
        "ชุมพร", "เชียงราย", "เชียงใหม่", "ตรัง", "ตราด", "ตาก", "นครนายก",
        "นครปฐม", "นครพนม", "นครราชสีมา", "นครศรีธรรมราช", "นครสวรรค์",
        "นนทบุรี", "นราธิวาส", "น่าน", "บึงกาฬ", "บุรีรัมย์", "ปทุมธานี",
        "ประจวบคีรีขันธ์", "ปราจีนบุรี", "ปัตตานี", "พระนครศรีอยุธยา",
        "พะเยา", "พังงา", "พัทลุง", "พิจิตร", "พิษณุโลก", "เพชรบุรี",
        "เพชรบูรณ์", "แพร่", "ภูเก็ต", "มหาสารคาม", "มุกดาหาร",
        "แม่ฮ่องสอน", "ยโสธร", "ยะลา", "ร้อยเอ็ด", "ระนอง", "ระยอง",
        "ราชบุรี", "ลพบุรี", "ลำปาง", "ลำพูน", "เลย", "ศรีสะเกษ", "สกลนคร",
        "สงขลา", "สตูล", "สมุทรปราการ", "สมุทรสงคราม", "สมุทรสาคร",
        "สระแก้ว", "สระบุรี", "สิงห์บุรี", "สุโขทัย", "สุพรรณบุรี",
        "สุราษฎร์ธานี", "สุรินทร์", "หนองคาย", "หนองบัวลำภู", "อ่างทอง",
        "อำนาจเจริญ", "อุดรธานี", "อุตรดิตถ์", "อุทัยธานี", "อุบลราชธานี"
    ];

    provinces.forEach(p => {

        const option = document.createElement("option");

        option.value = p;
        option.textContent = p;

        provinceSelect.appendChild(option);

    });


    /* =====================
       CALCULATE TOTAL
    ====================== */

    function calculateTotal() {

        const q = parseFloat(quantity.value) || 0;
        const p = parseFloat(price.value) || 0;

        total.value = q * p;
    }

    quantity.addEventListener("input", calculateTotal);
    price.addEventListener("input", calculateTotal);


    /* =====================
       FORM SUBMIT
    ====================== */

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        if (!validateForm()) return;


        /* หา roast_id ก่อน */
        const roastId = await findRoastId();

        if (!roastId) {
            alert("ไม่พบข้อมูลการคั่ว");
            return;
        }

        document.getElementById("roast_id").value = roastId;


        /* ส่งข้อมูลไป Backend */
        const formData = new FormData(form);

        try {

            const res = await fetch("/add_order", {
                method: "POST",
                body: formData
            });

            if (res.redirected) {
                window.location.href = res.url;
            }

        } catch (err) {

            console.error(err);
            alert("บันทึกไม่สำเร็จ");
        }

    });


    /* =====================
       VALIDATION
    ====================== */

    function validateForm() {

        let valid = true;

        const customer = document.getElementById("customer_id");
        const fname = document.getElementById("first_name");
        const lname = document.getElementById("last_name");
        const address = document.getElementById("address");

        const phone = document.getElementById("phone");
        const email = document.getElementById("email");
        const province = document.getElementById("province");
        const status = document.getElementById("order_status");

        const process = document.querySelector(".select-process");
        const roast = document.querySelector(".select-lavel");
        const pack = document.querySelector(".select-size");


        [
            customer, fname, lname, address,
            phone, email, quantity, price,
            orderDate, deliveryDate
        ].forEach(clearError);

        [
            province, status, process, roast, pack
        ].forEach(el => el.classList.remove("select-error"));


        if (customer.value.trim() === "") {
            showError(customer, "กรอกรหัสลูกค้า");
            valid = false;
        }

        if (fname.value.trim() === "") {
            showError(fname, "กรอกชื่อ");
            valid = false;
        }

        if (lname.value.trim() === "") {
            showError(lname, "กรอกนามสกุล");
            valid = false;
        }

        if (address.value.trim() === "") {
            showError(address, "กรอกที่อยู่");
            valid = false;
        }

        if (phone.value === "") {
            showError(phone, "กรอกเบอร์");
            valid = false;
        }

        if (email.value === "") {
            showError(email, "กรอกอีเมล");
            valid = false;
        }


        if (status.value === "") {
            showErrorSelect(status);
            valid = false;
        }

        if (province.value === "") {
            showErrorSelect(province);
            valid = false;
        }

        if (process.value === "") {
            showErrorSelect(process);
            valid = false;
        }

        if (roast.value === "") {
            showErrorSelect(roast);
            valid = false;
        }

        if (pack.value === "") {
            showErrorSelect(pack);
            valid = false;
        }


        if (orderDate.value === "") {
            showError(orderDate, "เลือกวันที่");
            valid = false;
        }

        if (deliveryDate.value === "") {
            showError(deliveryDate, "เลือกวันที่");
            valid = false;
        }


        if (quantity.value <= 0) {
            showError(quantity, "มากกว่า 0");
            valid = false;
        }

        if (price.value <= 0) {
            showError(price, "มากกว่า 0");
            valid = false;
        }

        return valid;
    }


    /* =====================
       ERROR UI
    ====================== */

    function showError(input, msg) {

        input.classList.add("input-error");
        input.value = "";
        input.placeholder = msg;

        input.addEventListener("input", function clear() {

            input.classList.remove("input-error");
            input.placeholder = "";

            input.removeEventListener("input", clear);
        });
    }


    function showErrorSelect(select) {

        select.classList.add("select-error");

        select.addEventListener("change", function clear() {

            select.classList.remove("select-error");
            select.removeEventListener("change", clear);

        });
    }


    function clearError(el) {

        if (!el) return;

        el.classList.remove("input-error");
        el.classList.remove("select-error");
    }


    /* =====================
       FIND ROAST ID
    ====================== */

    async function findRoastId() {

        const process = document.querySelector(".select-process");
        const roast = document.querySelector(".select-lavel");

        console.log("PROCESS =", process.value);
        console.log("ROAST =", roast.value);

        if (!process.value || !roast.value) return null;

        const res = await fetch(
            `/api/roast/find?process=${process.value}&roast=${roast.value}`
        );

        const data = await res.json();

        console.log("ROAST DATA =", data);

        return data.roast_id || null;
    }


});
