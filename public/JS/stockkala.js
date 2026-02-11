document.addEventListener("DOMContentLoaded", () => {

    loadStockKala();

    document
        .getElementById("searchInput")
        .addEventListener("input", loadStockKala);

    document
        .getElementById("dateInput")
        .addEventListener("change", loadStockKala);

});


// =============================
// โหลดข้อมูล
// =============================
function loadStockKala() {

    const search = document.getElementById("searchInput").value;
    const date = document.getElementById("dateInput").value;

    let url = `/api/stockkala?search=${encodeURIComponent(search)}&date=${date}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            const table = document.getElementById("stockTable");

            table.innerHTML = "";

            if (data.length === 0) {

                table.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align:center;">
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

                    <td>${item.username || "-"}</td>   <!-- ผู้รับผิดชอบ -->

                    <td>${item.note || "-"}</td>       <!-- หมายเหตุ -->

                    <td class="action-col">

                        <a href="/edit_stockkala/${item.kala_id}">
                            <img src="/Picture/edit.png" class="edit">
                        </a>

                        <img src="/Picture/delete.png"
                            class="delete"
                            onclick="deleteStockKala(${item.kala_id})">

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
function deleteStockKala(id) {

    if (!confirm("ต้องการลบข้อมูลนี้หรือไม่?")) return;

    fetch(`/api/stockkala/${id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {

            if (data.success) {

                alert("ลบเรียบร้อย");
                loadStockKala();
            }

        })
        .catch(err => console.error(err));
}
