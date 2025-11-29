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
// import confirm modal component
import ConfirmModal from '../../ConfirmModal/ConfirmModal';

function CustomerList() {
  const navigate = useNavigate();
  // state for modal
  const [modalVisible, setModalVisible] = useState(false);
    // Create all the states we need to store the data
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCustomerName, setSelectedCustomerName] = useState(null);
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
        console.log(data.data);
      }
    }).catch((err) => {
      console.log(err);
    })
  }, []);

// Navigate to the detail page
  const handleClick = (id) => {
    navigate(`/admin/customer/${id}`); 
  }
// Navigate to the Edit customer page
  const handleEditClick = (id) => {
    navigate(`/admin/edit-customer/${id}`)
  }
// To handle Delete Click
  const handleDeleteClick = (customer) => {
    setSelectedCustomerId(customer.customer_id);
    setSelectedCustomerName(customer.customer_first_name)
    setModalVisible(true); // show modal instead of window.confirm
  };

  const confirmDelete = async () => {
    setModalVisible(false);

    try {
      const res = await customerService.deleteCustomerById(selectedCustomerId, token);

      if (res.status === "Fail" || res.status === "Error") {
        setApiError(true);
        setApiErrorMessage(res.message || "Could not delete customer");
        return;
      }

      // remove customer from state
      setCustomers(prev => prev.filter(c => c.customer_id !== selectedCustomerId));
      setApiError(false);
      setApiErrorMessage("");

    } catch (err) {
      console.error(err);
      setApiError(true);
      setApiErrorMessage("Something went wrong. Please try again later.");
    }
  };

  const cancelDelete = () => {
    setModalVisible(false);
  };




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
        {modalVisible && (
        <ConfirmModal
          message={`Are you sure you want to delete customer: ${selectedCustomerName}?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
        )}
        <Table striped bordered responsive hover className="customer-table">
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
                    <td onClick={() => handleClick(customer.customer_id)}>{customer.customer_id}</td>
                    <td onClick={() => handleClick(customer.customer_id)}>{customer.customer_first_name}</td>
                    <td onClick={() => handleClick(customer.customer_id)}>{customer.customer_last_name}</td>
                    <td onClick={() => handleClick(customer.customer_id)}>{customer.customer_email}</td>
                    <td onClick={() => handleClick(customer.customer_id)}>{customer.customer_phone_number}</td>
                    <td onClick={() => handleClick(customer.customer_id)}>{format(new Date(customer.customer_added_date), 'MM - dd - yyyy | kk:mm')}</td>
                    <td onClick={() => handleClick(customer.customer_id)}>{customer.active_customer_status ? "Yes" : "No"}</td>
                    <td>
                        <div className="edit-delete-icons" >
                          <span onClick={()=>handleEditClick(customer.customer_id)}>edit </span>|
                          <span onClick={()=>handleDeleteClick(customer)}
                            >delete</span>
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