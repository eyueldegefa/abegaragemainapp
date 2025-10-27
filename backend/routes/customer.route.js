// import express
const express = require('express');
// import router
const router = express.Router();
// import customer controller
const customerController = require('../controllers/customer.controller');
// define route for creating a new customer
router.post('/api/customer', customerController.createCustomer);
// export the router
module.exports = router;