// import react and hooks
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
// import useAuth
import { useAuth } from '../../../../Contexts/AuthContext';
import { Table } from 'react-bootstrap';
// import css
import './CustomerVehicles.css'
import vehicleService from '../../../../services/vehicle.service';
// import confirm modal component
import ConfirmModal from '../../ConfirmModal/ConfirmModal';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';

function CustomerVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  // Create all the states we need to store the data
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
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
        const data = await vehicleService.getVehiclesByCustomerId(id, token);
        console.log(data.data);

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
// edit click
  const handleEditClick = (vehicle_id) => {
    console.log(vehicle_id);
    navigate(`/admin/edit-vehicle/${vehicle_id}`)
  }

  // To handle Delete Click
  const handleDeleteClick = (vehicleD) => {
    setSelectedVehicleId(vehicleD.vehicle_id);
    setModalVisible(true); // show modal instead of window.confirm
  };

  const confirmDelete = async () => {
    setModalVisible(false);

    try {
      const res = await vehicleService.deleteVehicleById(selectedVehicleId, token);

      if (res.status === "Fail" || res.status === "Error") {
        setApiError(true);
        setApiErrorMessage(res.message || "Could not delete customer");
        return;
      }

      // remove customer from state
      setVehicle(prev => prev.filter(v => v.vehicle_id !== selectedVehicleId));
      setApiError(false);
      setApiErrorMessage("");

    } catch (err) {
      console.error(err);
      setApiError(true);
      setApiErrorMessage("Something went wrong. Please try again later.");
    }
  };

  const cancelDelete = () => {
    setModalVisible(false);
  };

  return (
    <section className='d-block'>
        {modalVisible && (
        <ConfirmModal
          message={`Are you sure you want to delete this vehicle?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
        )}
    {vehicle ? (<h2 className='mt-3'>Vehicles of {vehicle[0].customer_first_name}</h2>) : (<></>)}
    <div>
      {apiError ? (
        <div>{apiErrorMessage}</div>
      ) : !vehicle ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered responsive hover className='customer-vehicles shadow'>
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
              <th>Edit | Delete</th>
            </tr>
          </thead>
          <tbody>
            {vehicle.map((vehicleD)=>(
            <tr key={vehicleD.customer_id}>
              <td onClick={()=> handleClick(vehicleD.vehicle_id)}>
                {vehicleD.vehicle_year}</td>
              <td onClick={()=> handleClick(vehicleD.vehicle_id)}>
                {vehicleD.vehicle_make}</td>
              <td onClick={()=> handleClick(vehicleD.vehicle_id)}>
                {vehicleD.vehicle_model}</td>
              <td onClick={()=> handleClick(vehicleD.vehicle_id)}>
                {vehicleD.vehicle_type}</td>
              <td onClick={()=> handleClick(vehicleD.vehicle_id)}>
                {vehicleD.vehicle_mileage}</td>
              <td onClick={()=> handleClick(vehicleD.vehicle_id)}>
                {vehicleD.vehicle_tag}</td>
              <td onClick={()=> handleClick(vehicleD.vehicle_id)}>
                {vehicleD.vehicle_serial}</td>
              <td onClick={()=> handleClick(vehicleD.vehicle_id)}>
                {vehicleD.vehicle_color}</td>
              <td>
                <div className="edit-delete-icons"  >
                  <span onClick={()=>handleEditClick(vehicleD.vehicle_id)}
                        className='edit-button mr-3'
                    ><EditSquareIcon/> </span> 
                  <span onClick={()=>handleDeleteClick(vehicleD)}
                    ><DeleteIcon/></span>
                </div>
              </td>
            </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
    </section>
  );
}
export default CustomerVehicle