// import express
const express = require('express');
// import router
const router = express.Router();
// Import the auth middleware
const authMiddleware = require('../middlewares/auth.middleware');
// import customer controller
const customerController = require('../controllers/customer.controller');
// define route for creating a new customer
router.post("/api/customer",[authMiddleware.verifyToken, authMiddleware.isAdminOrManager], customerController.createCustomer);
// define route for getting all customers
router.get("/api/customers",[authMiddleware.verifyToken, authMiddleware.isAdminOrManager], customerController.getAllCustomers);
// define route to get customer by ID
router.get("/api/customer/:id",[authMiddleware.verifyToken, authMiddleware.isAdminOrManager], customerController.getCustomerById);
// define route to search customers
router.get('/api/customers/search',[authMiddleware.verifyToken, authMiddleware.isAdminOrManager], customerController.searchCustomers);
//  define route to update customer
router.put('/api/customer/edit-customer/:id',[authMiddleware.verifyToken, authMiddleware.isAdminOrManager], customerController.editCustomer);
// define route to delete customer by ID
router.delete("/api/customer/delete-customer/:id",[authMiddleware.verifyToken, authMiddleware.isAdmin], customerController.deleteCustomerById);
// export the router
module.exports = router;