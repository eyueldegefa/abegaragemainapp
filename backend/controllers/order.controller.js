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

async function createOrder(req, res) {
  try {
    console.log("📥 REQ BODY:", req.body);

    const {
      customer_id,
      employee_id,
      vehicle_id,
      active_order,
      service_id,
      selected_services,
      service_completed,
      order_total_price,
      additional_request,
      additional_requests_completed,
      order_status
    } = req.body;

    const order = await orderService.addNewOrder({
      customer_id,
      employee_id,
      vehicle_id,
      active_order,
      service_id,
      selected_services,
      service_completed,
      order_hash: "check",
      order_total_price,
      additional_request,
      additional_requests_completed,
      order_status
    });

    if (!order) {
      return res.status(500).json({
        status: "failure",
        message: "Order could not be added"
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Order added successfully",
      data: order
    });

  } catch (error) {
    console.error("Error creating order:", error);
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