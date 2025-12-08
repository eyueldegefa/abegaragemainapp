import React from 'react'
// Import the auth hook 
import { useAuth } from "../../../Contexts/AuthContext";
import LoginForm from '../../components/LoginForm/LoginForm'
import Unauthorized from "../unauthorized";
// import AddCustomerForm component
import AddCustomerForm from '../../components/admin/AddCustomerForm/AddCustomerForm'
import AdminMenu from '../../components/admin/adminMenu/AdminMenu'

function AddCustomer() {
    // Destructure the auth hook 
    const { isLogged, isAdmin, isManager } = useAuth();
  
    if (isLogged) {
      if (isAdmin || isManager) {
  return (
    <div className=''>
      <div className='container row mt-5 pt-5'>
        <div className='col-md-4 mt-5'>
          {/* Admin Menu */}
          <AdminMenu />
        </div>
        <div className='col-md-8'>
          {/* Add Customer Form */}
          <AddCustomerForm />
        </div>
      </div>
    </div>
  )
} else {
        return (
          <>
            <Unauthorized />
          </>
        );
      }
    } else {
      return (
        <div>
          <LoginForm />
        </div>
      );
    }

}

export default AddCustomer;