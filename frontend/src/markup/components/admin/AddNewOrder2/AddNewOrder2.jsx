// import react and hooks
import React from 'react'
// Import the CustomerData component
import CustomerData from "../../../components/admin/CustomerData/CustomerData";
import CustomerVehicle from "../../../components/admin/CustomerVehicle/CustomerVehicle";

function AddNewOrder2() {

  return (
    <section className='container-fluid auto-container contact-section px-4'>
      <div className="contact-title">
        <h2>Create a new order</h2>
      </div>
      <div>
        <CustomerData />
      </div>

      <div>
        <CustomerVehicle />
      </div>
    </section>
  )
}

export default AddNewOrder2;