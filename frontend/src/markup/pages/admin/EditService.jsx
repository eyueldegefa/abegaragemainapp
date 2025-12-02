import React from 'react'
import AdminMenu from '../../components/admin/adminMenu/AdminMenu'
import EditServiceForm from '../../components/admin/EditServiceForm/EditServiceForm'

function EditOrder() {
  return (
    <div className=''>
      <div className='row'>
        <div className='col-md-4'>
          {/* Admin Menu */}
          <AdminMenu />
        </div>
        <div className='col-md-8'>
          {/* Add Customer Form */}
          <EditServiceForm />
        </div>
      </div>
    </div>
  )
}

export default EditOrder