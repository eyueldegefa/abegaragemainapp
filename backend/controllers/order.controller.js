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

// ========================
//   CREATE NEW ORDER
// ========================
async function createOrder(req, res) {
    try {
        console.log("📥 REQ BODY:", req.body);

        const {
            customer_id,
            employee_id,
            vehicle_id,
            active_order,
            order_total_price,
            additional_request,
            additional_requests_completed,
            order_status,

            // Accept both old and new formats
            service_id,
            selected_services,
            service_completed
        } = req.body;

        let serviceList = [];
         if (Array.isArray(service_id)) {
            // Convert selected_services string into array
            const selectedServicesArray = typeof selected_services === "string"
                ? selected_services.split(",").map(s => s.trim())
                : selected_services;
        
            for (let i = 0; i < service_id.length; i++) {
                serviceList.push({
                    service_id: service_id[i],
                    selected_services: selectedServicesArray[i] || "", // safe fallback
                    service_completed: service_completed || 0
                });
            }
        }

        // ================================================
        // SEND NORMALIZED DATA TO SERVICE
        // ================================================
        const order = await orderService.addNewOrder({
            customer_id,
            employee_id,
            vehicle_id,
            active_order,
            order_hash: "Try",
            order_total_price,
            additional_request,
            additional_requests_completed,
            order_status,
            services: serviceList // ⬅ NEW FORMAT ALWAYS PASSED
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
// a Function for get all orders
async function getAllOrders(req, res, next) {
  const orders = await orderService.getAllOrders();

  if(!orders) {
      res.status(400).json({
      error: "Failed to get orders!"
    });
  } else {
      res.status(200).json({
      status: "success",
      data: orders
    });
  }
}
// export the functions
module.exports = {
    getCustomerBySearch,
    createOrder,
    getAllOrders
}