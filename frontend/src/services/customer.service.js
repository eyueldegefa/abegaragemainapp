// Import from the env 
const api_url = "http://localhost:8000"

// Function to create a new customer
const createCustomer = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken
    },
    body: JSON.stringify(formData)
  };
  const response = await fetch(`${api_url}/api/customer`, requestOptions);
  return response;
}

// function to get all customers
const getAllCustomers = async (token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/customers`, requestOptions);
  return response;
}

const getCustomerById = async (id, token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };

  const response = await fetch(`${api_url}/api/customer/${id}`, requestOptions);

  if (!response.ok) {
    throw new Error(`Failed to fetch customer: ${response.status}`);
  }

  const data = await response.json();
  return data;
};


const customerService = {
    createCustomer,
    getAllCustomers,
    getCustomerById
}

export default customerService;