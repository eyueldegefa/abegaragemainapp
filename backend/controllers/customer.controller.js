// import customer service
const customerService = require("../services/customer.service");
// A function to handle creating a new customer
async function createCustomer(req, res) {
  // check if the customer exists
  const customerExists = await customerService.checkIfCustomerExists(req.body.customer_email);
  if (customerExists) {
    return res.status(400).json({ message: "Customer already exists" });
  } else {
      try {
          const customerData = req.body;
          const customer = await customerService.createCustomer(customerData);
      // If the employee is added successfully, return success response. Otherwise, return failure response 
      console.log(customer);
      if (!customer) {
        // Send a failure response back to the client
        const response = {
          status: 'failure',
          message: 'Customer could not be added',
        };
        res.status(403).json(response);
      } else {
        // Send a success response back to the client
        const response = {
          status: 'success',
          message: 'Customer added successfully',
        };
        res.status(200).json(response);
      }
      } catch (error) {
          console.error("Error creating customer:", error);
          return res.status(500).json({ message: "Internal server error" });
      }
  }
}
// export the controller functions
module.exports = {
  createCustomer
};

