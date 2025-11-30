import React from 'react'
import './App.css'
// import { Route, Routes } from 'react-router'
import { Route, Routes } from 'react-router-dom'
// import pages
import Home from './markup/pages/Home'
import Login from './markup/pages/Login'
import AddEmployee from './markup/pages/admin/addEmployee'
import Unauthorized from './markup/pages/unauthorized'
import Orders from './markup/pages/Orders'
import PrivateAuthRoute from './markup/components/auth/PrivateAuthRoute'
import Customers from './markup/pages/admin/Customers'
import Employees from './markup/pages/admin/Employees'
import AddCustomer from './markup/pages/admin/AddCustomer'
import Services from './markup/pages/admin/Services'
import Order from './markup/pages/admin/Order'
import AddNewOrder from './markup/pages/admin/AddNewOrder1'
// import css from template_assets
import './assets/template_assets/css/bootstrap.css'
import './assets/template_assets/css/style.css'
import './assets/template_assets/css/responsive.css'
import './assets/template_assets/css/color.css'
// import header and footer
import Header from './markup/components/header/Header'
import Footer from './markup/components/footer/Footer'
import AddNewOrder2 from './markup/pages/admin/AddNewOrder2'
import AddNewOrder1 from './markup/pages/admin/AddNewOrder1'
import AddNewOrder3 from './markup/pages/admin/AddNewOrder3'
import OrdersList from './markup/pages/admin/Orders'
import EditCustomer from './markup/pages/admin/EditCustomer'
import EditEmployee from './markup/pages/admin/EditEmployee'
import EditVehicleForm from './markup/components/admin/EditVehicleForm/EditVehicleForm'


function App() {

  return (
    <>
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='/admin/orders' element={<OrdersList />} />
          <Route path='/admin/add-order1/:id' element={<AddNewOrder1/>} />
          <Route path='/admin/add-order2/:id' element={<AddNewOrder2 />} />
          <Route path='/admin/add-order3/:id' element={<AddNewOrder3 />} />
          <Route path='/admin/edit-customer/:id' element={<EditCustomer />} />
          <Route path='/admin/edit-employee/:id' element={<EditEmployee />} />
          <Route path='/admin/edit-vehicle/:id' element={<EditVehicleForm />} />
          <Route path='/admin/customer/:id' element=
                  {<PrivateAuthRoute roles={[2,3]} >
                    <Order />
                  </PrivateAuthRoute>} />
          
           <Route path='/admin/orders' element=
                  {<PrivateAuthRoute roles={[1,2,3]} >
                    <Orders />
                  </PrivateAuthRoute>} />

           <Route path='/admin/add-employee' element=
                    {<PrivateAuthRoute roles={[3]}>
                      <AddEmployee/>
                    </PrivateAuthRoute>} />

            <Route path='/admin/add-customer' element=
                    {<PrivateAuthRoute roles={[3]}>
                      <AddCustomer/>
                    </PrivateAuthRoute>} />

           <Route path='/admin/customers' element=
                  {<PrivateAuthRoute roles={[2,3]}>
                      <Customers/>
                    </PrivateAuthRoute>}/>
                    {/* To Show Employees */}
            <Route path='/admin/employees' element=
                  {<PrivateAuthRoute roles={[1,2, 3]}>
                      <Employees/>
                    </PrivateAuthRoute>}/>
            <Route path='/admin/services' element=
                  {<PrivateAuthRoute roles={[2,3]}>
                      <Services/>
                    </PrivateAuthRoute>}/>

            <Route path='/admin/add-order' element=
                    {<PrivateAuthRoute roles={[2,3]}>
                      <AddNewOrder/>
                    </PrivateAuthRoute>} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
