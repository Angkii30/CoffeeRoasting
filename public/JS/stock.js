document.addEventListener("DOMContentLoaded", () => {
  loadStock();
});

function loadStock() {

  fetch("/api/stock_cherry")
    .then(res => res.json())
    .then(data => {

      const tbody = document.querySelector(".stockTable tbody");

      tbody.innerHTML = ""; // ล้างข้อมูลเก่า

      data.forEach(item => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
                    <td>เชอร์รี่</td>
                    <td class="qty">${item.weight}</td>
                    <td>${formatDate(item.receive_date)}</td>
                    <td>${item.source_farm}</td>
                    <td>${item.username ?? "-"}</td>

                    <td class="action-col">
                        <a href="/edit_stock/${item.cherry_id}">
                            <img src="Picture/edit.png" class="edit">
                        </a>

                        <img src="Picture/delete.png" 
                             class="delete"
                             onclick="deleteStock(${item.cherry_id})">
                    </td>
                `;

        tbody.appendChild(tr);
      });

    })
    .catch(err => console.error(err));
}

function formatDate(dateStr) {

  const date = new Date(dateStr);

  return date.toLocaleDateString("th-TH", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit"
  });
}
function deleteStock(id) {

  if (!confirm("ต้องการลบข้อมูลนี้หรือไม่?")) return;

  fetch(`/api/stock_cherry/${id}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => {

      if (data.success) {
        alert("ลบเรียบร้อย");
        loadStock(); // โหลดใหม่
      }

    });
}
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {

  const value = this.value.toLowerCase();
  const rows = document.querySelectorAll(".stockTable tbody tr");

  rows.forEach(row => {

    const text = row.textContent.toLowerCase();

    row.style.display = text.includes(value)
      ? ""
      : "none";
  });
});
