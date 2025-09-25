// Import the express module 
const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();
// Import the install router 
const installRouter = require('./install.route');
// Add the install router to the main router 
router.use(installRouter);
// Import the employee router
const employeeRouter = require('./employee.route');
// Add the employee router to the main router 
router.use(employeeRouter);
// Export the router
module.exports = router; 