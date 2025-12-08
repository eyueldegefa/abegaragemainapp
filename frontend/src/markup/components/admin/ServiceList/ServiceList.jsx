// import react and hooks
import React, { useState, useEffect } from 'react'
// import useAuth
import { useAuth } from '../../../../Contexts/AuthContext'
// import services.service
import Services from '../../../../services/service.service'
import Unauthorized from '../../../pages/unauthorized';
import Loader from '../../Loader/Loader';

function ServiceList() {
    // import states
    const [loading, setLoading] = useState(false);
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
                setApiError(true);
                if (res.status === 401) {
                  setApiErrorMessage("Please login again");
                } else if (res.status === 403) {
                  setApiErrorMessage("Unauthorized");
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
            }).finally(() => {
              setLoading(false);
            });

        }, []);

  return (
    <>
    {loading && <Loader/>}
    {apiError ? (
        <section className="">
            {apiErrorMessage === "Unauthorized" && (
              <>
              <Unauthorized/>
              </>)}
        </section>
    ) : (
    <section className="contact-section row">
      <div className="auto-container col-12">
        <div className="contact-title">
          <h2>Services</h2>
        </div>
        <div>
            {services.map((service) => (
                <section key={service.service_id} className='shadow-sm p-3'>
                    <h2>{service.service_name}</h2>
                    <p>{service.service_description}</p>
                </section>
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