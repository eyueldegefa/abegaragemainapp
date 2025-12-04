import React from "react";
// Import the auth hook 
import { useAuth } from "../../../Contexts/AuthContext";
// Import the login form component 
import LoginForm from '../../components/LoginForm/LoginForm';
// Import the admin menu component
import AdminMenu from "../../components/admin/adminMenu/AdminMenu";
// Import the Unauthorized component
import Unauthorized from "../unauthorized";
import OrdersList from "../../components/admin/OrdersList/OrdersList";
function Orders() {
  // Destructure the auth hook 
  const { isLogged, isAdmin, isManager, isEmployee } = useAuth();

  if (isLogged) {
    if (isAdmin || isManager || isEmployee) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row mt-5 pt-5">
              <div className="col-md-3 admin-left-side mt-5">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <OrdersList />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <Unauthorized />
        </>
      );
    }
  } else {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }

}

export default Orders; 