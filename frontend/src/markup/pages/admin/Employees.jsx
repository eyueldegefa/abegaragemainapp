import React from "react";
// Import the auth hook 
import { useAuth } from "../../../Contexts/AuthContext";
// Import the login form component 
import LoginForm from '../../components/LoginForm/LoginForm';
// Import the admin menu component
import AdminMenu from "../../components/admin/adminMenu/AdminMenu";
// Import the EmployeesList component 
import EmployeesList from "../../components/admin/EmployeeList/EmployeeList";
// Import the Unauthorized component
import Unauthorized from "../unauthorized";
function Employees() {
  // Destructure the auth hook 
  const { isLogged, isAdmin, isManager } = useAuth();

  if (isLogged) {
    if (isAdmin || isManager) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row mt-5 pt-5">
              <div className="col-md-3 admin-left-side mt-5">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <EmployeesList />
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

export default Employees; 