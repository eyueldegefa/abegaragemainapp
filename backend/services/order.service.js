// Import the query function from the db.config.js file 
const conn = require("../config/db.config");
// a function to add new service
async function addNewOrder(order) {
    let addedOrder = {}
    try {
    // Validate required fields
    if (!order.customer_id || !order.employee_id || !order.vehicle_id) {
      console.log("❌ Missing Order Fields:", order);
      return false;
    }

    // Insert without explicit order_id (assumes auto-increment) and provide matching placeholders
    const query = "INSERT INTO orders (employee_id, customer_id, vehicle_id, active_order, order_hash) VALUES ( ?, ?, ?, ?, ?)";
    const params = [
      order.employee_id,
      order.customer_id,
      order.vehicle_id,
      order.active_order,
      order.order_hash || "hash"
    ];
    const rows = await conn.query(query, params);

    if (!rows || rows.affectedRows !== 1) {
        return false;
    }
    const order_id = rows.insertId;
    addedOrder = {
        order_id : order_id
    }
    } catch(err){
        console.log(err);
        return false;
    }
    return addedOrder;
    
}

module.exports = {
    addNewOrder
}