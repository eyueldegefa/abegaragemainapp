// Import the query function from the db.config.js file 
const conn = require("../config/db.config");
// import service.service.js
const services = require('../services/service.service')
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
      order.order_hash
    ];
    const rows = await conn.query(query, params);

    if (!rows || rows.affectedRows !== 1) {
        return false;
    }
    const order_id = rows.insertId;
    // ===== 2. Insert each service into order_services =====
        // ===== Convert service info into comma-separated strings =====
        const serviceIds = Array.isArray(order.services)
            ? order.services.map(s => s.service_id).join(",")
            : order.service_id;

        const selectedServices = Array.isArray(order.services)
            ? order.services.map(s => s.selected_services).join(", ")
            : order.selected_services;

        const serviceCompleted = Array.isArray(order.services)
            ? order.services.map(s => s.service_completed).join(",")
            : order.service_completed;

        // Insert into order_services as ONE ROW
        const query2 = `
            INSERT INTO order_services (order_id, service_id, selected_services, service_completed)
            VALUES (?, ?, ?, ?)
        `;
        const params2 = [order_id, serviceIds, selectedServices, serviceCompleted];
        await conn.query(query2, params2);
    // ========Insert into Order_info============
    const query3 = "INSERT INTO order_info (order_id, order_total_price, additional_request, additional_requests_completed) VALUES (?, ?, ?, ?)";
    const params3 = [
        order_id,
        order.order_total_price,
        order.additional_request,
        order.additional_requests_completed
    ];
    const rows3 = await conn.query(query3, params3);
    // =========Insert into order_status=========
    const query4 = "INSERT INTO order_status (order_id, order_status) VALUES (?, ?)";
    const params4 = [
        order_id,
        order.order_status
    ]
    const rows4 = await conn.query(query4, params4);
    addedOrder = {
        order_id : order_id
    }
    } catch(err){
        console.log(err);
        return false;
    }
    return addedOrder;
    
}
// A function to get orders
async function getAllOrders() {
    const query = "SELECT * FROM orders INNER JOIN customer_info ON customer_info.customer_id = orders.customer_id INNER JOIN customer_identifier ON customer_identifier.customer_id = orders.customer_id INNER JOIN customer_vehicle_info ON customer_vehicle_info.customer_id = orders.customer_id";
    const rows = await conn.query(query);
    return rows;
}
// get order by ID
async function getOrderById(order_id) {
    const query = `SELECT * FROM orders 
    INNER JOIN order_info
       ON order_info.order_id = orders.order_id
    INNER JOIN order_services
       ON order_services.order_id = orders.order_id
    INNER JOIN order_status
       ON order_status.order_id = orders.order_id 
    WHERE orders.order_id = ?`;
    const rows = await conn.query(query, [order_id]);
        if (rows.length === 0) return null;
        return rows[0]; 
}
// 
async function updateOrderById({
      order_total_price,
      completion_date,
      additional_request,
      order_status,
      order_id
}) {
  const query = `
    UPDATE orders 
    INNER JOIN order_info
       ON order_info.order_id = orders.order_id
    INNER JOIN order_services
       ON order_services.order_id = orders.order_id
    INNER JOIN order_status
       ON order_status.order_id = orders.order_id   
    SET 
      order_total_price = ?,
      completion_date = ?,
      additional_request = ?,
      order_status = ?
    WHERE orders.order_id = ?
  `;

  const result = await conn.query(query, [
    order_total_price,
    completion_date,
    additional_request,
    order_status,
    order_id
  ]);

  return result;
}


module.exports = {
    addNewOrder,
    getAllOrders,
    getOrderById,
    updateOrderById
}
