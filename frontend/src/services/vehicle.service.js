// Import from the env 
const api_url = "http://localhost:8000"

// Function to create a new customer
const addNewVehicle = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': loggedInEmployeeToken
    },
    body: JSON.stringify(formData)
  };
  const response = await fetch(`${api_url}/api/vehicle`, requestOptions);
  return response;
}
// Export the functions
const vehicleService = {
  addNewVehicle
}
export default vehicleService;