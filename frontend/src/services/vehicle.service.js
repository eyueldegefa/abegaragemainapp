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
  const response = await fetch(`${api_url}/api/vehicles/${customer_id}`, requestOptions);
   // ✅ Parse JSON directly before returning
  const data = await response.json();
  return data;
}
// Function to get vehicles by customer id
async function getVehicleByVehicleId(vehicle_id, token) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };
  const response = await fetch(`${api_url}/api/vehicle/${vehicle_id}`, requestOptions);
   // ✅ Parse JSON directly before returning
  const data = await response.json();
  return data;
}

async function updateVehicleById(vehicle_id, formData, token) {
    const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(formData)
  };

  const response = await fetch(`${api_url}/api/vehicle/update-vehicle/${vehicle_id}`, requestOptions);

  if (!response.ok) {
    throw new Error(`Failed to update vehicle: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
// To delete vehicle by ID
const deleteVehicleById = async (id, token) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token
    }
  }
  const response = await fetch(`${api_url}/api/vehicle/delete-vehicle/${id}`, requestOptions );

  if (!response.status === 'Fail' || response.status === 'Error') {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to delete vehicle: ${response.status}`);
  }

  return response.json(); // Success response
};
// Export the functions
const vehicleService = {
  addNewVehicle,
  getVehiclesByCustomerId,
  getVehicleByVehicleId,
  updateVehicleById,
  deleteVehicleById
}

export default vehicleService;