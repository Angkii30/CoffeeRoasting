let allOrders = [];


/* โหลดตอนเปิดหน้า */
document.addEventListener("DOMContentLoaded", () => {

    loadOrders();

    document
        .getElementById("searchInput")
        .addEventListener("input", searchOrders);
});


/* โหลดข้อมูล */
function loadOrders() {

    fetch("/api/plan")

        .then(res => res.json())

        .then(data => {

            console.log("ORDERS:", data);

            allOrders = data;

            showOrders(data);

        })

        .catch(err => console.error(err));
}



/* แสดงตาราง */
function showOrders(data) {

    const table = document.getElementById("orderTable");

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


    data.forEach(order => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${order.customer_id || "-"}</td>

            <td>
                ${(order.first_name || "")}
                ${(order.last_name || "")}
            </td>

            <td>${order.roast_level || "-"}</td>

            <td>${order.process || "-"}</td>

            <td>${order.order_status}</td>

            <td>
                ${new Date(order.created_at).toLocaleDateString()}
            </td>

            <td class="action-col">

                <a href="/edit_order/${order.order_id}">
                    <img src="Picture/edit.png" class="edit">
                </a>

                <img src="Picture/delete.png"
                     class="delete"
                     style="cursor:pointer"
                     onclick="deleteOrder(${order.order_id})">
            </td>
        `;

        table.appendChild(row);
    });
}


/* ลบ */
function deleteOrder(id) {

    if (!confirm("ต้องการลบออเดอร์นี้หรือไม่?")) return;

    fetch(`/api/plan/${id}`, {
        method: "DELETE"
    })

        .then(res => res.json())

        .then(data => {

            if (data.success) {

                alert("ลบเรียบร้อย");

                loadOrders();
            }
        })

        .catch(err => console.error(err));
}


/* ค้นหา */
function searchOrders() {

    const keyword = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const result = allOrders.filter(order => {

        const id = order.customer_id?.toString() || "";
        const name = `${order.first_name || ""} ${order.last_name || ""}`.toLowerCase();

        const roast = order.roast_level?.toLowerCase() || "";

        const process = order.process?.toLowerCase() || "";
        const status = order.order_status?.toLowerCase() || "";

        return (
            id.includes(keyword) ||
            name.includes(keyword) ||
            roast.includes(keyword) ||
            process.includes(keyword) ||
            status.includes(keyword)
        );
    });

    showOrders(result);
}

