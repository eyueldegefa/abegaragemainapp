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
      return res.status(500).json({ 
        status: "failure", 
        message: "Customer could not be added" 
      });
    } else {
        return res.status(201).json({
          status: "success",
          message: "Customer added successfully",
          data: customer
        });
    }
  } catch (error) {
    console.error("Error creating customer:", error);
    return res.status(500).json({ 
      message: "Internal server error" 
    });
  }
}

// A function to get all customers
async function getAllCustomers(req, res) {
  try {
    const customers = await customerService.getAllCustomers();
    if (!customers) {
      return res.status(500).json({ 
        status: "failure", 
        message: "Could not retrieve customers" 
      });
    } else {
        return res.status(200).json({
          status: "success",
          data: customers
        });
    }
  } catch (error) {
    console.error("Error fetching customers:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
// Route to get a single customer by ID
async function getCustomerById(req, res) {
  try {
      // console.log("➡️ Customer ID received:", req.params.id);
    const customer = await customerService.getCustomerById(req.params.id);
    // console.log("✅ Customer from DB:", customer);

    if (!customer) {
      return res.status(404).json({ 
        status: "Fail",
        message: "Customer not found" 
      });
    } else {
      return res.status(200).json({
        status: "Success",
        data: customer
      })
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// export the controller functions
module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById
};