// Import the query function from the db.config.js file 
const conn = require("../config/db.config");
// Import the bcrypt module 
const bcrypt = require('bcrypt');
// A function to check if customer exists in the database 
async function checkIfCustomerExists(email) {
  const query = "SELECT * FROM customer_identifier WHERE customer_email = ? ";
  const rows = await conn.query(query, [email]);
  console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}
// A function to create a new customer 
async function createCustomer(customer) {
  let createdCustomer = {};
  try {
    // Insert the basic customer data in to the customer_identifier table  
    // Generate a salt and hash
    const salt = await bcrypt.genSalt(10);
        // Hash the password 
    const customer_hash = await bcrypt.hash(customer.customer_email, salt);
    // Insert the email in to the customer_identifier table  
    const query = "INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) VALUES (?, ?, ?)";
    const rows = await conn.query(query, [customer.customer_email, customer.customer_phone_number, customer_hash]);
    console.log(rows);
    if (rows.affectedRows !== 1) {
      return false;
    }
    // Get the customer id from the insert 
    const customer_id = rows.insertId;
    // Insert the remaining data in to the customer_info table
    const query2 = "INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (?, ?, ?, ?)";
    const rows2 = await conn.query(query2, [customer_id, customer.customer_first_name, customer.customer_last_name, customer.active_customer_status]);
    // construct to the customer object to return 
    createdCustomer = {
      customer_id: customer_id,
    }
  } catch (err) {
    console.log(err);
  }
  // Return the Customer object 
  return createdCustomer;
}

// A function to get all customers
async function getAllCustomers() {
  const query = "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_info.customer_id = customer_identifier.customer_id ";
  const rows = await conn.query(query);
  return rows;
}
// A function to get a single customer by ID
async function getCustomerById(customerId) {
  const query = "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_id = ?";
  const rows = await conn.query(query, [customerId]);
    if (rows.length === 0) return null;
  return rows[0];  // ✅ only return one customer
}
// 
async function searchCustomers(queryText) {
  const searchTerm = `%${queryText}%`;
  const sql = `
    SELECT * FROM customer_identifier 
    INNER JOIN customer_info 
    ON customer_identifier.customer_id = customer_info.customer_id
    WHERE customer_info.customer_first_name LIKE ?
       OR customer_info.customer_last_name LIKE ?
       OR customer_identifier.customer_email LIKE ?
       OR customer_identifier.customer_phone_number LIKE ?
  `;

  const [rows] = await conn.query(sql, [
    searchTerm,
    searchTerm,
    searchTerm,
    searchTerm,
  ]);
  return rows;
}

// A function to Edit or Update customer
async function editCustomer({
  customer_id,
  customer_phone_number,
  customer_first_name,
  customer_last_name,
  active_customer_status
}) {
  const query = `
    UPDATE customer_identifier
    INNER JOIN customer_info
      ON customer_info.customer_id = customer_identifier.customer_id
    SET 
      customer_identifier.customer_phone_number = ?,
      customer_info.customer_first_name = ?,
      customer_info.customer_last_name = ?,
      customer_info.active_customer_status = ?
    WHERE customer_identifier.customer_id = ?
  `;

  const rows = await conn.query(query, [
    customer_phone_number,
    customer_first_name,
    customer_last_name,
    active_customer_status,
    customer_id
  ]);

  return rows;
}
// A function to delete a single customer by ID
async function deleteCustomerById(customerId) {
  // 1. Delete child table first
  const query = "DELETE FROM customer_info WHERE customer_id = ?";
  const rows = await conn.query(query, [customerId]);

  // 2. Delete parent table
  const query2 = "DELETE FROM customer_identifier WHERE customer_id = ?";
  const rows2 = await conn.query(query2, [customerId]);

  return rows, rows2;
}


// export the functions for use in the controller
module.exports = {
  checkIfCustomerExists,
  createCustomer,
  getAllCustomers,
  getCustomerById,
  searchCustomers,
  editCustomer,
  deleteCustomerById
};
