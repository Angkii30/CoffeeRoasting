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
                    <td colspan="14" style="text-align:center;">
                        ไม่พบข้อมูล
                    </td>
                </tr>
                `;

                return;
            }

            data.forEach(item => {

                // วันที่
                let roastDate = "-";
                let expireDate = "-";

                if (item.roast_date) {
                    roastDate = new Date(item.roast_date)
                        .toLocaleDateString("th-TH");
                }

                if (item.expire_date) {
                    expireDate = new Date(item.expire_date)
                        .toLocaleDateString("th-TH");
                }

                // Loss %
                let loss = item.loss_percent
                    ? item.loss_percent.toFixed(2)
                    : "0.00";


                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${item.species || "-"}</td>
                    <td>${item.process_method || "-"}</td>
                    <td>${item.roast_level || "-"}</td>

                    <td>${roastDate}</td>
                    <td>${expireDate}</td>

                    <td>${item.weight_before || 0}</td>
                    <td>${item.weight_after || 0}</td>

                    <td>${loss} %</td>

                    <td>${item.pack_size || "-"}</td>
                    <td>${item.pack_count || 0}</td>
                    <td>${item.sell_price || 0}</td>

                    <td>${item.username || "-"}</td>
                    <td>${item.note || "-"}</td>

                    <td class="action-col">

                        <a href="/edit_stockroast/${item.roast_id}">
                            <img src="/Picture/edit.png" class="edit">
                        </a>

                        <img src="/Picture/delete.png"
                            class="delete"
                            onclick="deleteStockRoast(${item.roast_id})">

                    </td>
                `;

                table.appendChild(row);

            });

        })
        .catch(err => console.error(err));
}



// =============================
// ลบข้อมูล
// =============================
function deleteStockRoast(id) {

    if (!confirm("ต้องการลบรายการนี้หรือไม่?")) return;

    fetch(`/api/stockroast/${id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {

            if (data.success) {

                alert("ลบเรียบร้อยแล้ว");
                loadStockRoast();
            }

        })
        .catch(err => console.error(err));
}
