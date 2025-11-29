// Import the necessary components 
import React, { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from "react-router";
// Import the auth hook  
import { useAuth } from "../../../../Contexts/AuthContext";
// Import the date-fns library 
import { format } from 'date-fns'; // To properly format the date on the table 
// import the css file
import './EmployeeList.css';
// Import the getAllEmployees function  
import employeeService from "../../../../services/employee.service";
// import confirm modal component
import ConfirmModal from '../../ConfirmModal/ConfirmModal';

// Create the EmployeesList component 
const EmployeesList = () => {

  const navigate = useNavigate();
    // state for modal
    const [modalVisible, setModalVisible] = useState(false);
      // Create all the states we need to store the data
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [selectedEmployeeName, setSelectedEmployeeName] = useState(null);
  // Create all the states we need to store the data
  // Create the employees state to store the employees data  
  const [employees, setEmployees] = useState([]);
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
    const allEmployees = employeeService.getAllEmployees(token);
    allEmployees.then((res) => {
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
      console.log(data);
      
      if (data.data.length !== 0) {
        setEmployees(data.data)
      }

    }).catch((err) => {

      console.log(err);
    })
  }, []);

  // Navigate to the Edit customer page
  const handleEditClick = (id) => {
    navigate(`/admin/edit-employee/${id}`)
  }

  // Navigate to the detail page
    const handleClick = (id) => {
      navigate(`/admin/customer/${id}`); 
    }

  // To handle Delete Click
    const handleDeleteClick = (employee) => {
      setSelectedEmployeeId(employee.employee_id);
      setSelectedEmployeeName(employee.employee_first_name)
      setModalVisible(true); // show modal instead of window.confirm
    };
  
    const confirmDelete = async () => {
      setModalVisible(false);
  
      try {
        const res = await employeeService.deleteEmployeeById(selectedEmployeeId, token);
  
        if (res.status === "Fail" || res.status === "Error") {
          setApiError(true);
          setApiErrorMessage(res.message || "Could not delete customer");
          return;
        }
  
        // remove customer from state
        setEmployees(prev => prev.filter(e => e.employee_id !== selectedEmployeeId));
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
            </div >
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">
                <h2>Employees</h2 >
              </div >
              {modalVisible && (
              <ConfirmModal
                message={`Are you sure you want to delete Employee: ${selectedEmployeeName}?`}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
              />
              )}
              < Table striped bordered hover responsive className="employee-table" >
                <thead>
                  <tr>
                    <th>Active</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Added Date</th>
                    <th>Role</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.employee_id}>
                      <td onClick={()=> handleClick(employee.employee_id)}>
                        {employee.active_employee ? "Yes" : "No"}</td>
                      <td onClick={()=> handleClick(employee.employee_id)}>
                        {employee.employee_first_name}</td>
                      <td onClick={()=> handleClick(employee.employee_id)}>
                        {employee.employee_last_name}</td>
                      <td onClick={()=> handleClick(employee.employee_id)}>
                        {employee.employee_email}</td>
                      <td onClick={()=> handleClick(employee.employee_id)}>
                        {employee.employee_phone}</td>
                      <td onClick={()=> handleClick(employee.employee_id)}>
                        {format(new Date(employee.added_date), 'MM - dd - yyyy | kk:mm')}</td>
                      <td onClick={()=> handleClick(employee.employee_id)}>
                        {employee.company_role_name}</td>
                      <td>
                        <div className="edit-delete-icons"  >
                          <span onClick={()=>handleEditClick(employee.employee_id)}
                            >edit </span>|
                          <span onClick={()=>handleDeleteClick(employee)}
                            >delete</span>
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
export default EmployeesList;