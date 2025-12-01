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
// get order by ID
const getOrderById = async (id, token) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  };

  const response = await fetch(`${api_url}/api/order/${id}`, requestOptions);
  console.log(response);
  

  if (!response.ok) {
    throw new Error(`Failed to fetch order: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);
  
  return data;
};
// ----update order by ID
async function updateOrderById(id, formData, token) {
    const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    },
    body: JSON.stringify(formData)
  };

  const response = await fetch(`${api_url}/api/order/update-order/${id}`, requestOptions);

  if (!response.ok) {
    throw new Error(`Failed to update order: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
// export function
const orderService = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderById
}

export default orderService;