// Import the express module  
const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();
// Import the auth middleware
const authMiddleware = require('../middlewares/auth.middleware');
// import the customerController
const customerController = require('../controllers/customer.controller');
// create a route to handle the request
router.post("/api/customer",[authMiddleware.verifyToken, authMiddleware.isAdmin] , customerController.createCustomer);
// export the router
module.exports = router;