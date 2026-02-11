// ฟังก์ชัน logout สำหรับ sidebar
function logout() {
    if (confirm('คุณต้องการออกจากระบบหรือไม่?')) {
        // สามารถเพิ่มลบ session/cookie ที่นี่ถ้ามี
        window.location.href = '/login';
    }
}

async function login() {

    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const error = document.getElementById("error");

    if (user === "" || pass === "") {
        error.innerText = "กรุณากรอกข้อมูลให้ครบ";
        return;
    }

    try {

        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: user,
                password: pass
            })
        });

        const result = await res.json();

        if (result.success) {

            window.location.href = "/index";

        } else {

            error.innerText = result.message;

        }

    } catch (err) {

        error.innerText = "Username หรือ Password ไม่ถูกต้อง";

    }
}

