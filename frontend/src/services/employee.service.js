// Import from the env 
const api_url = "http://localhost:8000"

// A function to send post request to create a new employee 
const createEmployee = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken
     },
    body: JSON.stringify(formData)
  };
  const response = await fetch(`${api_url}/api/employee`, requestOptions);
  return response;
}
// Function to get all employees
const getAllEmployees = async (token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/employees`, requestOptions);
  return response;
}
// get employee by ID
const getEmployeeById = async (id, token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };

  const response = await fetch(`${api_url}/api/employee/${id}`, requestOptions);

  if (!response.ok) {
    throw new Error(`Failed to fetch employee: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
// -----
async function editEmployee(id, formData, token) {
    const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(formData)
  };

  const response = await fetch(`${api_url}/api/employee/edit-employee/${id}`, requestOptions);

  if (!response.ok) {
    throw new Error(`Failed to update employee: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
// To delete Employee by ID
const deleteEmployeeById = async (id, token) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token
    }
  }
  const response = await fetch(`${api_url}/api/employee/delete-employee/${id}`, requestOptions );

  if (!response.status === 'Fail' || response.status === 'Error') {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to delete employee: ${response.status}`);
  }

  return response.json(); // Success response
};
// Export all the functions 
const employeeService = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  editEmployee,
  deleteEmployeeById
}
export default employeeService; 