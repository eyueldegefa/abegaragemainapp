// Import api_url
const api_url = "http://localhost:8000"
// function to get all customers
const getAllServices = async (token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/services`, requestOptions);
  return response;
}
// Function to create a new customer
const addService = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken
    },
    body: JSON.stringify(formData)
  };
  const response = await fetch(`${api_url}/api/services`, requestOptions);
  return response;
}
const getServiceById = async (id, token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };

  const response = await fetch(`${api_url}/api/service/${id}`, requestOptions);

  if (!response.ok) {
    throw new Error(`Failed to fetch service: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
// Function to edit service by ID
async function editService(id, formData, token) {
    const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(formData)
  };

  const response = await fetch(`${api_url}/api/service/edit-service/${id}`, requestOptions);

  if (!response.ok) {
    throw new Error(`Failed to update service: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
// To delete customer by ID
const deleteServiceById = async (id, token) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token
    }
  }
  const response = await fetch(`${api_url}/api/service/delete-service/${id}`, requestOptions );

  if (!response.status === 'Fail' || response.status === 'Error') {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to delete service: ${response.status}`);
  }

  return response.json(); // Success response
};
// export the functions
const servicesService ={
    getAllServices,
    addService,
    getServiceById,
    editService,
    deleteServiceById
}

export default servicesService;