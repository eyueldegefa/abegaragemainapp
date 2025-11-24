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
// ----get all orders
const getAllOrders = async (token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
  };
  const response = await fetch(`${api_url}/api/orders`, requestOptions);
  return response;
}
// export function
const orderService = {
    createOrder,
    getAllOrders
}

export default orderService;