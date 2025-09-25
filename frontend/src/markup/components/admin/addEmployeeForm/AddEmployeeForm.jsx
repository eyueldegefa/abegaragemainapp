import React from 'react'

function AddEmployeeForm() {
  return (
    <>
            {/* <!--Contact Section--> */}
      <section class="contact-section">
           <div class="auto-container">
              <div class="contact-title">
                  <h2>Log into you account</h2>
                  <div class="row clearfix">
                      {/* <!--Form Column--> */}
                      <div class="form-column col-lg-7">
                          <div class="inner-column">
                              {/* <!--Contact Form--> */}
                              <div class="contact-form">
                                  <form method="post" action="sendemail.php" id="contact-form">
                                      <div class="row clearfix">
                                          <div class="form-group col-md-12">
                                              <input type="text" name="form_name" value="" placeholder="Email" required />
                                          </div>
                                          
                                          <div class="form-group col-md-12">
                                              <input type="text" name="email" value="" placeholder="Password" required />
                                          </div>
                                          
                                          <div class="form-group col-md-12">
                                              <input id="form_botcheck" name="form_botcheck" class="form-control" type="hidden" value=""/>
                                              <button class="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Log in</span></button>
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