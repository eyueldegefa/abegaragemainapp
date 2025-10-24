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
// import css from template_assets
import './assets/template_assets/css/bootstrap.css'
import './assets/template_assets/css/style.css'
import './assets/template_assets/css/responsive.css'
import './assets/template_assets/css/color.css'
// import header and footer
import Header from './markup/components/header/Header'
import Footer from './markup/components/footer/Footer'


function App() {

  return (
    <>
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/admin/add-employee' element={<AddEmployee />} /> */}
          <Route path='/unauthorized' element={<Unauthorized />} />
           
           <Route path='/admin/orders' element=
                  {<PrivateAuthRoute roles={[1,2,3]} >
                    <Orders />
                  </PrivateAuthRoute>} />

           <Route path='/admin/add-employee' element=
                    {<PrivateAuthRoute roles={[3]}>
                      <AddEmployee/>
                    </PrivateAuthRoute>} />

           <Route path='/admin/customers' element=
                  {<PrivateAuthRoute roles={[2,3]}>
                      <Customers/>
                    </PrivateAuthRoute>}/>
        </Routes>
      <Footer />
    </>
  )
}

export default App
