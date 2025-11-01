// import react and hooks
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
// import useAuth
import { useAuth } from '../../../../Contexts/AuthContext';
// import services.service
import Customer from '../../../../services/vehicle.service'

function CustomerVehicle() {
  const { id } = useParams();
  
  const [vehicle, setVehicle] = useState(null);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  
  // To get the logged in employee token
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  useEffect(() => {
    if (!token) return; // stop if not logged in

    const fetchCustomerVehicle = async () => {
      try {
        const data = await Customer.getVehiclesByCustomerId(id, token);
        console.log(data);

        if (!data || !data.data || data.data.length === 0) {
          setApiError(true);
          setApiErrorMessage("Vehicle not found");
        } else {
          setVehicle(data.data);
        }
      } catch (err) {
        console.error(err);
        setApiError(true);
        setApiErrorMessage("Failed to fetch Vehicle. Please try again later.");
      }
    };
    
    fetchCustomerVehicle();
  }, [id, token]);

  return (
    <div>
      {apiError ? (
        <div>{apiErrorMessage}</div>
      ) : !vehicle ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Vehicle Year: {vehicle.vehicle_year}</p>
          <p>Vehicle Make: {vehicle.vehicle_make}</p>
          <p>Vehicle Model: {vehicle.vehicle_model}</p>
          <p>Vehicle Type: {vehicle.vehicle_type}</p>
          <p>Vehicle Mileage: {vehicle.vehicle_mileage}</p>
          <p>Vehicle Tag: {vehicle.vehicle_tag}</p>
          <p>Vehicle Serial: {vehicle.vehicle_serial}</p>
          <p>Vehicle Color: {vehicle.vehicle_color}</p>
          <div>Edit</div>
        </>
      )}
    </div>
  );
}
export default CustomerVehicle