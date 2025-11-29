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
//  define route to update customer
router.put('/api/customer/edit-customer/:id', customerController.editCustomer);
// define route to delete customer by ID
router.delete("/api/customer/delete-customer/:id", customerController.deleteCustomerById);
// export the router
module.exports = router;