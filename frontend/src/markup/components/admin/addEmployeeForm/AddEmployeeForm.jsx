import React, { useState } from 'react';
// import useNavigate to redirect after successful form submission
import { useNavigate } from 'react-router';
import './AddEmployeeForm.css';
import employeeService from '../../../../services/employee.service';

function AddEmployeeForm() {
  // useNavigate hook
  const navigate = useNavigate();

  // Form state variables
  const [employee_email, setEmployeeEmail] = useState('');
  const [employee_first_name, setEmployeeFirstName] = useState('');
  const [employee_last_name, setEmployeeLastName] = useState('');
  const [employee_phone, setEmployeePhone] = useState('');
  const [company_role_id, setCompanyRoleId] = useState('1');
  const [active_employee] = useState('1');
  const [employee_password, setEmployeePassword] = useState('');

  // Error and status states
  const [emailError, setEmailError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  // handleSubmit function
  function handleSubmit(e) {
    e.preventDefault();
    let valid = true;

    // validate email
    if (!employee_email) {
      setEmailError('Email is required');
      valid = false;
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError('Email address is invalid');
        valid = false;
      } else {
        setEmailError('');
      }
    }

    // validate first name
    if (!employee_first_name) {
      setFirstNameError('First name is required');
      valid = false;
    } else {
      setFirstNameError('');
    }

    // validate last name
    if (!employee_last_name) {
      setLastNameError('Last name is required');
      valid = false;
    } else {
      setLastNameError('');
    }

    // validate phone
    if (!employee_phone) {
      setPhoneError('Phone number is required');
      valid = false;
    } else {
      const regexP = /^\+\d{1,3}\d{4,14}(?:x.+)?$/;
      if (!regexP.test(employee_phone)) {
        setPhoneError('Phone number is invalid. Include country code e.g +251900123456');
        valid = false;
      } else {
        setPhoneError('');
      }
    }

    // validate password
    if (!employee_password || employee_password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    // if all validations pass, prepare data
    const formData = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      active_employee,
      company_role_id,
      employee_password,
    };

    const newEmployee = employeeService.createEmployee(formData);
    newEmployee.then((response) => response.json())
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
        {success && <div className="success">Employee added successfully</div>}

        <div className="contact-title">
          <h2>Add a new employee</h2>
          <div className="row clearfix">
            {/* Form Column */}
            <div className="form-column col-lg-7">
              <div className="inner-column">
                {/* Contact Form */}
                <div className="contact-form">
                  <form method="post" onSubmit={handleSubmit} className="add-employee-form">
                    {serverError && <div className="error" role="alert">{serverError}</div>}
                    <div className="row clearfix">
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="email"
                          value={employee_email}
                          onChange={(e) => setEmployeeEmail(e.target.value)}
                          placeholder="Employee email"
                          required
                        />
                        {emailError && <div className="error" role="alert">{emailError}</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="firstName"
                          value={employee_first_name}
                          onChange={(e) => setEmployeeFirstName(e.target.value)}
                          placeholder="Employee first name"
                          required
                        />
                        {firstNameError && <div className="error">{firstNameError}</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="lastName"
                          value={employee_last_name}
                          onChange={(e) => setEmployeeLastName(e.target.value)}
                          placeholder="Employee last name"
                          required
                        />
                        {lastNameError && <div className="error" role="alert">{lastNameError}</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="phone"
                          value={employee_phone}
                          onChange={(e) => setEmployeePhone(e.target.value)}
                          placeholder="Employee phone (+251900123456)"
                          required
                        />
                        {phoneError && <div className="error" role="alert">{phoneError}</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <select
                          name="role"
                          value={company_role_id}
                          onChange={(e) => setCompanyRoleId(e.target.value)}
                          required
                        >
                          <option value="1">Employee</option>
                          <option value="2">Admin</option>
                          <option value="3">Manager</option>
                        </select>
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="password"
                          name="password"
                          value={employee_password}
                          onChange={(e) => setEmployeePassword(e.target.value)}
                          placeholder="Employee password"
                          required
                        />
                        {passwordError && <div className="error">{passwordError}</div>}
                      </div>

                      <div className="form-group col-md-12">
                        <button className="theme-btn btn-style-one" type="submit">
                          <span>ADD EMPLOYEE</span>
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

export default AddEmployeeForm;
