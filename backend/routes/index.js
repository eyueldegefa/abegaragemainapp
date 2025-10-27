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
// Add the install router to the main router 
router.use(installRouter);
// Add the employee routes to the main router 
router.use(employeeRouter);
// Add the login routes to the main router
router.use(loginRoutes);
// Export the router
module.exports = router; 