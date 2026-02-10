
document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {

        e.preventDefault(); // กัน submit ทันที

        let valid = true;

        // ล้าง error เก่า
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

        /* ===== กระบวนการ ===== */
        const process = document.getElementById("process");
        if (!process.value) {
            process.classList.add("select-error");
            valid = false;
        }

        /* ===== วันที่รับเข้า ===== */
        const date = document.getElementById("roast_date");
        if (!date.value) {
            date.classList.add("input-error");
            valid = false;
        }

        /* ===== น้ำหนัก ===== */
        const weight = document.getElementById("weight");
        if (!weight.value || weight.value <= 0) {
            weight.classList.add("input-error");
            valid = false;
        }

        /* ===== จำนวน ===== */
        const quantity = document.getElementById("quantity");
        if (!quantity.value || quantity.value <= 0) {
            quantity.classList.add("input-error");
            valid = false;
        }

        /* ===== ผู้รับผิดชอบ ===== */
        const staff = document.getElementById("staff");
        if (!staff.value.trim()) {
            staff.classList.add("input-error");
            valid = false;
        }

        /* ===== ถ้าผ่านทั้งหมด ===== */
        if (valid) {
            alert("✅ บันทึกข้อมูลเรียบร้อย");
            form.submit(); // ส่งข้อมูลจริง
        } else {
            alert("⚠️ กรุณากรอกข้อมูลให้ครบถ้วน");
        }

    });

});

