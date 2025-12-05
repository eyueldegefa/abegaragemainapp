// Import the express module  
const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();
// Import the auth middleware
const authMiddleware = require('../middlewares/auth.middleware');
// Import the employee controller
const employeeController = require('../controllers/employee.controller');
// Create a route to handle the add employee request on post
router.post("/api/employee",[authMiddleware.verifyToken, authMiddleware.isAdmin] , employeeController.createEmployee);
// create a route to get all employees
router.get("/api/employees",[authMiddleware.verifyToken, authMiddleware.isAdminOrManager], employeeController.getAllEmployees);
// define route to get Employee by ID
router.get("/api/employee/:id",[authMiddleware.verifyToken, authMiddleware.isAdminOrManager], employeeController.getEmployeeById);
//  define route to update Employee
router.put('/api/employee/edit-employee/:id', [authMiddleware.verifyToken, authMiddleware.isAdmin], employeeController.editEmployee);
// define route to delete employee by ID
router.delete("/api/employee/delete-employee/:id", [authMiddleware.verifyToken, authMiddleware.isAdmin], employeeController.deleteEmployeeById);
// Export the router
module.exports = router;