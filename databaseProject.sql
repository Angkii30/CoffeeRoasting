CREATE DATABASE IF NOT EXISTS Projectweb
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE Projectweb;

CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50),
    created_day DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customer (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    address TEXT,
    province VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stock_cherry (
    cherry_id INT AUTO_INCREMENT PRIMARY KEY,
    source_farm VARCHAR(255),
    species VARCHAR(100),
    receive_date DATE,
    weight DECIMAL(10,2),
    buy_price DECIMAL(10,2),
    total_price DECIMAL(10,2),
    user_id INT,
    note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES user(user_id)
    ON DELETE SET NULL
);

CREATE TABLE stock_kala (
    kala_id INT AUTO_INCREMENT PRIMARY KEY,
    cherry_id INT,
    species VARCHAR(100),
    process_method VARCHAR(100),
    receive_date DATE,
    weight_before DECIMAL(10,2),
    weight_after DECIMAL(10,2),
    user_id INT,
    note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (cherry_id)
    REFERENCES stock_cherry(cherry_id)
    ON DELETE CASCADE,

    FOREIGN KEY (user_id)
    REFERENCES user(user_id)
    ON DELETE SET NULL
);

CREATE TABLE stock_san (
    san_id INT AUTO_INCREMENT PRIMARY KEY,
    kala_id INT,
    species VARCHAR(100),
    process_method VARCHAR(100),
    receive_date DATE,
    weight_before DECIMAL(10,2),
    weight_after DECIMAL(10,2),
    user_id INT,
    note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (kala_id)
    REFERENCES stock_kala(kala_id)
    ON DELETE CASCADE,

    FOREIGN KEY (user_id)
    REFERENCES user(user_id)
    ON DELETE SET NULL
);

CREATE TABLE stock_roast (
    roast_id INT AUTO_INCREMENT PRIMARY KEY,
    san_id INT,
    species VARCHAR(100),
    process_method VARCHAR(100),
    roast_level VARCHAR(50),
    roast_date DATE,
    weight_before DECIMAL(10,2),
    weight_after DECIMAL(10,2),
    loss_percent DECIMAL(5,2),
    expire_date DATE,
    pack_size VARCHAR(50),
    pack_count INT,
    sell_price DECIMAL(10,2),
    user_id INT,
    note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (san_id)
    REFERENCES stock_san(san_id)
    ON DELETE CASCADE,

    FOREIGN KEY (user_id)
    REFERENCES user(user_id)
    ON DELETE SET NULL
);

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    delivery_date DATE,
    order_status ENUM('pending','processing','completed','cancelled')
    DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id)
    REFERENCES customer(customer_id)
    ON DELETE SET NULL
);

CREATE TABLE orderdetails (
    detail_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    roast_id INT,
    quantity INT,
    price DECIMAL(10,2),
    total_price DECIMAL(10,2),
    user_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (order_id)
    REFERENCES orders(order_id)
    ON DELETE CASCADE,

    FOREIGN KEY (roast_id)
    REFERENCES stock_roast(roast_id)
    ON DELETE RESTRICT,

    FOREIGN KEY (user_id)
    REFERENCES user(user_id)
    ON DELETE SET NULL
);

INSERT INTO user (username, password, role) VALUES
('admin','1234','admin'),
('staff1','1234','staff'),
('staff2','1234','staff'),
('owner','1234','owner'),
('cashier','1234','cashier');

INSERT INTO customer
(first_name,last_name,address,province,phone,email)
VALUES
('สมชาย','ใจดี','123 ม.1','เชียงใหม่','0811111111','a1@gmail.com'),
('สมหญิง','รักดี','45 ม.2','เชียงราย','0822222222','a2@gmail.com'),
('วิชัย','ทองดี','78 ม.3','ลำปาง','0833333333','a3@gmail.com'),
('มณี','แสนสุข','90 ม.4','แพร่','0844444444','a4@gmail.com'),
('สายฝน','ใจงาม','12 ม.5','น่าน','0855555555','a5@gmail.com');

INSERT INTO stock_cherry
(source_farm,species,receive_date,weight,buy_price,total_price,user_id,note)
VALUES
('Farm A','Arabica','2026-01-01',100,120,12000,1,'ดีมาก'),
('Farm B','Robusta','2026-01-02',150,100,15000,2,''),
('Farm C','Arabica','2026-01-03',80,130,10400,3,''),
('Farm D','Liberica','2026-01-04',60,140,8400,4,''),
('Farm E','Arabica','2026-01-05',200,110,22000,1,'');

INSERT INTO stock_kala
(cherry_id,species,process_method,receive_date,
weight_before,weight_after,user_id,note)
VALUES
(1,'Arabica','Washed','2026-01-06',100,85,2,''),
(2,'Robusta','Dry','2026-01-07',150,130,3,''),
(3,'Arabica','Honey','2026-01-08',80,70,1,''),
(4,'Liberica','Dry','2026-01-09',60,50,4,''),
(5,'Arabica','Washed','2026-01-10',200,170,1,'');

INSERT INTO stock_san
(kala_id,species,process_method,receive_date,
weight_before,weight_after,user_id,note)
VALUES
(1,'Arabica','Clean','2026-01-11',85,80,2,''),
(2,'Robusta','Clean','2026-01-12',130,120,3,''),
(3,'Arabica','Clean','2026-01-13',70,65,1,''),
(4,'Liberica','Clean','2026-01-14',50,45,4,''),
(5,'Arabica','Clean','2026-01-15',170,160,1,'');

INSERT INTO stock_roast
(san_id,species,process_method,roast_level,
roast_date,weight_before,weight_after,
loss_percent,expire_date,pack_size,pack_count,
sell_price,user_id,note)
VALUES
(1,'Arabica','Roast','Medium','2026-01-16',80,72,10,'2026-04-16','250g',200,250,1,''),
(2,'Robusta','Roast','Dark','2026-01-17',120,105,12,'2026-04-17','500g',150,300,2,''),
(3,'Arabica','Roast','Light','2026-01-18',65,60,8,'2026-04-18','250g',180,260,1,''),
(4,'Liberica','Roast','Medium','2026-01-19',45,40,11,'2026-04-19','250g',100,280,4,''),
(5,'Arabica','Roast','Dark','2026-01-20',160,140,13,'2026-04-20','1kg',90,900,1,'');

INSERT INTO orders
(customer_id,delivery_date,order_status)
VALUES
(1,'2026-01-25','pending'),
(2,'2026-01-26','processing'),
(3,'2026-01-27','completed'),
(4,'2026-01-28','pending'),
(5,'2026-01-29','cancelled');

INSERT INTO orderdetails
(order_id,roast_id,quantity,price,total_price,user_id)
VALUES
(1,1,2,250,500,2),
(2,2,1,300,300,3),
(3,3,3,260,780,1),
(4,4,2,280,560,4),
(5,5,1,900,900,1);
