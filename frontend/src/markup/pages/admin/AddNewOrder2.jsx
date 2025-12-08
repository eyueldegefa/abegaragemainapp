import React from "react";
// Import the auth hook 
import { useAuth } from "../../../Contexts/AuthContext";
// Import the login form component 
import LoginForm from '../../components/LoginForm/LoginForm';
// Import the admin menu component
import AdminMenu from "../../components/admin/adminMenu/AdminMenu";
// Import the Unauthorized component
import Unauthorized from "../unauthorized";
// import AddNewOrder2 component
import AddNewOrderTwo from "../../components/admin/AddNewOrder2/AddNewOrder2";


function AddNewOrder2() {
  // Destructure the auth hook 
  const { isLogged, isAdmin, isManager } = useAuth();

  if (isLogged) {
    if (isAdmin || isManager) {
      return (
        <div>
          <div className="container-fluid admin-pages mt-5 pt-5">
            <div className="row mt-5">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side container">
                <AddNewOrderTwo />
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

export default AddNewOrder2; 