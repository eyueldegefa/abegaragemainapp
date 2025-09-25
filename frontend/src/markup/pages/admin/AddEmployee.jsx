import React from 'react'
// import admin menu
import AdminMenu from '../../components/admin/adminMenu/AdminMenu'
// import add employee form
import AddEmployeeForm from '../../components/admin/addEmployeeForm/AddEmployeeForm'

function addEmployee() {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3'>
          {/* Admin Menu */}
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          {/* Add Employee Form */}
          <AddEmployeeForm />
        </div>
      </div>
    </div>
  )
}

export default addEmployee