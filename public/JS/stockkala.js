document.addEventListener("DOMContentLoaded", () => {

    loadKala();

    document
        .getElementById("searchInput")
        .addEventListener("input", loadKala);

    document
        .getElementById("dateInput")
        .addEventListener("change", loadKala);

});


function loadKala() {

    const search =
        document.getElementById("searchInput").value;

    const date =
        document.getElementById("dateInput").value;

    let url =
        `/api/kala?search=${encodeURIComponent(search)}&date=${date}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            const table =
                document.getElementById("kalaTable");

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

            data.forEach(kala => {

                const row =
                    document.createElement("tr");

                row.innerHTML = `
                    <td>${kala.species}</td>

                    <td>${kala.process_method}</td>

                    <td>${kala.weight_after}</td>

                    <td>${formatDate(kala.receive_date)}</td>

                    <td>${kala.note || "-"}</td>

                    <td class="action-col">

                        <a href="/edit_stockkala/${kala.kala_id}">
                            <img src="/Picture/edit.png" class="edit">
                        </a>

                        <img src="/Picture/delete.png"
                             class="delete"
                             onclick="deleteKala(${kala.kala_id})">

                    </td>
                `;

                table.appendChild(row);

            });

        })
        .catch(err => console.error(err));

}


// ================= ลบ =================
function deleteKala(id) {

    if (!confirm("ต้องการลบข้อมูลนี้หรือไม่?")) return;

    fetch(`/api/kala/${id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {

            if (data.success) {
                alert("ลบเรียบร้อย");
                loadKala();
            }

        })
        .catch(err => console.error(err));

}


// ================= แปลงวันที่ =================
function formatDate(dateStr) {

    if (!dateStr) return "-";

    const d = new Date(dateStr);

    return d.toLocaleDateString("th-TH");

}
