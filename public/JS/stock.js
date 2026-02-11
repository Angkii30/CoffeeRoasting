document.addEventListener("DOMContentLoaded", loadStock);

document.addEventListener("DOMContentLoaded", () => {

  loadStock();

  document
    .getElementById("searchInput")
    .addEventListener("input", loadStock);

  document
    .getElementById("dateFilter")
    .addEventListener("change", loadStock);

});


// =============================
// โหลดข้อมูล
// =============================
function loadStock() {

  const search = document.getElementById("searchInput").value;
  const date = document.getElementById("dateFilter").value;

  let url = `/api/stock?search=${encodeURIComponent(search)}&date=${date}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {

      const table = document.getElementById("stockTableBody");

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

      data.forEach(stock => {

        let date = "-";

        if (stock.receive_date) {
          const d = new Date(stock.receive_date.replace(" ", "T"));

          date = d.toLocaleDateString("th-TH", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          });
        }



        const row = document.createElement("tr");

        row.innerHTML = `
                    <td>${stock.species}</td>

                    <td>${stock.source_farm}</td>

                    <td>${stock.weight}</td>

                    <td>${Number(stock.buy_price).toLocaleString()}</td>

                    <td>${Number(stock.total_price).toLocaleString()}</td>

                    <td>${date}</td>

                    <td>${stock.username || "-"}</td>
                    <td>${stock.note || "-"}</td> 

                    <td class="action-col">

                        <a href="/edit_stock/${stock.cherry_id}">
                            <img src="/Picture/edit.png" class="edit">
                        </a>

                        <img src="/Picture/delete.png"
                            class="delete"
                            onclick="deleteStock(${stock.cherry_id})">
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
function deleteStock(id) {

  if (!confirm("ต้องการลบข้อมูลนี้หรือไม่?")) return;

  fetch(`/api/stock/${id}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => {

      if (data.success) {

        alert("ลบเรียบร้อย");
        loadStock();
      }

    })
    .catch(err => console.error(err));
}
