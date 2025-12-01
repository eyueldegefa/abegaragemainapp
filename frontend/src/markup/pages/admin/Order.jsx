import React from "react";
// Import the auth hook 
import { useAuth } from "../../../Contexts/AuthContext";
// Import the login form component 
import LoginForm from '../../components/LoginForm/LoginForm';
// Import the admin menu component
import AdminMenu from "../../components/admin/adminMenu/AdminMenu";
// Import the CustomerData component
import CustomerData from "../../components/admin/CustomerData/CustomerData";
// Import the Unauthorized component
import Unauthorized from "../unauthorized";
import AddVehicleForm from "../../components/admin/AddVehicleForm/AddVehicleForm";
import CustomerVehicle from "../../components/admin/CustomerVehicle/CustomerVehicle";
import CustomerOrder from "../../components/admin/CustomerOrder/CustomerOrder";
// import css
import './AdminPages.css'
function Order() {
  // Destructure the auth hook 
  const { isLogged, isAdmin } = useAuth();

  if (isLogged) {
    if (isAdmin) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <div className="d-flex">
                  <div className="mx-3">
                    <div className="bg-orange mr-2">Info</div>
                    <div className="vertical-line"></div>
                  </div>
                  <CustomerData />
                </div>
                <div className="d-flex">
                  <div className="mx-3">
                    <div className="bg-orange">Cars</div>
                    <div className="vertical-line"></div>
                  </div>
                  <CustomerVehicle />
                </div>
                <div className=" d-flex">
                  <div className="mx-3">
                    <div className="vertical-line2"></div>
                  </div>
                  <div className="shadow w-75 h-75"><AddVehicleForm /></div>
                </div>
                <div className="d-flex">
                  <div className="mx-3">
                    <div className="bg-orange">Orders</div>
                  </div>
                  <div className="my-3"><CustomerOrder /></div>
                </div>
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

export default Order; 