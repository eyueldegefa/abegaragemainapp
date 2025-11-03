// import express 
const express = require('express');
// import router
const router = express.Router();
// import order controller
const orderController = require('../controllers/order.controller');
// add route to get customer by search
router.get('/api/order/customer/search', orderController.getCustomerBySearch);
// export router
module.exports = router;