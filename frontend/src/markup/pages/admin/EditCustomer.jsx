import React from 'react'
// import AddCustomerForm from '../../components/admin/AddCustomerForm/AddCustomerForm'
import AdminMenu from '../../components/admin/adminMenu/AdminMenu'
import EditCustomerForm from '../../components/admin/EditCustomerForm/EditCustomerForm';

function EditCustomer() {
  return (
    <div className=''>
      <div className='row'>
        <div className='col-md-4'>
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
}

export default EditCustomer;