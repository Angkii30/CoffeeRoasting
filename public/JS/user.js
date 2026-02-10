let allUsers = [];

document.addEventListener("DOMContentLoaded", () => {
    loadUsers();

    document
        .getElementById("searchInput")
        .addEventListener("input", searchUsers);
});

/* โหลดข้อมูล */
function loadUsers() {

    fetch("/api/users")

        .then(res => res.json())

        .then(data => {

            allUsers = data;

            showUsers(data);

        })

        .catch(err => console.error(err));
}

/* แสดงตาราง */
function showUsers(data) {

    const table = document.getElementById("userTable");

    table.innerHTML = "";

    // ⭐ ถ้าไม่เจอข้อมูล
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

    data.forEach(user => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.user_id}</td>

            <td>${user.username || "-"}</td>

            <td>${user.role || "-"}</td>

            <td class="action-col">

                <a href="/edit_user/${user.user_id}">
                    <img src="Picture/edit.png" class="edit">
                </a>

                <img src="Picture/delete.png"
                    class="delete"
                    style="cursor:pointer"
                    onclick="deleteUser(${user.user_id})">

            </td>
        `;

        table.appendChild(row);
    });
}


/* ลบ */
function deleteUser(id) {

    if (!confirm("ต้องการลบผู้ใช้นี้หรือไม่?")) return;

    fetch(`/api/users/${id}`, {
        method: "DELETE"
    })

        .then(res => res.json())

        .then(data => {

            if (data.success) {

                alert("ลบเรียบร้อยแล้ว");

                loadUsers(); // โหลดใหม่
            }

        })

        .catch(err => console.error(err));
}


/* ค้นหา */
function searchUsers() {

    const keyword = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const result = allUsers.filter(user => {

        const id = user.user_id?.toString() || "";
        const name = user.username?.toLowerCase() || "";
        const role = user.role?.toLowerCase() || "";

        return (
            id.includes(keyword) ||
            name.includes(keyword) ||
            role.includes(keyword)
        );
    });

    showUsers(result);
}


