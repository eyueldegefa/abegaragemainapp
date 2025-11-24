// import react and hooks
import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap';
// Import the date-fns library 
import { format } from 'date-fns';
// import useAuth
import { useAuth } from '../../../../Contexts/AuthContext';
// import orderService
import orderService from '../../../../services/order.service';

function OrdersList() {
    const [orders, setOrders] = useState([])
    const [apiError, setApiError] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState(null);
    // To get the logged in employee token
    const { employee } = useAuth();
    let token = null; // To store the token
    if (employee) {
      token = employee.employee_token;
    }

    useEffect(()=>{
        const allOrders = orderService.getAllOrders(token);
        allOrders.then((res)=>{
            if(!res.ok){
                console.log(res.status);
                setApiError(true);
                if (res.status === 401) {
                  setApiErrorMessage("Please login again");
                } else if (res.status === 403) {
                  setApiErrorMessage("You are not authorized to view this page");
                } else {
                  setApiErrorMessage("Please try ffs again later");
                }
                }
                return res.json()
            }).then((data) => {
                if (data.data.length !== 0) {
                  setOrders(data.data)
                  console.log(data.data);
                }
            }).catch((err) => {
              console.log(err);
            })

    }, []);

  return (
     <>
    {apiError ? (
        <section className="contact-section">
            <div className="auto-container">
                <div className="contact-title"> 
                    <h2 className="error">{apiErrorMessage}</h2>
                </div>
            </div>
        </section>
    ) : (
    <section className="contact-section row">
      <div className="auto-container col-12">
        <div className="contact-title">
          <h2>Orders</h2>
        </div>
        <section>
            <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Order Date</th>
                    <th>Received by</th>
                    <th>Order status</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                    <tr key={order.order_id}>
                        <td>{order.order_id}</td>
                        <td>{order.customer_first_name} {order.customer_last_name}<br/>{order.customer_email}<br/>{order.customer_phone_number}</td>
                        <td>{order.vehicle_make}<br/>{order.vehicle_year} <br/>{order.vehicle_tag}</td>
                        <td>{format(new Date(order.order_date), 'MM - dd - yyyy')}</td>
                        <td></td>
                        <td>Pending</td>
                        <td>Edit/view</td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </section>
      </div>
    </section>
    )
  }
    </>
  )
}

export default OrdersList