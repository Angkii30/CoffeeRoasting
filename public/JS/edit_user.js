document.getElementById("editUserForm").addEventListener("submit", function (e) {
    e.preventDefault(); // ⬅️ ต้องเปิด

    const data = {
        user_id: document.querySelector("input[name='user_id']").value,
        username: document.querySelector("input[name='username']").value.trim(),
        password: document.querySelector("input[name='password']").value.trim(),
        role: document.querySelector("select[name='role']").value
    };

    if (!data.username || !data.role) {
        alert("กรุณากรอกข้อมูลให้ครบ");
        return;
    }

    fetch("/edit_user/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                alert("บันทึกข้อมูลเรียบร้อย");
                window.location.href = "/user";
            } else {
                alert(result.message || "เกิดข้อผิดพลาด");
            }
        })
        .catch(err => {
            console.error(err);
            alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
        });
});
