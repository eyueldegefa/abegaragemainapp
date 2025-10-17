import React from 'react'
import './AdminMenu.css'


function AdminMenu() {
  return (
    <section className='admin-menu'>
      <div className='admin-menu-header'>ADMIN MENU</div>
      <div>
        <ul className='admin-menu-list'>
          <li>Dashboard</li>
          <li>Orders</li>
          <li>New order</li>
          <li>Add employee</li>
          <li>Employees</li>
          <li>Add customer</li>
          <li>Customers</li>
          <li>Services</li>
        </ul>
      </div>
    </section>
  )
}

export default AdminMenu