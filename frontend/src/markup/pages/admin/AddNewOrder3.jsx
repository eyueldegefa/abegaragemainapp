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
import AddNewOrderThree from "../../components/admin/AddNewOrder3/AddNewOrder3";


function AddNewOrder3() {
  // Destructure the auth hook 
  const { isLogged, isAdmin } = useAuth();

  if (isLogged) {
    if (isAdmin) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-4 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-8 admin-right-side container">
                <AddNewOrderThree />
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

export default AddNewOrder3; 