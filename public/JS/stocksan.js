document.addEventListener("DOMContentLoaded", () => {

    loadStockSan();

    document
        .querySelector("input[type='text']")
        .addEventListener("input", loadStockSan);

    document
        .querySelector("input[type='date']")
        .addEventListener("change", loadStockSan);

});


// =============================
// โหลดข้อมูล
// =============================
function loadStockSan() {

    const search = document.querySelector("input[type='text']").value;
    const date = document.querySelector("input[type='date']").value;

    let url = `/api/stocksan?search=${encodeURIComponent(search)}&date=${date}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            const table = document.querySelector("tbody");
            table.innerHTML = "";

            if (data.length === 0) {

                table.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align:center;">
                        ไม่พบข้อมูล
                    </td>
                </tr>
                `;
                return;
            }

            data.forEach(item => {

                let dateText = "-";

                if (item.receive_date) {
                    const d = new Date(item.receive_date);
                    dateText = d.toLocaleDateString("th-TH");
                }

                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${item.species}</td>
                    <td>${item.process_method}</td>
                    <td>${item.weight_before}</td>
                    <td>${item.weight_after}</td>
                    <td>${dateText}</td>
                    <td>${item.username || "-"}</td>
                    <td>${item.note || "-"}</td>

                    <td class="action-col">
                        <a href="/edit_stocksan/${item.san_id}">
                            <img src="/Picture/edit.png" class="edit">
                        </a>

                        <img src="/Picture/delete.png"
                             class="delete"
                             onclick="deleteStockSan(${item.san_id})">
                    </td>
                `;

                table.appendChild(row);

            });

        })
        .catch(err => console.error(err));
}



// =============================
// ลบ
// =============================
function deleteStockSan(id) {

    if (!confirm("ต้องการลบข้อมูลนี้หรือไม่?")) return;

    fetch(`/api/stocksan/${id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {

            if (data.success) {

                alert("ลบเรียบร้อย");
                loadStockSan();
            }

        })
        .catch(err => console.error(err));
}
