import React from 'react'
import AdminMenu from '../../components/admin/adminMenu/AdminMenu'
import EditEmployeeForm from '../../components/admin/EditEmployeeForm/EditEmployeeForm'

function EditEmployee() {
  return (
    <div className=''>
      <div className='row'>
        <div className='col-md-4'>
          {/* Admin Menu */}
          <AdminMenu />
        </div>
        <div className='col-md-8'>
          {/* Add Customer Form */}
          <EditEmployeeForm />
        </div>
      </div>
    </div>
  )
}

export default EditEmployee