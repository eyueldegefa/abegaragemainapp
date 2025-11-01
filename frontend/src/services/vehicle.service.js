// Import from the env 
const api_url = "http://localhost:8000"

// Function to create a new customer
const addNewVehicle = async (formData, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(formData)
  };
  const response = await fetch(`${api_url}/api/vehicle`, requestOptions);
  return response;
}
// Function to get vehicles by customer id
async function getVehiclesByCustomerId(customer_id, token) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/vehicle/${customer_id}`, requestOptions);
   // ✅ Parse JSON directly before returning
  const data = await response.json();
  return data;
}

// Export the functions
const vehicleService = {
  addNewVehicle,
  getVehiclesByCustomerId
}
export default vehicleService;