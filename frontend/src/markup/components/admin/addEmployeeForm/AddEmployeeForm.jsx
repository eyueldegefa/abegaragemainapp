import React from 'react'
import './AddEmployeeForm.css'

function AddEmployeeForm() {
  return (
    <>
            {/* <!--Contact Section--> */}
      <section class="contact-section">
           <div class="auto-container">
              <div class="contact-title">
                  <h2>Add a new employee</h2>
                  <div class="row clearfix">
                      {/* <!--Form Column--> */}
                      <div class="form-column col-lg-7">
                          <div class="inner-column">
                              {/* <!--Contact Form--> */}
                              <div class="contact-form">
                                  <form method="post" id="contact-form" className='add-employee-form'>
                                      <div class="row clearfix">
                                            <div class="form-group col-md-12">
                                                <input type="text" name="email" value="" placeholder="Employee email" required />
                                            </div>

                                            <div class="form-group col-md-12">
                                              <input type="text" name="email" value="" placeholder="Employee first name" required />
                                            </div>

                                            <div class="form-group col-md-12">
                                              <input type="text" name="email" value="" placeholder="Employee last name" required />
                                            </div>

                                            <div class="form-group col-md-12">
                                              <input type="text" name="email" value="" placeholder="Employee phone(+251900123456)" required />
                                            </div>

                                            <div class="form-group col-md-12">
                                              <select name="role" id="">
                                                <option value="employee">Employee</option>
                                                <option value="admin">Admin</option>
                                                <option value="employee">Manager</option>
                                              </select>
                                            </div>

                                            <div class="form-group col-md-12">
                                                <input type="text" name="email" value="" placeholder="Employee password" required />
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
}

export default AddEmployeeForm