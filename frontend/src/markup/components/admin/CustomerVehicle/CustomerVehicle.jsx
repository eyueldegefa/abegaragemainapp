// import react and hooks
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
// import useAuth
import { useAuth } from '../../../../Contexts/AuthContext';
// import services.service
import Customer from '../../../../services/vehicle.service'
import { Table } from 'react-bootstrap';
// import css
import './CustomerVehicles.css'

function CustomerVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleClick = (vehicleId) => {
    console.log(`Customer ID: ${vehicleId}`);
    // You can add navigation or other logic here
    navigate(`/admin/add-order3/${id}`, { state: { vehicleId } });
  }

  return (
    <div>
      {apiError ? (
        <div>{apiErrorMessage}</div>
      ) : !vehicle ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered responsive hover className='customer-vehicles'>
          <thead>
            <tr>  
              <th>Year</th>
              <th>Make</th>
              <th>Model</th>
              <th>Type</th>
              <th>Mileage</th>
              <th>Tag</th>
              <th>Serial</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={()=> handleClick(vehicle.vehicle_id)}>
              <td>{vehicle.vehicle_year}</td>
              <td>{vehicle.vehicle_make}</td>
              <td>{vehicle.vehicle_model}</td>
              <td>{vehicle.vehicle_type}</td>
              <td>{vehicle.vehicle_mileage}</td>
              <td>{vehicle.vehicle_tag}</td>
              <td>{vehicle.vehicle_serial}</td>
              <td>{vehicle.vehicle_color}</td>
            </tr>
          </tbody>
          </Table>
      )}
    </div>
  );
}
export default CustomerVehicle