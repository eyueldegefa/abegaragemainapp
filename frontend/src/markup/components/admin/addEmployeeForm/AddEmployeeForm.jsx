import React, { useState} from 'react'
import './AddEmployeeForm.css'

function AddEmployeeForm() {
   const [employee_email, setEmployeeEmail] = useState('');
   const [employee_first_name, setEmployeeFirstName] = useState('');
   const [employee_last_name, setEmployeeLastName] = useState('');
   const [employee_phone, setEmployeePhone] = useState('');
   const [company_role_id, setCompanyRoleId] = useState('1');
   const [active_employee, setActiveEmployee] = useState('1');
   const [employee_password, setEmployeePassword] = useState('');
  //  Error state
    const [emailError, setEmailError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [success, setSuccess] = useState('false');
    const [passwordError, setPasswordError] = useState('');
    const [serverError, setServerError] = useState('');


   function handleSubmit(e){
      e.preventDefault();
      let valid = true;
      // validate email
      if(!employee_email){
        setEmailError('Email is required');
        valid = false;
      }else {
        const regex = /^\S+@\S+\.\S+$/;
        if(!regex.test(employee_email)){
        setEmailError('Email address is invalid');
        valid = false;
        }else{
          setEmailError('');
        }
      }
      // validate first name
      if(!employee_first_name){
        setFirstNameError('First name is required');
        valid = false;
      }else{
        setFirstNameError('');
      }
      // validate last name
      if(!employee_last_name){
        setLastNameError('Last name is required');
        valid = false;
      } else{
        setLastNameError('');
      }
      // validate phone
      if(!employee_phone){
        setPhoneError('Phone number is required');
        valid = false;
      }else {
        // for All Countries
        const regexP = /^\+\d{1,3}\d{4,14}(?:x.+)?$/;
        if(!regexP.test(employee_phone)){
        setPhoneError('Phone number is invalid. Include country code e.g +251900123456');
        valid = false;
        }else{
          setPhoneError('');
        }
      }
      // validate password
      if(!employee_password || employee_password.length < 6){
        setPasswordError('Password is required and should be at least 6 characters long');
        valid = false;
      } else{
        setPasswordError('');
      }
      // if any validation fails, stop the submission
      if(!valid){
        return;
      } 
      // if all validations pass, prepare the form data
      const formData = {
        employee_email : employee_email,
        employee_first_name : employee_first_name,
        employee_last_name : employee_last_name,
        employee_phone  : employee_phone,
        active_employee   : active_employee,
        company_role_id : company_role_id,
        employee_password : employee_password
      }
      // Send the form data to the server
      }
}


  return (
    <>  
            {/* <!--Contact Section--> */}
      <section class="contact-section">
           <div class="auto-container">
            {success && <div className='success'>Employee added successfully</div>}
              <div class="contact-title">
                  <h2>Add a new employee</h2>
                  <div class="row clearfix">
                      {/* <!--Form Column--> */}
                      <div class="form-column col-lg-7">
                          <div class="inner-column">
                              {/* <!--Contact Form--> */}
                              <div class="contact-form">
                                  <form method="post" onSubmit={handleSubmit} className='add-employee-form'>
                                    {serverError && <div className='error' role='alert'>{serverError}</div>}
                                      <div class="row clearfix">
                                            <div class="form-group col-md-12">
                                                <input type="text" name="email" value={employee_email} onChange={event=> setEmployeeEmail(event.target.value)} placeholder="Employee email" 
                                                required />
                                                {emailError && <div className='error' role='alert'>{emailError}</div>}
                                            </div>

                                            <div class="form-group col-md-12">
                                              <input type="text" name="firstName" value={employee_first_name} onChange={event=>setEmployeeFirstName(event.target.value)} placeholder="Employee first name" required />
                                              {firstNameError && <div className='error'>{firstNameError}</div>}
                                            </div>

                                            <div class="form-group col-md-12">
                                              <input type="text" name="lastName" value={employee_last_name} onChange={event=>setEmployeeLastName(event.target.value)} placeholder="Employee last name" required />
                                              {lastNameError && <div className='error' role='alert'>{lastNameError}</div>}
                                            </div>

                                            <div class="form-group col-md-12">
                                              <input type="text" name="email" value={employee_phone} onChange={event=>setEmployeePhone(event.target.value)} placeholder="Employee phone(+251900123456)" required />
                                              {phoneError && <div className='error' role='alert'>{phoneError}</div>}
                                            </div>

                                            <div class="form-group col-md-12">
                                              <select name="role" id="" value={company_role_id} onChange={event=>setCompanyRoleId(event.target.value)}>
                                                <option value="employee">Employee</option>
                                                <option value="admin">Admin</option>
                                                <option value="employee">Manager</option>
                                              </select>
                                            </div>

                                            <div class="form-group col-md-12">
                                                <input type="text" name="Password" value={employee_password} onChange={event=>setEmployeePassword(event.target.value)} placeholder="Employee password" required />
                                                {passwordError && <div className='error'>{passwordError}</div>}
                                            </div>
                                          
                                          <div class="form-group col-md-12">
                                              <input id="form_botcheck" name="form_botcheck" class="form-control" type="hidden" value=""/>
                                              <button class="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>ADD EMPLOYEE</span></button>
                                          </div>
                                      </div>
                                  </form>
                              </div>
                              {/* <!--End Contact Form--> */}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </> 
  )

export default AddEmployeeForm