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
// A function to create a new employee 
async function createCustomer(customer) {
  let createdCustomer = {};
  try {
    // Insert the basic employee data in to the employee table  
    // Generate a salt and hash the password 
    const salt = await bcrypt.genSalt(10);
        // Hash the password 
    const customer_hash = await bcrypt.hash(customer.customer_email, salt);
    // Insert the email in to the employee table  
    const query = "INSERT INTO customer_identifier (customer_id, customer_email, customer_phone_number, customer_hash) VALUES (?, ?, ?, ?)";
    const rows = await conn.query(query, [customer_id, customer.customer_email, customer.customer_phone_number, customer_hash]);
    console.log(rows);
    if (rows.affectedRows !== 1) {
      return false;
    }
    // Get the employee id from the insert 
    const customer_id = rows.insertId;
    // Insert the remaining data in to the employee_info, employee_pass, and employee_role tables  
    const query2 = "INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (?, ?, ?, ?)";
    const rows2 = await conn.query(query2, [customer_id, customer.customer_first_name, customer.customer_last_name, customer.active_customer_status]);
    // construct to the employee object to return 
    createdCustomer = {
      customer_id: customer_id,
    }
  } catch (err) {
    console.log(err);
  }
  // Return the employee object 
  return createdCustomer;
}
// export the functions for use in the controller
module.exports = {
  checkIfCustomerExists,
  createCustomer
};

