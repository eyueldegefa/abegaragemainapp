import React from 'react'
// import Link from react-router
import { Link } from 'react-router';
import './AdminMenu.css'


function AdminMenu() {
  return (
    <section className='admin-menu'>
      <div className='admin-menu-header'>ADMIN MENU</div>
      <div>
        <ul className='admin-menu-list '>
          <li><Link to='/admin/dashboard'  className='text-white'>Dashboard</Link></li>
          <li><Link to='/admin/orders'  className='text-white'>Orders</Link></li>
          <li><Link to='/admin/add-order' className='text-white'>New order</Link></li>
          <li><Link to='/admin/add-employee' className='text-white'>Add employee</Link></li>
          <li><Link to='/admin/employees' className='text-white'>Employees</Link></li>
          <li><Link to='/admin/add-customer' className='text-white'>Add customer</Link></li>
          <li><Link to='/admin/customers' className='text-white'>Customers</Link></li>
          <li><Link to='/admin/services' className='text-white'>Services</Link></li>
        </ul>
      </div>
    </section>
  )
}

export default AdminMenu