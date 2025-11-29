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

async function searchCustomers(query, token) {
  const response = await fetch(
    `${api_url}/api/customers/search?query=${encodeURIComponent(query)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    }
  );
  return await response.json();
}

async function editCustomer(id, formData, token) {
    const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(formData)
  };

  const response = await fetch(`${api_url}/api/customer/edit-customer/${id}`, requestOptions);

  if (!response.ok) {
    throw new Error(`Failed to update customer: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
// To delete customer by ID
const deleteCustomerById = async (id, token) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token
    }
  }
  const response = await fetch(`${api_url}/api/customer/delete-customer/${id}`, requestOptions );

  if (!response.status === 'Fail' || response.status === 'Error') {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to delete customer: ${response.status}`);
  }

  return response.json(); // Success response
};

const customerService = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    searchCustomers,
    editCustomer,
    deleteCustomerById
}

export default customerService;