// import react and hooks
import React from 'react'
// Import the CustomerData component
import CustomerData from "../../../components/admin/CustomerData/CustomerData";
import CustomerVehicle from "../../../components/admin/CustomerVehicle/CustomerVehicle";

function AddNewOrder2() {



  return (
    <>
      <div>
        <CustomerData />
      </div>

      <div>
        <CustomerVehicle />
      </div>
    </>
  )
}

export default AddNewOrder2;