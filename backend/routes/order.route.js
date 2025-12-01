// import express 
const express = require('express');
// import router
const router = express.Router();
// import order controller
const orderController = require('../controllers/order.controller');
// add route to get customer by search
router.get('/api/order/customer/search', orderController.getCustomerBySearch);
// add route to add new order
router.post('/api/order', orderController.createOrder);
// get all orders
router.get('/api/orders', orderController.getAllOrders);
// get order by ID
router.get('/api/order/:id', orderController.getOrderById);
//  define route to update Order by ID
router.put('/api/order/update-order/:id', orderController.updateOrderById);
// export router
module.exports = router;