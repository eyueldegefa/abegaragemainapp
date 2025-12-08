import React, { useState } from 'react'
// import Link from react-router
import { NavLink } from 'react-router';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import './AdminMenu.css'


function AdminMenu() {
  const [status, setStatus] = useState(false);
  
  return (
    <section className='admin-menu'>
      <div className='admin-menu-header d-flex'>
        <div>ADMIN MENU</div>
        <div className='d-lg-none'
             onClick={() => setStatus(!status)}>
          <MenuRoundedIcon/>
        </div>
      </div>
      <div>
        <ul className='admin-menu-list d-none d-lg-block'>
          <li><NavLink to='/admin'  className='text-white'><GridViewRoundedIcon/> Dashboard</NavLink></li>
          <li><NavLink to='/admin/orders'  className='text-white'><ViewListRoundedIcon/> Orders</NavLink></li>
          <li><NavLink to='/admin/add-order' className='text-white'><PlaylistAddRoundedIcon/> New order</NavLink></li>
          <li><NavLink to='/admin/add-employee' className='text-white'><PersonAddRoundedIcon/> Add employee</NavLink></li>
          <li><NavLink to='/admin/employees' className='text-white'><ViewListRoundedIcon /> Employees</NavLink></li>
          <li><NavLink to='/admin/add-customer' className='text-white'><PersonAddRoundedIcon/> Add customer</NavLink></li>
          <li><NavLink to='/admin/customers' className='text-white'><ViewListRoundedIcon/> Customers</NavLink></li>
          <li><NavLink to='/admin/services' className='text-white'><MiscellaneousServicesIcon/> Services</NavLink></li>
        </ul>
      </div>
      {  status? ( <div>
        <ul className='admin-menu-list'>
          <li><NavLink to='/admin'  className='text-white'><GridViewRoundedIcon/> Dashboard</NavLink></li>
          <li><NavLink to='/admin/orders'  className='text-white'><ViewListRoundedIcon/> Orders</NavLink></li>
          <li><NavLink to='/admin/add-order' className='text-white'><PlaylistAddRoundedIcon/> New order</NavLink></li>
          <li><NavLink to='/admin/add-employee' className='text-white'><PersonAddRoundedIcon/> Add employee</NavLink></li>
          <li><NavLink to='/admin/employees' className='text-white'><ViewListRoundedIcon /> Employees</NavLink></li>
          <li><NavLink to='/admin/add-customer' className='text-white'><PersonAddRoundedIcon/> Add customer</NavLink></li>
          <li><NavLink to='/admin/customers' className='text-white'><ViewListRoundedIcon/> Customers</NavLink></li>
          <li><NavLink to='/admin/services' className='text-white'><MiscellaneousServicesIcon/> Services</NavLink></li>
        </ul>
      </div>
      ) : null}
    </section>
  )
}

export default AdminMenu