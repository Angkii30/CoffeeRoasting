router.post("/update_customer", (req, res) => {
    const {
        customer_id,
        firstname,
        lastname,
        address,
        province,
        phone,
        email
    } = req.body;

    const sql = `
        UPDATE customer
        SET firstname = ?, 
            lastname = ?, 
            address = ?, 
            province = ?, 
            phone = ?, 
            email = ?
        WHERE customer_id = ?
    `;

    db.query(sql, [
        firstname,
        lastname,
        address,
        province,
        phone,
        email,
        customer_id
    ], (err) => {
        if (err) {
            console.error(err);
            return res.send("อัปเดตไม่สำเร็จ");
        }

        res.redirect("/customer");
    });
});
