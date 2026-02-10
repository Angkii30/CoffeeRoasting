document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    const beforeInput = document.querySelector('input[name="weight_before"]');
    const afterInput = document.querySelector('input[name="weight_after"]');
    const lossInput = document.getElementById("loss_percent");

    /* ================== คำนวณ % สูญเสีย ================== */
    function calLoss() {

        const before = parseFloat(beforeInput.value);
        const after = parseFloat(afterInput.value);

        if (before > 0 && after >= 0 && after <= before) {

            const loss = ((before - after) / before) * 100;
            lossInput.value = loss.toFixed(2);

        } else {
            lossInput.value = "";
        }
    }

    beforeInput.addEventListener("input", calLoss);
    afterInput.addEventListener("input", calLoss);


    /* ================== Validate ================== */
    form.addEventListener("submit", function (e) {

        e.preventDefault();

        let valid = true;

        /* ล้าง error เก่า */
        document.querySelectorAll(".input-error, .select-error")
            .forEach(el => {
                el.classList.remove("input-error", "select-error");
            });

        /* ===== สายพันธุ์ ===== */
        const species = document.querySelector('input[name="species"]:checked');
        if (!species) {
            alert("กรุณาเลือกสายพันธุ์กาแฟ");
            valid = false;
        }

        /* ===== Process ===== */
        const process = document.getElementById("process");
        if (!process.value) {
            process.classList.add("select-error");
            valid = false;
        }

        /* ===== Roast Level ===== */
        const roast = document.getElementById("roast_level");
        if (!roast.value) {
            roast.classList.add("select-error");
            valid = false;
        }

        /* ===== วันที่คั่ว ===== */
        const roastDate = document.getElementById("roast_date");
        if (!roastDate.value) {
            roastDate.classList.add("input-error");
            valid = false;
        }

        /* ===== น้ำหนัก ===== */
        if (!beforeInput.value || beforeInput.value <= 0) {
            beforeInput.classList.add("input-error");
            valid = false;
        }

        if (!afterInput.value || afterInput.value <= 0) {
            afterInput.classList.add("input-error");
            valid = false;
        }

        if (Number(afterInput.value) > Number(beforeInput.value)) {
            alert("น้ำหนักหลังคั่วต้องไม่มากกว่าก่อนคั่ว");
            valid = false;
        }

        /* ===== วันหมดอายุ ===== */
        const exp = document.getElementById("exprie_date");
        if (!exp.value) {
            exp.classList.add("input-error");
            valid = false;
        }

        /* ===== แพ็ค ===== */
        const packSize = document.getElementById("pack_size");
        const packCount = document.getElementById("pack_count");

        if (!packSize.value.trim()) {
            packSize.classList.add("input-error");
            valid = false;
        }

        if (!packCount.value || packCount.value <= 0) {
            packCount.classList.add("input-error");
            valid = false;
        }

        /* ===== ราคา ===== */
        const price = document.getElementById("sell_price");
        if (!price.value || price.value <= 0) {
            price.classList.add("input-error");
            valid = false;
        }

        /* ===== ผู้รับผิดชอบ ===== */
        const role = document.getElementById("role");
        if (!role.value.trim()) {
            role.classList.add("input-error");
            valid = false;
        }

        /* ===== ผ่าน ===== */
        if (valid) {
            alert("✅ บันทึกข้อมูลเรียบร้อย");
            form.submit();
        } else {
            alert("⚠️ กรุณากรอกข้อมูลให้ครบถ้วน");
        }

    });

});
