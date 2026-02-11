document.addEventListener("DOMContentLoaded", loadCustomers);
document.addEventListener("DOMContentLoaded", () => {

    loadCustomers();

    document
        .getElementById("searchInput")
        .addEventListener("input", loadCustomers);

    document
        .getElementById("dateInput")
        .addEventListener("change", loadCustomers);
});

function loadCustomers() {

    const search = document.getElementById("searchInput").value;
    const date = document.getElementById("dateInput").value;

    let url = `/api/cus?search=${encodeURIComponent(search)}&date=${date}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            const table = document.getElementById("customerTable");

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

            data.forEach(cus => {

                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${cus.customer_id}</td>
                    
                    <td>${cus.first_name} ${cus.last_name}</td>

                    <td>${cus.province}</td>

                    <td>-</td>

                    <td>${cus.phone}</td>

                    <td class="action-col">
                        <a href="/edit_customer?id=${cus.customer_id}">
                            <img src="/Picture/edit.png" class="edit">
                        </a>

                        <img src="/Picture/delete.png"
                            class="delete"
                            onclick="deleteCustomer(${cus.customer_id})">
                    </td>

                `;

                table.appendChild(row);
            });

        })
        .catch(err => console.error(err));
}


function deleteCustomer(id) {

    if (!confirm("ต้องการลบลูกค้าคนนี้หรือไม่?")) return;

    fetch(`/api/cus/${id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {

            if (data.success) {
                alert("ลบเรียบร้อย");
                loadCustomers();
            }

        })
        .catch(err => console.error(err));
}
