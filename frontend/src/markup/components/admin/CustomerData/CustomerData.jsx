// import react and hooks
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
// import useAuth
import { useAuth } from '../../../../Contexts/AuthContext';
// import services.service
import Customer from '../../../../services/customer.service'
import Loader from '../../Loader/Loader';

function CustomerData() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  
  // To get the logged in employee token
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  useEffect(() => {
    if (!token) return; // stop if not logged in

    const fetchCustomer = async () => {
      try {
        const data = await Customer.getCustomerById(id, token);
        
        if (!data) {
          setApiError(true);
          setApiErrorMessage("Customer not found");
        } else {
          setCustomer(data.data);
        }
      } catch (err) {
        console.error(err);
        setApiError(true);
        setApiErrorMessage("Failed to fetch customer. Please try again later.");
      }
      setLoading(false)
    };
    
    fetchCustomer();
  }, [id, token]);

  return (
    <div>
      {loading && <Loader/>}
      {apiError ? (
        <div>{apiErrorMessage}</div>
      ) : !customer ? (
        <Loader />
      ) : (
        <>
          <h2>Customer: {customer.customer_first_name} {customer.customer_last_name}</h2>
          <p><span className=''>Email: </span>{customer.customer_email}</p>
          <p><span className=''>Phone</span> {customer.customer_phone_number}</p>
          <p><span className=''>Active Customer:</span>{customer.active_customer_status? (<>Yes</>): (<>No</>)}</p>
          <div>Edit</div>
        </>
      )}
      
    </div>
  );
}

export default CustomerData;
