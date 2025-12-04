import React from "react";
// Import the auth hook 
import { useAuth } from "../../../Contexts/AuthContext";
// Import the login form component 
import LoginForm from '../../components/LoginForm/LoginForm';
// Import the admin menu component
import AdminMenu from "../../components/admin/adminMenu/AdminMenu";
// Import the Unauthorized component
import Unauthorized from "../unauthorized";
import AdminDashboardComponent from "../../components/admin/AdminDashboard/AdminDashboard";
function AdminDashboard() {
  // Destructure the auth hook 
  const { isLogged, isAdmin, isManager, isEmployee } = useAuth();

  if (isLogged) {
    if (isAdmin || isManager || isEmployee) {
      return (
        <div>
          <div className="container-fluid admin-pages mt-5 pt-5">
            <div className="row mt-5">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <AdminDashboardComponent />
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

export default AdminDashboard; 