import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../Contexts/AuthContext';
import servicesService from '../../../../services/service.service';

function EditServiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service_name, setServiceName] = useState("");
  const [service_description, setServiceDesc] = useState("");
  const [loading, setLoading] = useState(true);

  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  // Get token
  const { employee } = useAuth();
  const token = employee?.employee_token || "";

  // Load service data
  useEffect(() => {
    async function loadService() {
      try {
        const res = await servicesService.getServiceById(id, token);

        if (!res || !res.data) {
          setServerError("Service not found");
        } else {
          setServiceName(res.data.service_name || "");
          setServiceDesc(res.data.service_description || "");
        }
      } catch (err) {
        console.error(err);
        setServerError("Failed to fetch service data");
      }

      setLoading(false);
    }

    loadService();
  }, [id, token]);

  // Handle update submit
  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");

    if (!service_name || !service_description) {
      setServerError("All fields are required");
      return;
    }

    try {
      const formData = { service_name, service_description };

      const response = await servicesService.editService(id, formData, token);

      if (response.data?.error) {
        setServerError(response.data.error);
        setSuccess(false);
      } else {
        setSuccess(true);

        setTimeout(() => {
          navigate("/admin/services");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setServerError("An error occurred. Please try again later.");
      setSuccess(false);
    }
  }

  return (
    <section className="container contact-section row shadow my-5 mx-2">
      <div className="auto-container col-12">
        
        {success && <div className="success">Service updated successfully</div>}
        {loading && <div>Loading...</div>}

        <div className="contact-title">
          <h2>Update Service</h2>
        </div>

        <div className="row clearfix">
          <div className="form-column col-lg-10">
            <div className="inner-column">
              <div className="contact-form">

                <form className="login-form" onSubmit={handleSubmit}>
                  <div className="row clearfix">

                    <div className="form-group col-md-9">
                      {serverError && <div className="error">{serverError}</div>}
                      <input
                        type="text"
                        name="service_name"
                        value={service_name}
                        onChange={(e) => setServiceName(e.target.value)}
                        placeholder="Service Name"
                      />
                    </div>

                    <div className="form-group col-md-9">
                      <input
                        type="text"
                        name="service_description"
                        value={service_description}
                        onChange={(e) => setServiceDesc(e.target.value)}
                        placeholder="Service Description"
                      />
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
    </section>
  );
}

export default EditServiceForm;
