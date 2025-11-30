import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router';
import vehicleService from '../../../../services/vehicle.service'
import { useAuth } from '../../../../Contexts/AuthContext';

function EditVehicleForm() {
//   const navigate = useNavigate();
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
    const [loading, setLoading] = useState(true);
    const [serverError, setServerError] = useState('');
    const [success, setSuccess] = useState(false);

  let token = '';
  const { employee } = useAuth();
  if (employee?.employee_token) {
    token = employee.employee_token;
  }
  // 🚀 Fetch customer data
  useEffect(() => {
    async function loadVehicle() {
      try {
        const res = await vehicleService.getVehicleByVehicleId(id, token);
        console.log(res.data);
        
        if (!res || !res.data) {
          setServerError("Vehicle not found");
        } else {
          setVehicleType(res.data.vehicle_type || "");
          setVehicleYear(res.data.vehicle_year || "");
          setVehicleModel(res.data.vehicle_model || "");
          setVehicleMake(res.data.vehicle_make || "");
          setVehicleColor(res.data.vehicle_color || "")
          setVehicleTag(res.data.vehicle_tag || "");
          setVehicleSerial(res.data.vehicle_serial || "");
          setVehicleMileage(res.data.vehicle_mileage || "");
        }
      } catch (err) {
        console.error(err);
        setServerError("Failed to fetch Employee data");
      }

      setLoading(false);
    }

    loadVehicle();
  }, [id, token]);

  // 🚀 Submit update request
  async function handleSubmit(e) {
    e.preventDefault();

    let valid = true;
    if(
        !vehicle_color ||
        !vehicle_year ||
        !vehicle_make ||
        !vehicle_model ||
        !vehicle_type || 
        !vehicle_mileage || 
        !vehicle_tag || 
        !vehicle_serial 
    ) {
        valid = false
        setFormErrors("All fields are required!")
    }

    if (!valid) return;

    const formData = {
       vehicle_year, 
       vehicle_make, 
       vehicle_model, 
       vehicle_type, 
       vehicle_mileage, 
       vehicle_tag, 
       vehicle_serial, 
       vehicle_color
    };

  try {
    const data = await vehicleService.updateVehicleById(id, formData, token);
      if (!data) {
          setServerError("Vehicle couldn't be updated");
      } else {
  // backend returned { message: "...", success: true } or similar
      setServerError('');
      setSuccess(true);
      }
  } catch (error) {
    console.error(error);
    setServerError(error.message || "Server error. Try again.");
    setSuccess(false);
  }
  }

  if (loading) {
    return <div className="loading">Loading Vehicle information...</div>;
  }

  return (
    <section className="contact-section">
      <div className="auto-container">
        {formErrors && <div className='error'>{formErrors}</div>}
        {success && <div className="success">Vehicle Updated Successfully!</div>}

        <div className="contact-title">
          <h2>Update Vehicle</h2>
          <div className="row clearfix">
            <div className="form-column col-lg-7">
              <div className="inner-column">
                <div className="contact-form">
                  <form onSubmit={handleSubmit} className="">
                    {serverError && <div className="error" role="alert">{serverError}</div>}
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
                          <span>UPDATE</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default EditVehicleForm;
