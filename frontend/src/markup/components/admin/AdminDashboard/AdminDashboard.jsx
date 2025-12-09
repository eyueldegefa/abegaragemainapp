import React from 'react'
import { Link } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div>

    {/* <!-- Services Section --> */}
    <section class="services-section style-three">
        <div class="auto-container">
            <div class="row">
                {/* List Orders */}
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Open For All</h5>
                        <h2>All Orders</h2 >
                        <Link to="/admin/orders" class="read-more">List of orders  +</Link>
                        <div class="icon"><span class="flaticon-air-conditioning"></span></div>
                    </div>
                </div>
                {/* Add new order */}
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Open For Leads</h5>
                        <h2 className=''>New Order</h2 >
                        <Link to="/admin/add-order" class="read-more">Add new order  +</Link>
                        <div class="icon"><span class="flaticon-air-conditioning"></span></div>
                    </div>
                </div>
                {/* Employee List */}
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Open For Admins</h5>
                        <h2 className=''>Employees</h2 >
                        <Link to="/admin/employees" class="read-more">List of Employees  +</Link>
                        <div class="icon"><span class="flaticon-air-conditioning"></span></div>
                    </div>
                </div>
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2 className=''>Performance Upgrade</h2 >
                        <a href="service-details.html" class="read-more">read more  +</a>
                        <div class="icon"><span class="flaticon-power"></span></div>
                    </div>
                </div>
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Transmission Services</h2 >
                        <a href="service-details.html" class="read-more">read more  +</a>
                        <div class="icon"><span class="flaticon-gearbox"></span></div>
                    </div>
                </div>
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Break Repair & Service</h2 >
                        <a href="service-details.html" class="read-more">read more  +</a>
                        <div class="icon"><span class="flaticon-brake-disc"></span></div>
                    </div>
                </div>
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Engine Service & Repair</h2 >
                        <a href="service-details.html" class="read-more">read more  +</a>
                        <div class="icon"><span class="flaticon-car-engine"></span></div>
                    </div>
                </div>
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Denting & Painting</h2 >
                        <a href="service-details.html" class="read-more">read more  +</a>
                        <div class="icon"><span class="flaticon-spray-gun"></span></div>
                    </div>
                </div>
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Air Conditioning Evac</h2 >
                        <a href="service-details.html" class="read-more">read more  +</a>
                        <div class="icon"><span class="flaticon-air-conditioning"></span></div>
                    </div>
                </div>
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Tyre & Wheels</h2 >
                        <a href="service-details.html" class="read-more">read more  +</a>
                        <div class="icon"><span class="flaticon-tire"></span></div>
                    </div>
                </div>
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>Car Washing</h2 >
                        <a href="service-details.html" class="read-more">read more  +</a>
                        <div class="icon"><span class="flaticon-car-service"></span></div>
                    </div>
                </div>
                <div class="col-lg-4 service-block-one">
                    <div class="inner-box hvr-float-shadow">
                        <h5>Service and Repairs</h5>
                        <h2>General Service</h2 >
                        <a href="service-details.html" class="read-more">read more  +</a>
                        <div class="icon"><span class="flaticon-car-service"></span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default AdminDashboard