document.addEventListener("DOMContentLoaded", () => {

    loadStockRoast();

    document
        .getElementById("searchInput")
        .addEventListener("input", loadStockRoast);

});


// =============================
// โหลดข้อมูล
// =============================
function loadStockRoast() {

    const search = document.getElementById("searchInput").value;

    let url = `/api/stockroast?search=${encodeURIComponent(search)}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            const table = document.getElementById("stockTable");

            table.innerHTML = "";

            if (data.length === 0) {

                table.innerHTML = `
                <tr>
                    <td colspan="11" style="text-align:center;">
                        ไม่พบข้อมูล
                    </td>
                </tr>
                `;

                return;
            }

            data.forEach(item => {

                // แปลงวันที่
                let roastDate = "-";
                let expireDate = "-";

                if (item.roast_date) {
                    roastDate = new Date(item.roast_date)
                        .toLocaleDateString("th-TH");
                }

                if (item.expire_date) {
                    expireDate = new Date(item.expire_date)
