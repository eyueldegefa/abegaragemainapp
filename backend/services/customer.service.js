// Import the query function from the db.config.js file 
const conn = require("../config/db.config");

// a function to create a new customer
async function createCustomer(customer) {
  let createdCustomer = {};
  try {
    const query = "INSERT INTO customer_info (customer_first_name, customer_last_name, customer_active_status) VALUES (?, ?, ?)";
    const rows = await conn.query(query, [customer.customer_first_name, customer.customer_last_name, customer.customer_active_status]);
    console.log(rows);
    if (rows.affectedRows !== 1) {
      return false;
    }
    // Get the customer id from the insert 
    const customer_id = rows.insertId;
    // query2
    const query2 = "INSERT INTO customer_identifier (customer_email, customer_phone_number) VALUES (?, ?)";
    const rows2 = await conn.query2(query2, [customer.customer_email, customer.customer_phone_number]);
    console.log(rows2);
    
    // construct to the customer object to return 
    createdCustomer = {
      customer_id: customer_id
    }
  } catch (err) {
    console.log(err);
  }
  // Return the customer object 
  return createdCustomer;
}

module.exports = {
    createCustomer
}
