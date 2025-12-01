// import react and hooks
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router";
import { Table } from 'react-bootstrap';
// Import the date-fns library 
// import { format } from 'date-fns';
// import useAuth
import { useAuth } from '../../../../Contexts/AuthContext';
// import orderService
import orderService from '../../../../services/order.service';
function ViewOrder() {
    const navigate = useNavigate();
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
                  setOrders(data.data[0])
                  console.log(data.data[0]);
                }
            }).catch((err) => {
              console.log(err);
            })

    }, []);

      // Navigate to the Edit customer page
  const handleEditClick = (id) => {
    navigate(`/admin/edit-order/${id}`);
  }
  // View order details
  const handleBackClick = () => {
    navigate(`/admin/orders`);
  }

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
          <h2>Orders of: {orders.customer_first_name}</h2>
        </div>
        <section>
            <div className='shadow p-4'>
                <h2><small>Car Owner: </small> 
                    <small className='text-secondary'>{orders.customer_first_name} {orders.customer_last_name}</small>
                </h2>
                <h4><small>Email: </small> 
                    <small className='text-secondary'>{orders.customer_email}</small>
                </h4>
                <h4>
                    <small>Phone: </small>
                    <small className='text-secondary'>{orders.customer_phone_number}</small>
                </h4>
            </div>
            <div className='shadow p-4 mt-3'>
                <h2>Vehicle Info </h2>
                <h3>
                    <small>{orders.vehicle_make} {orders.vehicle_model}</small>
                </h3>
                <h4>
                    <small>Model: </small>
                    <small className='text-secondary'> 
                        {orders.vehicle_year}
                    </small>
                </h4>
                <h4>
                    <small>Tag: </small>
                    <small className='text-secondary'> 
                        {orders.vehicle_tag}
                    </small>
                </h4>
            </div>
            <div className='shadow p-4 mt-3'>
                <h2>Order Info</h2>
                <h4><small>Order Date: </small> 
                    <small className='text-secondary'>
                 {/* {format(new Date(orders.order_date), 'MM - dd - yyyy | kk:mm')} */}
                    </small>
                </h4>
                <h4><small>Order Status: </small> 
                    <small className='text-secondary'>
                       {orders.order_status}
                    </small>
                </h4>
            </div>
            <div className="edit-delete-icons mt-3"  >
                <button className="theme-btn btn-style-one m-1"
                onClick={()=>handleEditClick(orders.order_id)}
                  >Edit</button>
                <button className="theme-btn btn-style-one m-1"
                onClick={()=>handleBackClick(orders)}
                  >Back</button>
            </div>
        </section>
      </div>
    </section>
    )
  }
    </>
  )
}


export default ViewOrder