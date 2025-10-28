// import customer service
const customerService = require("../services/customer.service");

// A function to handle creating a new customer
async function createCustomer(req, res) {
  try {
    const { customer_email } = req.body;

    // Check if customer already exists
    const customerExists = await customerService.checkIfCustomerExists(customer_email);
    if (customerExists) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    // Create new customer
    const customer = await customerService.createCustomer(req.body);

    if (!customer) {
      return res.status(500).json({ status: "failure", message: "Customer could not be added" });
    }

    return res.status(201).json({
      status: "success",
      message: "Customer added successfully",
      data: customer
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// export the controller functions
module.exports = {
  createCustomer
};