// Import the employee service 
const employeeService = require('../services/employee.service');
// Create the add employee controller
async function createEmployee(req, res, next) {
  // Check if employee email already exists in the database 
  const employeeExists = await employeeService.checkIfEmployeeExists(req.body.employee_email);
  // If employee exists, send a response to the client
  if (employeeExists) {
    res.status(400).json({
      error: "This email address is already associated with another employee!"
    });
  } else {
    try {
      const employeeData = req.body;
      // Create the employee
      const employee = await employeeService.createEmployee(employeeData);
      if (!employee) {
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
}

// create a controller to get all employees
async function getAllEmployees(req, res, next) {
  const employees = await employeeService.getAllEmployees();

  if(!employees) {
      res.status(400).json({
      error: "Failed to get employees!"
    });
  } else {
      res.status(200).json({
      status: "success",
      data: employees
    });
  }
}
// Route to get a single customer by ID
async function getEmployeeById(req, res) {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);

    if (!employee) {
      return res.status(404).json({ 
        status: "Fail",
        message: "Customer not found" 
      });
    } else {
      return res.status(200).json({
        status: "Success",
        data: employee
      })
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// a function to update Employee
async function editEmployee(req, res) {

  const { id } = req.params;
  const { 
    employee_first_name,
    employee_last_name,
    employee_phone,
    company_role_id,
    active_employee,
  } = req.body;

  try {

    const updateEmployee = await employeeService.editEmployee({
    employee_id: id,
    employee_first_name,
    employee_last_name,
    employee_phone,
    company_role_id,
    active_employee,
    });
    
    if (!updateEmployee) {
      return res.status(400).json({
        status: "failure",
        message: "Employee not updated"
      });
    }
      return res.status(200).json({
        status: "success",
        message: "Employee updated successfully"
      });
      
  } catch (error) {
    console.error("Error on updating customer:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
// To delete a single Employee by ID
async function deleteEmployeeById(req, res) {
  try {
    const result = await employeeService.deleteEmployeeById(req.params.id);

    if (!result || result.affectedRows === 0) {
      // 404 when nothing deleted
      return res.status(404).json({
        status: "Fail",
        message: "Employee not found or could not be deleted",
        affectedRows: result ? result.affectedRows : 0
      });
    }

    // success (200) — include a predictable JSON shape
    return res.status(200).json({
      status: "Success",
      message: "Employee deleted successfully!",
      affectedRows: result.affectedRows
    });

  } catch (err) {
    // Log server-side error for debugging
    console.error("Error in delete EmployeeById controller:", err);

    return res.status(500).json({
      status: "Error",
      message: err.message || "Internal server error"
    });
  }
}
// Export the createEmployee controller 
module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  editEmployee,
  deleteEmployeeById
};