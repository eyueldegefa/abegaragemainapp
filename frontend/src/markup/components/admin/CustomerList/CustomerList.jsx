import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
// import table and button from react-bootstrap
import { Table, Button } from 'react-bootstrap';
// import date-fns to format date
import { format } from 'date-fns';
// import css file
import './CustomerList.css';
// import useAuth to get logged in employee token
import { useAuth } from '../../../../Contexts/AuthContext';
// import customerService to get all customers
import customerService from '../../../../services/customer.service';

function CustomerList() {
  const navigate = useNavigate();
    // Create all the states we need to store the data
  // Create the customers state to store the customers data  
  const [customers, setCustomers] = useState([]);
    // A state to serve as a flag to show the error message
    const [apiError, setApiError] = useState(false);
    // A state to store the error message
    const [apiErrorMessage, setApiErrorMessage] = useState(null);
    // To get the logged in employee token
    const { employee } = useAuth();
    let token = null; // To store the token
    if (employee) {
      token = employee.employee_token;
    }
    
    useEffect(() => {
    // Call the getAllCustomers function
    const allCustomers = customerService.getAllCustomers(token);
    allCustomers.then((res) => {
      if (!res.ok) {
        console.log(res.status);
        setApiError(true);
        if (res.status === 401) {
          setApiErrorMessage("Please login again");
        } else if (res.status === 403) {
          setApiErrorMessage("You are not authorized to view this page");
        } else {
          setApiErrorMessage("Please try again later");
        }
        }
        return res.json()
    }).then((data) => {
      if (data.data.length !== 0) {
        setCustomers(data.data)
      }
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  const handleClick = (id) => {
    navigate(`/admin/customer/${id}`); // navigate to the detail page
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
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Customers List</h2>
        </div>
        <Table striped bordered hover className="customer-table">
          <thead>
            <tr>
                <th>Customer ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Added Date</th>
                <th>Active Status</th>
                <th>Edit/Delete</th>
            </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.customer_id}>
                    <td>{customer.customer_id}</td>
                    <td 
                      onClick={() => handleClick(customer.customer_id)} 
                      style={{cursor: "pointer"}}
                    >{customer.customer_first_name}</td>
                    <td>{customer.customer_last_name}</td>
                    <td>{customer.customer_email}</td>
                    <td>{customer.customer_phone_number}</td>
                    <td>{format(new Date(customer.customer_added_date), 'MM - dd - yyyy | kk:mm')}</td>
                    <td>{customer.active_customer_status ? "Yes" : "No"}</td>
                    <td>
                        <div className="edit-delete-icons">
                          edit | delete
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
        </Table>
      </div>
    </section>
    )}
    </>
  )
}

export default CustomerList