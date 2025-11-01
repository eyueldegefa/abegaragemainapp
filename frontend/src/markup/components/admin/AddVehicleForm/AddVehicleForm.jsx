// import React and other necessary hooks and components
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
// import useParam to get customer id from url
import { useParams } from "react-router-dom";
// import useAuth to get logged in employee token
import { useAuth } from '../../../../Contexts/AuthContext';
// import vehicleService to add new vehicle
import vehicleService from '../../../../services/vehicle.service';

// create a function to add vehicle form
function AddVehicleForm() {
        // navigate hook to redirect after form submission
    const navigate = useNavigate();
    // get customer id from url
    const { id } = useParams();
    // Create states to store form data
    const [vehicle_year, setVehicleYear] = useState('');
    const [vehicle_make, setVehicleMake] = useState('');
    const [vehicle_model, setVehicleModel] = useState('');
    const [vehicle_type, setVehicleType] = useState('');
    const [vehicle_mileage, setVehicleMileage] = useState('');
    const [vehicle_tag, setVehicleTag] = useState('');
    const [vehicle_serial, setVehicleSerial] = useState('');
    const [vehicle_color, setVehicleColor] = useState('');

    // create a state to store error and success
    const [formErrors, setFormErrors] = useState('');
    const [apiError, setApiError] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    // To get the logged in employee token
    const { employee } = useAuth();
    const token = employee ? employee.employee_token : null;

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        let valid = true;

        // validate form fields
        if (!vehicle_year || !vehicle_make || !vehicle_model || !vehicle_type || !vehicle_mileage || !vehicle_tag || !vehicle_serial || !vehicle_color) {
            setFormErrors('All fields are required');
            valid = false;
        } else {
            setFormErrors('');
        }

        if (!valid) {
            return;
        }

        // create form data object
        const formData = {
            customer_id: id,
            vehicle_year,   
            vehicle_make,
            vehicle_model,
            vehicle_type,
            vehicle_mileage,
            vehicle_tag,
            vehicle_serial,
            vehicle_color,
        };

        // call vehicleService to add new vehicle
        try {
            const newVehicle = vehicleService.addNewVehicle(formData, token);
            const response = await newVehicle;
            if (!response.ok) {
                setApiError(true);
                setApiErrorMessage(response.message || 'Failed to add vehicle');
                setSuccess(false);
            } else {
                setApiError(false);
                setApiErrorMessage(null);
                setSuccess(true);
                setTimeout(() => navigate(`/admin/customer/${id}`), 2000);
            }
        } catch (error) {
            setApiError(true);
            setApiErrorMessage(error.message || 'An error occurred. Please try again.');
            setSuccess(false);
        }
    };

  return (
      <section className="contact-section">
      <div className="auto-container">
        {success && <div className="success">Vehicle added successfully</div>}
         {apiError && <div className="error" role="alert">{apiErrorMessage}</div>}
        <div className="contact-title">
          <h2>Add a new vehicle</h2>
          <div className="row clearfix">
            {/* Form Column */}
            <div className="form-column col-lg-7">
              <div className="inner-column">
                {/* Contact Form */}
                <div className="contact-form">
                  <form method="post" onSubmit={handleSubmit} className="add-customer-form">
                    {apiError && <div className="error" role="alert">{apiError}</div>}
                    <div className="row clearfix">
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="year"
                          value={vehicle_year}
                          onChange={(e) => setVehicleYear(e.target.value)}
                          placeholder="Vehicle Year"
                          required
                        />
                        {formErrors && <div className="error" role="alert">{formErrors}</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="vehicleMake"
                          value={vehicle_make}
                          onChange={(e) => setVehicleMake(e.target.value)}
                          placeholder="Vehicle Make"
                          required
                        />
                        {formErrors && <div className="error">{formErrors}</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="vehicleModel"
                          value={vehicle_model}
                          onChange={(e) => setVehicleModel(e.target.value)}
                          placeholder="Vehicle Model"
                          required
                        />
                        {formErrors && <div className="error" role="alert">{formErrors}</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="VehicleType"
                          value={vehicle_type}
                          onChange={(e) => setVehicleType(e.target.value)}
                          placeholder="Vehicle Type"
                          required
                        />
                        {formErrors && <div className="error" role="alert">{formErrors}</div>}
                      </div>

                    <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="VehicleMileage"
                          value={vehicle_mileage}
                          onChange={(e) => setVehicleMileage(e.target.value)}
                          placeholder="Vehicle Mileage"
                          required
                        />
                        {formErrors && <div className="error" role="alert">{formErrors}</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="VehicleTag"
                          value={vehicle_tag}
                          onChange={(e) => setVehicleTag(e.target.value)}
                          placeholder="Vehicle Tag"
                          required
                        />
                        {formErrors && <div className="error" role="alert">{formErrors}</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="VehicleSerial"
                          value={vehicle_serial}
                          onChange={(e) => setVehicleSerial(e.target.value)}
                          placeholder="Vehicle Serial"
                          required
                        />
                        {formErrors && <div className="error" role="alert">{formErrors}</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="VehicleColor"
                          value={vehicle_color}
                          onChange={(e) => setVehicleColor(e.target.value)}
                          placeholder="Vehicle Color"
                          required
                        />
                        {formErrors && <div className="error" role="alert">{formErrors}</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <button className="theme-btn btn-style-one" type="submit">
                          <span>ADD VEHICLE</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                {/* End Contact Form */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddVehicleForm;
