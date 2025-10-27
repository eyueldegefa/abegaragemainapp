import React, { useState } from 'react';
// import useNavigate to redirect after successful form submission
import { useNavigate } from 'react-router';
import './AddCustomerForm.css';
import customerService from '../../../../services/customer.service';
// import useAuth to get logged in employee token
import { useAuth } from '../../../../Contexts/AuthContext';

function AddCustomerForm() {
  // useNavigate hook
  const navigate = useNavigate();

  // Form state variables
  const [customer_email, setCustomerEmail] = useState('');
  const [customer_first_name, setCustomerFirstName] = useState('');
  const [customer_last_name, setCustomerLastName] = useState('');
  const [customer_phone_number, setCustomerPhone] = useState('');
  const [active_customer_status] = useState('1');

  // Error and status states
  const [emailError, setEmailError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

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
    if (!customer_email) {
      setEmailError('Email is required');
      valid = false;
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(customer_email)) {
        setEmailError('Email address is invalid');
        valid = false;
      } else {
        setEmailError('');
      }
    }

    // validate first name
    if (!customer_first_name) {
      setFirstNameError('First name is required');
      valid = false;
    } else {
      setFirstNameError('');
    }

    // validate last name
    if (!customer_last_name) {
      setLastNameError('Last name is required');
      valid = false;
    } else {
      setLastNameError('');
    }

    // validate phone
    if (!customer_phone_number) {
      setPhoneError('Phone number is required');
      valid = false;
    } else {
      const regexP = /^\+\d{1,3}\d{4,14}(?:x.+)?$/;
      if (!regexP.test(customer_phone_number)) {
        setPhoneError('Phone number is invalid. Include country code e.g +251900123456');
        valid = false;
      } else {
        setPhoneError('');
      }
    }

    if (!valid) return;

    // if all validations pass, prepare data
    const formData = {
      customer_email,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status,
    };

    const newCustomer = customerService.createCustomer(formData, loggedInEmployeeToken);
    newCustomer.then((response) => response.json())
      .then((data) => {
        if (data.error)  {
          setServerError(data.error);
          setSuccess(false);
        } else {
          setServerError('');
          setSuccess(true);
          // redirect to admin dashboard after 2 seconds
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      }).catch(() => {
        setServerError('An error occurred. Please try again later.');
        setSuccess(false);
      });
  }

  return (
    <section className="contact-section">
      <div className="auto-container">
        {success && <div className="success">Customer added successfully</div>}

        <div className="contact-title">
          <h2>Add a new customer</h2>
          <div className="row clearfix">
            {/* Form Column */}
            <div className="form-column col-lg-7">
              <div className="inner-column">
                {/* Contact Form */}
                <div className="contact-form">
                  <form method="post" onSubmit={handleSubmit} className="add-customer-form">
                    {serverError && <div className="error" role="alert">{serverError}</div>}
                    <div className="row clearfix">
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="email"
                          value={customer_email}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="Employee email"
                          required
                        />
                        {emailError && <div className="error" role="alert">{emailError}</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="firstName"
                          value={customer_first_name}
                          onChange={(e) => setCustomerFirstName(e.target.value)}
                          placeholder="Employee first name"
                          required
                        />
                        {firstNameError && <div className="error">{firstNameError}</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="lastName"
                          value={customer_last_name}
                          onChange={(e) => setCustomerLastName(e.target.value)}
                          placeholder="Employee last name"
                          required
                        />
                        {lastNameError && <div className="error" role="alert">{lastNameError}</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="phone"
                          value={customer_phone_number}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="Employee phone (+251900123456)"
                          required
                        />
                        {phoneError && <div className="error" role="alert">{phoneError}</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <button className="theme-btn btn-style-one" type="submit">
                          <span>ADD CUSTOMER</span>
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
  );
}

export default AddCustomerForm;