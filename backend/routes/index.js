// Import the express module 
const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();
// Import the install router 
const installRouter = require('./install.route');
// Import the employee routes 
const employeeRouter = require('./employee.route');
// Import the login routes 
const loginRoutes = require("./login.route");
// import the customer routes
const customerRoutes = require("./customer.route");
// import the service routes
const serviceRoutes = require('./service.route');
// import the vehicle routes
const vehicleRoutes = require('./vehicle.route');
// add the service routes to the main router
router.use(serviceRoutes);
// Add the install router to the main router 
router.use(installRouter);
// Add the employee routes to the main router 
router.use(employeeRouter);
// Add the login routes to the main router
router.use(loginRoutes);
// Add the customer routes to the main router
router.use(customerRoutes);
// add the vehicle routes to the main router
router.use(vehicleRoutes);
// Export the router
module.exports = router; 