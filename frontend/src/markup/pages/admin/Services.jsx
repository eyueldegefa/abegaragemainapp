import React from 'react'
// import useAuth to get logged in Token
import { useAuth } from '../../../Contexts/AuthContext'
// import login form
import LoginForm from '../../components/LoginForm/LoginForm'
// import Unauthorized page
import Unauthorized from '../unauthorized'
// import admin menu
import AdminMenu from '../../components/admin/adminMenu/AdminMenu'
// import service list
import ServiceList from '../../components/admin/ServiceList/ServiceList'
// import add new service form
import AddServiceForm from '../../components/admin/AddServiceForm/AddServiceForm'


function Services() {
    const {isLogged, isAdmin} = useAuth();
    if (isLogged){
        if (isAdmin){
            return (
                <> 
                    <div>
                      <div className="container-fluid admin-pages">
                        <div className="row">
                          <div className="col-md-3 admin-left-side">
                            <AdminMenu />
                          </div>
                          <div className="col-md-9 admin-right-side">
                            <ServiceList />
                            <AddServiceForm />
                          </div>
                        </div>
                      </div>
                    </div>
                </>
            )
        } else {
            return (
            <> 
              <Unauthorized />
            </>
        )
        }
        
    } else {
        return (
            <>
              <LoginForm />
            </>
        )
    }
}

export default Services