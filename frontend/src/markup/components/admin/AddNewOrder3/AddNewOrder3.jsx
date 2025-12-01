import React, { useState, useEffect } from "react";
// import useParams
import { useParams, useNavigate } from "react-router-dom";
// import components
import CustomerData from "../CustomerData/CustomerData";
import CustomerVehicle from "../CustomerVehicle/CustomerVehicle";
// import customer service
import customerService from "../../../../services/customer.service";
// import vehicle service
import vehicleService from "../../../../services/vehicle.service";
// import orderService 
import orderService from "../../../../services/order.service";
// import Services
import Services from "../../../../services/service.service";
// import useAuth
import { useAuth } from "../../../../Contexts/AuthContext";
// import css
import "./AddNewOrder3.css";

function AddNewOrder3() {
  const navigate = useNavigate();
  // To get the logged in employee token
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  // get customer id from params
  const { id } = useParams();

  // state for formData
  const [employeeData, setEmployeeData] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  const [services, setServices] = useState([]);
  const [active_order] = useState(1);

  // state for api error
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  // state for success
  const [success, setSuccess] = useState(false);

  // state for selected services
  const [selected_services, setSelectedServices] = useState([]);
  const [service_id, setServiceId] = useState([]); // IDs

  const [service_completed] = useState(0);
  const [order_total_price, setOrderTotalPrice] = useState('');
  const [additional_request, setAdditionalRequest] = useState('');
  const [additional_requests_completed] = useState(0);
  const [order_status] = useState(1);


  useEffect(() => {
    if (!token) return;

    // Fetch Customer Data
    const fetchCustomer = async () => {
      try {
        const data = await customerService.getCustomerById(id, token);
        if (!data?.data) {
          setApiError(true);
          setApiErrorMessage("Customer not found");
        } else {
          setCustomer(data.data.customer_id);
        }
      } catch (err) {
        console.error(err);
        setApiError(true);
        setApiErrorMessage("Failed to fetch customer. Please try again later.");
      }
    };

    // Fetch Employee Data from Auth Context
    const fetchEmployeeData = async () => {
      try {
        setEmployeeData(employee.employee_id);
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch Vehicle Data
    const fetchVehicleData = async () => {
      try {
        const data = await vehicleService.getVehiclesByCustomerId(id, token);
        console.log(data);
        
        if (!data || data.length === 0) {
          setApiError(true);
          setApiErrorMessage("Vehicle not found");
        } else {
          console.log(data.data[0].vehicle_id);
          
          setVehicles(data.data[0].vehicle_id); // Assuming single vehicle chosen
        }
      } catch (err) {
        console.error(err);
        setApiError(true);
        setApiErrorMessage("Failed to fetch vehicle. Please try again later.");
      }
    };
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

    fetchCustomer();
    fetchEmployeeData();
    fetchVehicleData();
  }, [id, token]);

  // ---------------- SERVICE SELECTION ----------------
const handleServiceSelection = (serviceName) => {
  if (!services || services.length === 0) return;

  const selectedService = services.find(
    (s) => s.service_name === serviceName
  );

  if (!selectedService) {
    console.log("Service not found in database:", serviceName);
    return;
  }

  const id = selectedService.service_id;

  // ----- Update service names -----
  let updatedNames = [];
  let updatedIds = [];

  if (selected_services.includes(serviceName)) {
    updatedNames = selected_services.filter((s) => s !== serviceName);
    updatedIds = service_id.filter((i) => i !== id);
  } else {
    updatedNames = [...selected_services, serviceName];
    updatedIds = [...service_id, id];
  }

  setSelectedServices(updatedNames);
  setServiceId(updatedIds);
};




// Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
  
  // formData object to send to backend
  const formData = {
    customer_id: customer,
    employee_id: employeeData,
    vehicle_id: vehicles,
    active_order: active_order,
    selected_services: selected_services.join(", "), // names
    service_id: service_id,   
    // selected_services: selected_services,
    service_completed: service_completed,
    additional_request: additional_request,
    order_total_price: order_total_price,
    additional_requests_completed: additional_requests_completed,
    order_status: order_status
  };

  console.log("FORM DATA:", formData);
    const newOrder = orderService.createOrder(formData, token);
        newOrder.then((response) => {
        return response.json()
        .then((data) => ({ 
          status: response.status, 
          ok: response.ok, 
          data }));
          })
          .then(({ ok, data }) => {
            if (!ok) {
              // Handle errors (like 400 or 500)
              setApiErrorMessage(data.message || "An error occurred");
              setSuccess(false);
            } else {
              // Success
              setApiError('');
              setSuccess(true);
              setTimeout(() => navigate('/admin/orders'), 2000);
            }
          })
          .catch(() => {
            setApiErrorMessage('An error occurred. Please try again later.');
            setSuccess(false);
          });
  } 


  return (
    <section className="container-fluid auto-container contact-section px-4 add-new-order-3">
      <div className="contact-title">
        {success && <div className="success">Ordered successfully</div>}
        <h2>Create a new order</h2>
      </div>

      <div className="shadow p-3 service-options my-2">
        <CustomerData />
        <button className="close-button">X</button>
      </div>

      <div className="shadow p-2 service-options my-2">
        <CustomerVehicle />
        <button className="close-button">X</button>
      </div>
      {/* --------- */}
       <div>
        {/* {services} */}
        </div>
      
      {/* display api error */}
      {apiError && <div className="error-message">{apiErrorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="my-3 shadow p-2">
          {/* ================= SERVICES ================= */}
         {
        //  [
        //     {
        //       name: "Oil Change",
        //       description:
        //         "Change your engine oil and oil filter to keep your engine running smoothly.",
        //     },
        //     {
        //       name: "Brake Inspection",
        //       description:
        //         "Check your brake pads, discs, and fluid to ensure safe braking performance.",
        //     },
        //     {
        //       name: "Tire Rotation",
        //       description:
        //         "Rotate your tires to ensure even wear and prolong tire life.",
        //     },
        //     {
        //       name: "Engine Diagnostic",
        //       description:
        //         "Perform a complete engine diagnostic to detect any potential issues early.",
        //     }
        //   ]
          services.map((service) => (
            <div key={service.service_id} className="shadow-sm p-2 my-2 service-options">
              <div>
                <h4>{service.service_name}</h4>
                <p>{service.service_description}</p>
              </div>
          
              <input
                type="checkbox"
                onChange={() => handleServiceSelection(service.service_name)}
                checked={selected_services.includes(service.service_name)}
              />
            </div>
          ))}
        </div>
      
        <div className="shadow p-3 mt-4">
          <div className="contact-title">
            <h2>Additional Request</h2>
          </div>
            <input 
              type="text"
              className="add-Service-inputs additional-service my-4"
              placeholder="Additional Service"
              value={additional_request} 
              onChange={(event) => setAdditionalRequest(event.target.value)}
            />
            <br />
            <input 
              type="text" 
              className="add-Service-inputs my-4"
              name="" id=""
              placeholder="Price" 
              value={order_total_price}
              onChange={(event) => setOrderTotalPrice(event.target.value)}
            />
            <br />
          <button 
            type="submit" 
            className="theme-btn btn-style-one">
            SUBMIT ORDER
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddNewOrder3;
