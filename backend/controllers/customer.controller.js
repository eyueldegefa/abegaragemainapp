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
// a function to get customer by search
async function searchCustomers(req, res) {
  try {
    const { query } = req.query;

    console.log("🔍 Received search query:", query);

    if (!query || query.trim().length < 2) {
      return res.status(400).json({
        status: "Fail",
        message: "Please enter at least 2 characters to search",
      });
    }

    const customers = await customerService.searchCustomers(query);
    console.log("📦 Customers returned:", customers);

    // 🚀 customers is always an array
    return res.status(200).json({
      status: "Success",
      data: customers, // FULL ARRAY
    });

  } catch (error) {
    console.error("❌ ERROR in searchCustomers:", error);
    return res.status(500).json({
      status: "Fail",
      message: "Server error while searching customers",
    });
  }
}
// a function to update customer
async function editCustomer(req, res) {

  const { id } = req.params;
  const { 
    customer_first_name, 
    customer_last_name, 
    customer_phone_number, 
    active_customer_status 
  } = req.body;

  try {

    const updateCustomer = await customerService.editCustomer({
      customer_id: id,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status
    });
    
    if (!updateCustomer) {
      return res.status(400).json({
        status: "failure",
        message: "Customer not updated"
      });
    }
      return res.status(200).json({
        status: "success",
        message: "Customer updated successfully"
      });
      
  } catch (error) {
    console.error("Error on updating customer:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
// To delete a single customer by ID
async function deleteCustomerById(req, res) {
  try {
    const result = await customerService.deleteCustomerById(req.params.id);

    if (!result || result.affectedRows === 0) {
      // 404 when nothing deleted
      return res.status(404).json({
        status: "Fail",
        message: "Customer not found or could not be deleted",
        affectedRows: result ? result.affectedRows : 0
      });
    }

    // success (200) — include a predictable JSON shape
    return res.status(200).json({
      status: "Success",
      message: "Customer deleted successfully!",
      affectedRows: result.affectedRows
    });

  } catch (err) {
    // Log server-side error for debugging
    console.error("Error in deleteCustomerById controller:", err);

    return res.status(500).json({
      status: "Error",
      message: err.message || "Internal server error"
    });
  }
}


// export the controller functions
module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  searchCustomers,
  editCustomer,
  deleteCustomerById
};