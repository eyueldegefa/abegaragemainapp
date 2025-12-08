import React from 'react'
// Import the auth hook 
import { useAuth } from "../../../Contexts/AuthContext";
import AdminMenu from '../../components/admin/adminMenu/AdminMenu'
// import EditEmployeeForm from '../../components/admin/EditEmployeeForm/EditEmployeeForm'
import UpdateOrder from '../../components/admin/UpdateOrder/UpdateOrder'

function EditOrder() {
  // Destructure the auth hook 
  const { isLogged, isAdmin } = useAuth();
      
  if (isLogged) {
    if (isAdmin) {
  return (
    <div className=''>
      <div className='row mt-5 pt-5'>
        <div className='col-md-4'>
          {/* Admin Menu */}
          <AdminMenu />
        </div>
        <div className='col-md-8'>
          {/* Update Order Form */}
          <UpdateOrder />
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

export default EditOrder