// import express 
const express = require('express');
// import router
const router = express.Router();
// import auth middleware
const authMiddleware = require('../middlewares/auth.middleware');
// import order controller
const orderController = require('../controllers/order.controller');
// add route to get customer by search
router.get('/api/order/customer/search',[authMiddleware.verifyToken, authMiddleware.isAdminOrManager], orderController.getCustomerBySearch);
// add route to add new order
router.post('/api/order',[authMiddleware.verifyToken, authMiddleware.isAdminOrManager], orderController.createOrder);
// get all orders
router.get('/api/orders',[authMiddleware.verifyToken, authMiddleware.isAdminOrManager], orderController.getAllOrders);
// get order by ID
router.get('/api/order/:id',[authMiddleware.verifyToken, authMiddleware.isAdminOrManager], orderController.getOrderById);
//  define route to update Order by ID
router.put('/api/order/update-order/:id',[authMiddleware.verifyToken, authMiddleware.isAdminOrManager], orderController.updateOrderById);
// export router
module.exports = router;