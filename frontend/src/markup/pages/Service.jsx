import React from 'react'
// import css
import './AboutUs.css'

function Service() {
  return (
    <div>
            {/* <!-- Page Title --> */}
    <section class="page-title service-bg" >
        <div class="auto-container">
            <h2>Services</h2>
            <ul class="page-breadcrumb">
                <li><a href="index.html">Home</a></li>
                <li>Service</li>
            </ul>
        </div>
        <h1 data-parallax='{"x": 200}'>Services</h1>
    </section>


    {/* <!-- Services Section --> */}
    <section class="services-section style-three">
        <div class="auto-container">
            <div class="sec-title style-two">
                <h2>Services that we offer</h2>
                <div class="text">Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. </div>
            </div>
            <div class="row">
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Performance Upgrade</h2>
                        <a href="service-details.html" class="read-more">read more  +</a>
                        <div class="icon"><span class="flaticon-power"></span></div>
                    </div>
                </div>
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Transmission Services</h2>
                        <a href="service-details.html" class="read-more">read more  +</a>
                        <div class="icon"><span class="flaticon-gearbox"></span></div>
                    </div>
                </div>
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Break Repair & Service</h2>
                        <a href="service-details.html" class="read-more">read more  +</a>
                        <div class="icon"><span class="flaticon-brake-disc"></span></div>
                    </div>
                </div>
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Engine Service & Repair</h2>
                        <a href="service-details.html" class="read-more">read more  +</a>
                        <div class="icon"><span class="flaticon-car-engine"></span></div>
                    </div>
                </div>
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Tyre & Wheels</h2>
                        <a href="service-details.html" class="read-more">read more  +</a>
                        <div class="icon"><span class="flaticon-tire"></span></div>
                    </div>
                </div>
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Denting & Painting</h2>
                        <a href="service-details.html" class="read-more">read more  +</a>
                        <div class="icon"><span class="flaticon-spray-gun"></span></div>
                    </div>
                </div>
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Air Conditioning Evac</h2>
                        <a href="service-details.html" class="read-more">read more  +</a>
                        <div class="icon"><span class="flaticon-air-conditioning"></span></div>
                    </div>
                </div>
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Car Washing</h2>
                        <a href="service-details.html" class="read-more">read more  +</a>
                        <div class="icon"><span class="flaticon-car-service"></span></div>
                    </div>
                </div>
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>General Service</h2>
                        <a href="service-details.html" class="read-more">read more  +</a>
                        <div class="icon"><span class="flaticon-car-service"></span></div>
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