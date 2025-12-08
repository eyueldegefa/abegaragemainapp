import React, { useState } from 'react'
import { useNavigate } from "react-router";
// import useAuth
import { useAuth } from "../../../../Contexts/AuthContext";
// import Services
import Services from "../../../../services/service.service";
// import confirm modal component
import ConfirmModal from '../../ConfirmModal/ConfirmModal';
import servicesService from '../../../../services/service.service';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';

function ServicesPage() {
  const navigate = useNavigate();

    // state for modal
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState(null);
  // To get the logged in employee token
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  // get customer id from params
//   const { id } = useParams();

      const [services, setServices] = useState([]);
        // state for api error
        const [apiError, setApiError] = useState(false);
        const [apiErrorMessage, setApiErrorMessage] = useState("");
        // state for success
        // const [success, setSuccess] = useState(false);

        // =================
    const allServices = Services.getAllServices(token);
        allServices.then((res)=>{
            if(!res.ok){
                console.log(res.status);
                setApiError(true);
                if (res.status === 401) {
                  setApiErrorMessage("Please login again");
                } else if (res.status === 403) {
                  setApiErrorMessage("You are not authorized to view this page");
                } else {
                  setApiErrorMessage("Please try ffs again later");
                }
                }
                return res.json()
            }).then((data) => {
                if (data.data.length !== 0) {
                  setServices(data.data)
                  console.log(data.data);
                }
            }).catch((err) => {
              console.log(err);
            })

        // Navigate to the Edit service page
  const handleEditClick = (id) => {
    navigate(`/admin/edit-service/${id}`);
  }

   // To handle Delete Click
    const handleDeleteClick = (id) => {
        setSelectedServiceId(id);
      setModalVisible(true); // show modal instead of window.confirm
    };
  
    const confirmDelete = async () => {
      setModalVisible(false);
  
      try {
        const res = await servicesService.deleteServiceById(selectedServiceId, token);
  
        if (res.status === "Fail" || res.status === "Error") {
          setApiError(true);
          setApiErrorMessage(res.message || "Could not delete customer");
          return;
        }
  
        // remove customer from state
        setServices(prev => prev.filter(s => s.service_id !== selectedServiceId));
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
    <div className="auto-container contact-section">   
              {/* display api error */}
      {apiError && <div className="error-message">{apiErrorMessage}</div>}
        <div className="container contact-title">
           {/* {success && <div className="success">Ordered successfully</div>} */}
           <h2>Services</h2>
           <p className='text-secondary'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias ab sequi blanditiis fuga possimus repellat modi neque, earum, libero assumenda minus veniam vero illum commodi, sint expedita maxime praesentium ullam.</p>
        </div>
            {modalVisible && (
              <ConfirmModal
                message={`Are you sure you want to delete this Service?`}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
              />
            )}    
        <div className="mt-3 shadow p-2">
        {/* ================= SERVICES ================= */}
         {services.map((service) => (
            <div key={service.service_id} className="shadow-sm p-2 my-2 service-options  d-flex justify-content-between align-items-center">
              <div>
                <h4>{service.service_name}</h4>
                <p>{service.service_description}</p>
              </div>
              <div  className="edit-delete-icons" >
                    <button onClick={()=>handleEditClick(service.service_id)}
                            className='edit-button mr-3'
                    ><EditSquareIcon/></button> 
                    <button onClick={()=>handleDeleteClick(service.service_id)}><DeleteIcon/></button>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default ServicesPage