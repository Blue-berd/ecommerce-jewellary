// "use strict";

// function createTables() {
//   const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS users (
//     user_id INT AUTO_INCREMENT PRIMARY KEY,
//     user_name VARCHAR(255),
//     billing_address VARCHAR(255),
//     shipping_address VARCHAR(255),
//     mobile_no VARCHAR(15) UNIQUE NOT NULL,
//     email VARCHAR(255) UNIQUE
//   );
  
//   CREATE TABLE IF NOT EXISTS products (
//     product_id INT AUTO_INCREMENT PRIMARY KEY,
//     product_name VARCHAR(255) NOT NULL,
//     category ENUM('male', 'female') NOT NULL,
//     style ENUM('neck', 'wrist') NOT NULL,
//     weight_in_grams DECIMAL(10, 2) NOT NULL,
//     type ENUM('gold', 'diamond') NOT NULL,
//     barcode VARCHAR(50) UNIQUE NOT NULL,
//     jewels TEXT
//   );
  
//   CREATE TABLE IF NOT EXISTS deliveryboys (
//     deliveryboy_id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     mobile VARCHAR(15) NOT NULL,
//     email VARCHAR(255),
//     address VARCHAR(255),
//     aadhar_card VARCHAR(20) UNIQUE NOT NULL
//   );
  
//   CREATE TABLE IF NOT EXISTS reviews (
//     review_id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id INT,
//     product_id INT,
//     review_message TEXT,
//     rating DECIMAL(3, 2),
//     FOREIGN KEY (user_id) REFERENCES users(user_id),
//     FOREIGN KEY (product_id) REFERENCES products(product_id)
//   );
  
//   CREATE TABLE IF NOT EXISTS shopping_cart (
//     cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id INT,
//     product_id INT,
//     quantity INT DEFAULT 1,
//     FOREIGN KEY (user_id) REFERENCES users(user_id),
//     FOREIGN KEY (product_id) REFERENCES products(product_id)
//   );
  
//   CREATE TABLE IF NOT EXISTS orders (
//     order_id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id INT,
//     product_id INT,
//     deliveryboy_id INT,
//     order_status ENUM('delivered', 'cancelled', 'on_the_way') DEFAULT 'on_the_way',
//     order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES users(user_id),
//     FOREIGN KEY (product_id) REFERENCES products(product_id),
//     FOREIGN KEY (deliveryboy_id) REFERENCES deliveryboys(deliveryboy_id)
//   );
  
//   CREATE TABLE IF NOT EXISTS repair_products (
//     repair_id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id INT,
//     product_id INT,
//     repair_status ENUM('taking_to_workshop', 'working_on_it', 'shipping_to_store', 'repair_complete') DEFAULT 'taking_to_workshop',
//     estimated_delivery_date DATE,
//     FOREIGN KEY (user_id) REFERENCES users(user_id),
//     FOREIGN KEY (product_id) REFERENCES products(product_id)
//   );
  
//   CREATE TABLE IF NOT EXISTS stock_management (
//     stock_id INT AUTO_INCREMENT PRIMARY KEY,
//     product_name VARCHAR(255) NOT NULL,
//     quantity INT NOT NULL,
//     refill_date DATE NOT NULL,
//     cost_per_unit DECIMAL(10, 2)
//   );

//   CREATE TABLE IF NOT EXISTS otp (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     mobile_no VARCHAR(15) UNIQUE NOT NULL,
//     otp_value VARCHAR(6) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     expires_at TIMESTAMP NULL,
//     INDEX (expires_at)
//   );
  
//   DELIMITER //
//   CREATE TRIGGER set_expires_at BEFORE INSERT ON otp
//   FOR EACH ROW
//   BEGIN
//     SET NEW.expires_at = IFNULL(DATE_ADD(NEW.created_at, INTERVAL 5 MINUTE), NULL);
//   END;
//   //
//   DELIMITER ;
  
//   `;
//   return createTableQuery;
// }

// (async function (){
//   mysql.query(createTables())
// })()
