import React from 'react'
import AddCustomerForm from '../../components/admin/addCustomerForm/AddCustomerForm'
import AdminMenu from '../../components/admin/adminMenu/AdminMenu'

function AddCustomer() {
  return (
    <div className=''>
      <div className='row'>
        <div className='col-md-4'>
          {/* Admin Menu */}
          <AdminMenu />
        </div>
        <div className='col-md-8'>
          {/* Add Employee Form */}
          <AddCustomerForm />
        </div>
      </div>
    </div>
  )
}

export default AddCustomer