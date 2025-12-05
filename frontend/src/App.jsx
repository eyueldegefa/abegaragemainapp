import React from 'react'
// import { Route, Routes } from 'react-router'
import { Route, Routes } from 'react-router-dom'
// import css from template_assets
import './assets/template_assets/css/bootstrap.css'
import './assets/template_assets/css/style.css'
import './assets/template_assets/css/responsive.css'
import './assets/template_assets/css/color.css'
import './markup/components/header/Header.css'
import './App.css'

// import header and footer
import Header from './markup/components/header/Header'
import Footer from './markup/components/footer/Footer'
// import pages
import Login from './markup/pages/Login'
import Home from './markup/pages/Home'
import AboutUs from './markup/pages/AboutUs'
import Service from './markup/pages/Service'
import ContactUs from './markup/pages/ContactUs'
import Unauthorized from './markup/pages/unauthorized'
// Pages for Admin and employee
import PrivateAuthRoute from './markup/components/auth/PrivateAuthRoute'
import AddEmployee from './markup/pages/admin/addEmployee'
import Customers from './markup/pages/admin/Customers'
import Employees from './markup/pages/admin/Employees'
import AddCustomer from './markup/pages/admin/AddCustomer'
import Services from './markup/pages/admin/Services'
import Orders from './markup/pages/admin/Orders'
import Order from './markup/pages/admin/Order'
import AddNewOrder from './markup/pages/admin/AddNewOrder1'
import AddNewOrder2 from './markup/pages/admin/AddNewOrder2'
import AddNewOrder1 from './markup/pages/admin/AddNewOrder1'
import AddNewOrder3 from './markup/pages/admin/AddNewOrder3'
import EditCustomer from './markup/pages/admin/EditCustomer'
import EditEmployee from './markup/pages/admin/EditEmployee'
import EditVehicleForm from './markup/components/admin/EditVehicleForm/EditVehicleForm'
import ViewOrderPage from './markup/pages/admin/ViewOrderPage'
import EditOrder from './markup/pages/admin/EditOrder'
import EditService from './markup/pages/admin/EditService'
import AdminDashboard from './markup/pages/admin/AdminDashboard'


function App() {

  return (
    <>
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/services' element={<Service />} />
          <Route path='/contact-us' element={<ContactUs />} />
          {/* Admin Dashboard */}
          <Route path='/admin' element={
                  <PrivateAuthRoute roles={[1,2,3]}>
                    <AdminDashboard />
                  </PrivateAuthRoute>} />
    {/* -------------------------------------------------------- */}
          {/* Add new order allowed for manager and admin */}
          <Route path='/admin/add-order' element=
                    {<PrivateAuthRoute roles={[2,3]}>
                      <AddNewOrder/>
                    </PrivateAuthRoute>} />
          {/* Add order by customer ID allowed for manager and admin step-1*/}
          <Route path='/admin/add-order1/:id' element={
                    <PrivateAuthRoute roles={[2,3]}>
                      <AddNewOrder1/>
                    </PrivateAuthRoute>} />
          {/* Add order by customer ID allowed for manager and admin step-2 */}
          <Route path='/admin/add-order2/:id' element={
                    <PrivateAuthRoute roles={[2,3]}>
                      <AddNewOrder2/>
                    </PrivateAuthRoute>} />
          {/* Add order by customer ID allowed for manager and admin step-3 */}
          <Route path='/admin/add-order3/:id' element={
                    <PrivateAuthRoute roles={[2,3]}>
                      <AddNewOrder3 />
                    </PrivateAuthRoute>} />
      {/* ---------------------------------------------------------------- */}
          {/* Add new customer is allowed for manager and admin */}
          <Route path='/admin/add-customer' element=
                    {<PrivateAuthRoute roles={[2,3]}>
                      <AddCustomer/>
                    </PrivateAuthRoute>} />
          {/* To Show Customers and it is allowed for manager and admin*/}
          <Route path='/admin/customers' element=
                  {<PrivateAuthRoute roles={[2,3]}>
                      <Customers/>
                    </PrivateAuthRoute>}/>
          {/* View order by customer ID is allowed for manager and admin*/}
          <Route path='/admin/customer/:id' element=
                  {<PrivateAuthRoute roles={[2,3]} >
                    <Order />
                  </PrivateAuthRoute>} />
          {/* Edit/Update customer by customer ID is allowed for manager and admin*/}
          <Route path='/admin/edit-customer/:id' element={
                    <PrivateAuthRoute roles={[2,3]}>
                      <EditCustomer />
                    </PrivateAuthRoute>} />
      {/* ---------------------------------------------------------------------- */}
            {/* Add new Employee is allowed for manager and admin */}
          <Route path='/admin/add-employee' element=
                    {<PrivateAuthRoute roles={[2,3]}>
                      <AddEmployee/>
                    </PrivateAuthRoute>} />
            {/* Show Employees is allowed for manager and admin */}
          <Route path='/admin/employees' element=
                  {<PrivateAuthRoute roles={[2,3]}>
                      <Employees/>
                    </PrivateAuthRoute>}/>
          {/* Edit/Update employee by employee ID is allowed for manager and admin*/}
          <Route path='/admin/edit-employee/:id' element={
                    <PrivateAuthRoute roles={[2,3]}>
                      <EditEmployee />
                    </PrivateAuthRoute>} />
      {/* ------------------------------------------------------------------------ */}
          {/* Show all orders is allowed for employee, manager and admin*/}
           <Route path='/admin/orders' element=
                  {<PrivateAuthRoute roles={[1,2,3]} >
                    <Orders />
                  </PrivateAuthRoute>} />
          {/* View order details by order ID is allowed for employee, manager and admin */}
          <Route path='/admin/view-order/:id' element={
                    <PrivateAuthRoute roles={[1,2,3]}>
                      <ViewOrderPage />
                    </PrivateAuthRoute>} />
          {/* Edit/Update order by order ID is allowed for manager and admin*/}
          <Route path='/admin/edit-order/:id' element={
                    <PrivateAuthRoute roles={[2,3]}>
                      <EditOrder />
                    </PrivateAuthRoute>} />
      {/* ------------------------------------------------------------------------ */}
          {/* Show services page is allowed for employee, manager and admin  */}
            <Route path='/admin/services' element=
                  {<PrivateAuthRoute roles={[1,2,3]}>
                      <Services/>
                    </PrivateAuthRoute>}/>
          {/* Edit/Update service by service ID is allowed for employee, manager and admin*/}
            <Route path='/admin/edit-service/:id' element={
                    <PrivateAuthRoute roles={[2,3]}>
                      <EditService />
                    </PrivateAuthRoute>} />
    {/* ------------------------------------------------------------------------ */}
          {/* Edit/Update vehicle by vehicle ID */} 
          <Route path='/admin/edit-vehicle/:id' element={
                    <PrivateAuthRoute roles={[2,3]}>
                      <EditVehicleForm />
                    </PrivateAuthRoute>} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
