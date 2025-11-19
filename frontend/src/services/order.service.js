const api_url = "http://localhost:8000"

// Function to create a new customer
const createOrder = async (formData, token) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(formData)
  };
  const response = await fetch(`${api_url}/api/order`, requestOptions);
  return response;
}
// export function
const orderService = {
    createOrder
}

export default orderService;