import React, { useState, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router';
import customerService from '../../../../services/customer.service';
import { useAuth } from '../../../../Contexts/AuthContext';
import Loader from '../../Loader/Loader';

function EditCustomerForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [customer_first_name, setCustomerFirstName] = useState('');
  const [customer_last_name, setCustomerLastName] = useState('');
  const [customer_phone_number, setCustomerPhone] = useState('');
  const [active_customer_status, setCustomerStatus] = useState(false);

  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  let token = '';
  const { employee } = useAuth();
  if (employee?.employee_token) token = employee.employee_token;

  // 🚀 Fetch customer data
  useEffect(() => {
    async function loadCustomer() {
      try {
        const res = await customerService.getCustomerById(id, token);
        console.log(res);
        
        if (!res || !res.data) {
          setServerError("Customer not found");
        } else {
          setCustomerFirstName(res.data.customer_first_name || "");
          setCustomerLastName(res.data.customer_last_name || "");
          setCustomerPhone(res.data.customer_phone_number || "");
          setCustomerStatus(res.data.active_customer_status === 1 || res.data.active_customer_status === '1');
        }
      } catch (err) {
        console.error(err);
        setServerError("Failed to fetch customer data");
      }

      setLoading(false);
    }

    loadCustomer();
  }, [id, token]);

  // 🚀 Submit update request
  async function handleSubmit(e) {
    e.preventDefault();

    let valid = true;
    const regexPhone = /^\+2519\d{8}$/; // Ethiopian format: +2519XXXXXXXX

    if (!customer_first_name.trim()) {
      setFirstNameError("First name is required");
      valid = false;
    } else setFirstNameError("");

    if (!customer_last_name.trim()) {
      setLastNameError("Last name is required");
      valid = false;
    } else setLastNameError("");

    if (!regexPhone.test(customer_phone_number)) {
      setPhoneError("Phone must be like +2519XXXXXXXX");
      valid = false;
    } else setPhoneError("");

    if (!valid) return;

    const formData = {
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status: active_customer_status ? '1' : '0',
    };

  try {
    const data = await customerService.editCustomer(id, formData, token);
      if (!data) {
          setServerError("Customer couldn't be updated");
      } else {
  // backend returned { message: "...", success: true } or similar
      setServerError('');
      setSuccess(true);
      setTimeout(() => navigate('/admin/customers'), 2000);
      }
  } catch (error) {
    console.error(error);
    setServerError(error.message || "Server error. Try again.");
    setSuccess(false);
  }
  }

  if (loading) {
    return <Loader/>;
  }

  return (
    <section className="contact-section">
      <div className="auto-container">

        {success && <div className="success">Customer Updated Successfully!</div>}

        <div className="contact-title">
          <h2>Edit: {customer_first_name} {customer_last_name}</h2>

          <div className="row clearfix">
            <div className="form-column col-lg-7">
              <div className="inner-column">
                <div className="contact-form">
                  <form onSubmit={handleSubmit} className="">

                    {serverError && <div className="error">{serverError}</div>}

                    <div className="row clearfix">

                      {/* First Name */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          value={customer_first_name}
                          onChange={(e) => setCustomerFirstName(e.target.value)}
                          placeholder="Enter first name"
                          required
                        />
                        {firstNameError && <div className="error">{firstNameError}</div>}
                      </div>

                      {/* Last Name */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          value={customer_last_name}
                          onChange={(e) => setCustomerLastName(e.target.value)}
                          placeholder="Enter last name"
                          required
                        />
                        {lastNameError && <div className="error">{lastNameError}</div>}
                      </div>

                      {/* Phone Number */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          value={customer_phone_number}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="+2519XXXXXXXX"
                          required
                        />
                        {phoneError && <div className="error">{phoneError}</div>}
                      </div>
                      {/* Customer status */}
                      <div className="form-group col-md-12 d-flex align-items-center">
                        <input
                          type="checkbox"
                          checked={active_customer_status}  // boolean
                          onChange={(e) => setCustomerStatus(e.target.checked)}
                          id="customerStatus"
                        />
                        <label htmlFor="customerStatus" className="mt-2 px-2">Is Customer Active</label>
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

export default EditCustomerForm;
