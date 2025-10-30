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
// export the functions
const servicesService ={
    getAllServices,
    addService
}

export default servicesService;