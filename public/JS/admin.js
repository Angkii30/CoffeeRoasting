const bcrypt = require("bcrypt");
const db = require("./db");

async function createAdmin() {

    const hash = await bcrypt.hash("123456", 10);

    db.query(
        "INSERT IGNORE INTO user (username, password, role) VALUES (?, ?, ?)",
        ["admin", hash, "admin"]
    );

}

createAdmin();
//ใช้ node admin.js
//ยังไม่ได้