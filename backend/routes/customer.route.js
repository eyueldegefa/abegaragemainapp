// import express
const express = require('express');
// import router
const router = express.Router();
// import customer controller
const customerController = require('../controllers/customer.controller');
// define route for creating a new customer
router.post("/api/customer", customerController.createCustomer);
// define route for getting all customers
router.get("/api/customers", customerController.getAllCustomers);
// define route to get customer by ID
router.get("/api/customer/:id", customerController.getCustomerById);
// define route to search customers
router.get('/api/customers/search', customerController.searchCustomers);

// export the router
module.exports = router;