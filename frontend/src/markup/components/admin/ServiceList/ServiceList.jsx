// import react and hooks
import React, { useState, useEffect } from 'react'
// import useAuth
import { useAuth } from '../../../../Contexts/AuthContext'
// import services.service
import Services from '../../../../services/service.service'

function ServiceList() {
    // import states
    const [services, setServices] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState(null);
    // To get the logged in employee token
    const { employee } = useAuth();
    let token = null; // To store the token
    if (employee) {
      token = employee.employee_token;
    }

    useEffect(()=>{
        const allServices = Services.getAllServices(token);
        allServices.then((res)=>{
            if(!res.ok){
                console.log(res.status);
                setApiError(true);
                if (res.status === 401) {
                  setApiErrorMessage("Please login again");
                } else if (res.status === 403) {
                  setApiErrorMessage("You are not authorized to view this page");
                } else {
                  setApiErrorMessage("Please try ffs again later");
                }
                }
                return res.json()
            }).then((data) => {
                if (data.data.length !== 0) {
                  setServices(data.data)
                }
            }).catch((err) => {
              console.log(err);
            })

        }, []);

  return (
    <>
    {apiError ? (
        <section className="contact-section">
            <div className="auto-container">
                <div className="contact-title"> 
                    <h2 className="error">{apiErrorMessage}</h2>
                </div>
            </div>
        </section>
    ) : (
    <section className="contact-section row">
      <div className="auto-container col-12">
        <div className="contact-title">
          <h2>Services</h2>
        </div>
        <div>
            {services.map((service) => (
                <div key={service.service_id}>
                    <h2>{service.service_name}</h2>
                    <p>{service.service_description}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
    )
  }
    </>
  )
}

export default ServiceList