import React from 'react'
import AdminMenu from '../../components/admin/AdminMenu/AdminMenu'
import EmployeeList from '../../components/admin/EmployeeList/EmployeeList'

function Employee() {
  return (
    <div className='row container-fluid'>
      <div className='col-md-4'>
        {/* Admin Menu */}
        <AdminMenu />
      </div>
      <div className='col-md-8'>
        {/* Add Employee Form */}
        <EmployeeList />
      </div>
    </div>
  )
}

export default Employee