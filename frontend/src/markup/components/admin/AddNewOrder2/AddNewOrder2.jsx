// Import the necessary components 
import React, { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
// Import the auth hook  
import { useAuth } from "../../../../Contexts/AuthContext"; 
// import the css file
import '../EmployeeList/EmployeeList.css';
// Import the getAllEmployees function  
import customerService from "../../../../services/customer.service";

// Create the EmployeesList component 
const AddNewOrder2 = () => {
  // Create all the states we need to store the data
  // Create the employees state to store the employees data  
  const [results, setResults] = useState([]);
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
    // Call the getAllEmployees function 
    const allCustomers = customerService.searchCustomers(token);
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
        setResults(data.data)
        console.log(results);
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
            </div >
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">
              </div >
              < Table striped bordered hover responsive className="employee-table" >
                <thead>
                  <tr>
                  </tr>
                </thead>
                <tbody>
                  {results.map((customer) => (
                    <tr key={customer.customer_id}>
                      <td>{customer.customer_first_name}</td>
                      <td>{customer.customer_last_name}</td>
                      <td>{customer.customer_email}</td>
                      <td>{customer.customer_phone}</td>
                      <td>
                        <div className="edit-delete-icons">
                          View Detail
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table >
            </div >
          </section >
        </>
      )}
    </>
  );
}

// Export the EmployeesList component 
export default AddNewOrder2;
