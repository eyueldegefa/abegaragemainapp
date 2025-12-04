import React from 'react'
// Import the auth hook 
import { useAuth } from "../../../Contexts/AuthContext";
// import AddCustomerForm from '../../components/admin/AddCustomerForm/AddCustomerForm'
import AdminMenu from '../../components/admin/adminMenu/AdminMenu'
import EditCustomerForm from '../../components/admin/EditCustomerForm/EditCustomerForm';

function EditCustomer() {
    // Destructure the auth hook 
    const { isLogged, isAdmin } = useAuth();
  
  if (isLogged) {
    if (isAdmin) {
  return (
    <div className=''>
      <div className='row mt-5 pt-5'>
        <div className='col-md-4 mt-5'>
          {/* Admin Menu */}
          <AdminMenu />
        </div>
        <div className='col-md-8'>
          {/* Add Customer Form */}
          <EditCustomerForm />
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

export default EditCustomer;