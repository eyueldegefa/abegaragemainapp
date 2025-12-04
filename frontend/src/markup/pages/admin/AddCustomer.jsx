import React from 'react'
import AddCustomerForm from '../../components/admin/AddCustomerForm/AddCustomerForm'
import AdminMenu from '../../components/admin/adminMenu/AdminMenu'

function AddCustomer() {
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
}

export default AddCustomer;