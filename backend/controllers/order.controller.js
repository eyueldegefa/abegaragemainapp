// import order.service
const { query } = require('../config/db.config');
const orderService = require('../services/order.service');

// get customer by search
async function getCustomerBySearch(req, res) {  
    try {
        const { first_name, email } = req.query;
        const customers = await orderService.getCustomerBySearch(first_name, email);
        if(!customers){
            return res.status(404).json({ 
                status: 'Fail',
                message: 'No customers found' 
            });
        } else {
            return res.status(200).json({
                status: 'Success',
                message: "Customers retrieved successfully",
                data: customers
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'Error',
            message: "Internal Server Error"
        });
    }
}

// A function to handle creating a new order
async function createOrder(req, res) {
  try {
    console.log("📥 REQ BODY:", req.body);
    const { customer_id, employee_id, selected_services:[], vehicle_id, active_order } = req.body;
    // Create new order
    const order = await orderService.addNewOrder({
  customer_id,
  employee_id,
  selected_services: [],
  vehicle_id,
  active_order,
  order_hash: "hash"
});

    if (!order) {
      return res.status(500).json({ 
        status: "failure", 
        message: "Order could not be added" 
      });
    } else {
        return res.status(201).json({
          status: "success",
          message: "Order added successfully",
          data: order
        });
    }
  } catch (error) {
    console.error("Error creating customer:", error);
    return res.status(500).json({ 
      message: "Internal server error" 
    });
  }
}
// export the functions
module.exports = {
    getCustomerBySearch,
    createOrder
}