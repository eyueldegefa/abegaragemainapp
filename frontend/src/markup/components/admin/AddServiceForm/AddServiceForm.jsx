import React, {useState} from 'react'
// import useNavigate to redirect after successful form submission
import { useNavigate } from 'react-router';
import { useAuth } from '../../../../Contexts/AuthContext';
import servicesService from '../../../../services/service.service';
import { PulseLoader } from 'react-spinners';

function AddServiceForm() {
      // useNavigate hook
      const navigate = useNavigate();
    // import states
    const [service_name, setServiceName]= useState();
    const [service_description, setServiceDesc]= useState();

      // state for loading button
      const [buttonLoading, setButtonLoading] = useState(false);

    // errors state
    const [serverError, setServerError] = useState();
    const [success, setSuccess] = useState();

      // create a variable to hold logged in employee token
      let loggedInEmployeeToken = '';
      // get logged in employee token using useAuth
      const { employee } = useAuth();
      if (employee && employee.employee_token) {
        loggedInEmployeeToken = employee.employee_token;
      }

        // handleSubmit function
  function handleSubmit(e) {
    e.preventDefault();
    let valid = true;

    // validate email
    if (!service_name || !service_description) {
      valid = false;
    }

    if (!valid) return;
    const formData = {
        service_name,
        service_description
    }

    const newService = servicesService.addService(formData, loggedInEmployeeToken);
    setButtonLoading(true);
    newService.then((response) => response.json())
      .then((data) => {
        if (data.error)  {
          setServerError(data.error);
          setSuccess(false);
        } else {
          setServerError('');
          setSuccess(true);
          setButtonLoading(false);
          // redirect to admin dashboard after 2 seconds
          setTimeout(() => {
            navigate('/admin/services');
          }, 2000);
        }
      }).catch(() => {
        setServerError('An error occurred. Please try again later.');
        setSuccess(false);
      });
  }
  return (
    <section className="container contact-section row shadow mb-5 mx-1">
      <div className="auto-container col-12">
         {success && <div className="success">Service added successfully</div>}
        <div className="contact-title">
          <h2>Add a new service</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-10">
            <div className="inner-column">
              <div className="contact-form">
                <form className='login-form' onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-9">
                      {serverError && <div className="error" role="alert">{serverError}</div>}
                      <input 
                        type="text" 
                        name="service_name" 
                        value={service_name} 
                        onChange={(event)=> setServiceName(event.target.value)} 
                        placeholder="Service Name" />
                    </div>

                    <div className="form-group col-md-9">
                      <input type="text" 
                        name="service_description" 
                        value={service_description} 
                        onChange={(event)=> setServiceDesc(event.target.value)} 
                        placeholder="Service_description" />
                    </div>

                    <div className="form-group col-md-12">
                      <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait...">
                        <span>
                          {buttonLoading ? (<PulseLoader />) : 'ADD SERVICE'}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddServiceForm