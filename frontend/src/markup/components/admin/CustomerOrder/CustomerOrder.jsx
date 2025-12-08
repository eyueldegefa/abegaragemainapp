// import react and hooks
import React, { useState, useEffect } from 'react'
// import useAuth
import { useAuth } from '../../../../Contexts/AuthContext';
// import orderService
import orderService from '../../../../services/order.service';
import Loader from '../../Loader/Loader';
function CustomerOrder() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
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
                }
            }).catch((err) => {
              console.log(err);
            }).finally(() => {
              setLoading(false);
            });

    }, []);


  return (
     <>
     {loading && <Loader/>}
    {apiError ? (
        <section className="contact-section">
            <div className="auto-container">
                <div className="contact-title"> 
                    <h2 className="error">{apiErrorMessage}</h2>
                </div>
            </div>
        </section>
    ) : (
    <section className="row">
      <div className=" col-12">
          <h2>Orders of {orders.customer_first_name}</h2>
        <section>
            <div className=''>
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
        </section>
      </div>
    </section>
    )
  }
    </>
  )
}


export default CustomerOrder;