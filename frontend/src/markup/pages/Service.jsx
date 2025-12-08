import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import Loader from '../components/Loader/Loader';
// import css
import './ForAll.css'

function Service() {
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading delay (1 second)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className='mt-5'>
            {/* <!-- Page Title --> */}
    <section class="page-title service-bg" >
        <div class="auto-container">
            <h2>Services</h2>
            <ul class="page-breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li>Service</li>
            </ul>
        </div>
        <h1 data-parallax='{"x": 200}'>Services</h1>
    </section>


    {/* <!-- Services Section --> */}
    <section className="services-section">
        <div className="auto-container">
            <div className="sec-title">
                <h2>Our Featured Services</h2>
                <div className="text">Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. </div>
            </div>
            <div className="row">
                <div className="col-lg-4 service-block-one">
                    <div className="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Performance Upgrade</h2>
                        <Link to="/services" className="read-more">read more  +</Link>
                        <div className="icon"><span className="flaticon-power"></span></div>
                    </div>
                </div>
                <div className="col-lg-4 service-block-one">
                    <div className="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Transmission Services</h2>
                        <Link to="/services" className="read-more">read more  +</Link>
                        <div className="icon"><span className="flaticon-gearbox"></span></div>
                    </div>
                </div>
                <div className="col-lg-4 service-block-one">
                    <div className="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Break Repair & Service</h2>
                        <Link to="/services" className="read-more">read more  +</Link>
                        <div className="icon"><span className="flaticon-brake-disc"></span></div>
                    </div>
                </div>
                <div className="col-lg-4 service-block-one">
                    <div className="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Engine Service & Repair</h2>
                        <Link to="/services" className="read-more">read more  +</Link>
                        <div className="icon"><span className="flaticon-car-engine"></span></div>
                    </div>
                </div>
                <div className="col-lg-4 service-block-one">
                    <div className="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Tyre & Wheels</h2>
                        <Link to="/services" className="read-more">read more  +</Link>
                        <div className="icon"><span className="flaticon-tire"></span></div>
                    </div>
                </div>
                <div className="col-lg-4 service-block-one">
                    <div className="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Denting & Painting</h2>
                        <Link to="/services" className="read-more">read more  +</Link>
                        <div className="icon"><span className="flaticon-spray-gun"></span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Video Section --> */}
    <section class="video-section">
        <div data-parallax='{"y": 50}' class="sec-bg" ></div>
        <div class="auto-container">
            <h5>Working since 1992</h5>
            <h2>We are leader <br/> in Car Mechanical Work</h2>
            <div class="video-box">
                <div class="video-btn"><a href="#" class="overlay-link lightbox-image video-fancybox ripple"><i class="flaticon-play"></i></a></div>
                <div class="text">Watch intro video <br/> about us</div>
            </div>
        </div>
    </section>

    {/* <!-- CTA Section --> */}
    <section className="cta-section schedulepart mt-5">
        <div className="auto-container">
            <div className="wrapper-box">
                <div className="left-column">
                    <h3>Schedule Your Appointment Today</h3>
                    <div className="text">Your Automotive Repair & Maintenance Service Specialist</div>
                </div>
                <div className="right-column">
                    <div className="phone">0912345678</div>
                    <div className="btn"><a href="#" className="theme-btn btn-style-one"><span>Contact us</span><i className="flaticon-right"></i></a></div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Service