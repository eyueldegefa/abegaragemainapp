// import the customer.service
const customerService = require('../services/customer.service');

async function createCustomer(req, res, next) {
  // Check if employee email already exists in the database 
//   const customerExists = await Service.checkIfEmployeeExists(req.body.employee_email);
  // If employee exists, send a response to the client
//   if (employeeExists) {
//     res.status(400).json({
//       error: "This email address is already associated with another employee!"
//     });
//   } else {
    try {
      const customerData = req.body;
      // Create the employee
      console.log(customerData);
      
      const customer = await customerService.createCustomer(customerData);
      if (!customer) {
        res.status(400).json({
          error: "Failed to add the employee!"
        });
      } else {
        res.status(200).json({
          status: "true",
        });
      }
    } catch (error) {
      console.log(err);
      res.status(400).json({
        error: "Something went wrong!"
      });
    }
  }
// }

module.exports = {
  createCustomer
};