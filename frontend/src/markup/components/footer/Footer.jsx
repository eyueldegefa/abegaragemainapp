import React from 'react'
// import logo
import Logo from '../../../assets/images/logo3.png'
import { Link } from 'react-router'

function Footer() {
  return (
    <>
        {/* <!--Main Footer--> */}
    <footer class="main-footer">
        {/* <!--Upper Box--> */}
        <div class="upper-box">
            <div class="auto-container">
                <div class="row no-gutters">
                    
                    {/* <!--Footer Info Box--> */}
                    <div class="footer-info-box col-md-4 col-sm-6 col-xs-12">
                        <div class="info-inner">
                            <div class="content">
                                <div class="icon">
                                    <span class="flaticon-pin"></span>
                                </div>
                                <div class="text">54B, Tailstoi Town 5238 MT, <br/> La city, IA 522364</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* <!--Footer Info Box--> */}
                    <div class="footer-info-box col-md-4 col-sm-6 col-xs-12">
                        <div class="info-inner">
                            <div class="content">
                                <div class="icon">
                                    <span class="flaticon-email"></span>
                                </div>
                                <div class="text">Email us : <br/> <a href="mailto:contact.contact@autorex.com">contact@autorex.com</a></div>
                            </div>
                        </div>
                    </div>
                    
                    {/* <!--Footer Info Box--> */}
                    <div class="footer-info-box col-md-4 col-sm-6 col-xs-12">
                        <div class="info-inner">
                            <div class="content">
                                <div class="icon">
                                    <span class="flaticon-phone"></span>
                                </div>
                                <div class="text">Call us on : <br/><strong>+ 1800 456 7890</strong></div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
        {/* <!--Widgets Section--> */}
        <div class="widgets-section">
            <div class="auto-container">
                <div class="widgets-inner-container">
                    <div class="row clearfix">
                        
                        {/* <!--Footer Column--> */}
                        <div class="footer-column col-lg-4">
                            <div class="widget widget_about">
                                <div class="logo">
                                    <a href="/"><img src={Logo} alt="" /></a>
                                </div>
                                <div class="text">Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide additional clickthroughs.</div>
                            </div>
                        </div>
                        
                        {/* <!--Footer Column--> */}
                        <div class="footer-column col-lg-4">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="widget widget_links">
                                        <h4 class="widget_title">Usefull Links</h4>
                                        <div class="widget-content">
                                            <ul class="list">
                                                <li><Link to="/">Home</Link></li>
                                                <li><Link to="/about">About Us</Link></li>
                                                <li><Link to="/services">Services</Link></li>
                                                <li><Link to="/contact-us">Contact Us</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="widget widget_links">
                                        <h4 class="widget_title">Our Services</h4>
                                        <div class="widget-content">
                                            <ul class="list">
                                                <li><Link to="/services">Performance Upgrade</Link></li>
                                                <li><Link to="/services">Transmission Service</Link></li>
                                                <li><Link to="/services">Break Repair & Service</Link></li>
                                                <li><Link to="/services">Engine Service & Repair</Link></li>
                                                <li><Link to="/services">Trye & Wheels</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>                                    
                        </div>
                        
                        {/* <!--Footer Column--> */}
                        <div class="footer-column col-lg-4">
                            <div class="widget widget_newsletter">
                                <h4 class="widget_title">Newsletter</h4>
                                <div class="text">Get latest updates and offers.</div>
                                <div class="newsletter-form">
                                </div>
                                <ul class="social-links">
                                    <li><a href="#"><span class="fab fa-facebook-f"></span></a></li>
                                    <li><a href="#"><span class="fab fa-linkedin-in"></span></a></li>
                                    <li><a href="#"><span class="fab fa-twitter"></span></a></li>
                                    <li><a href="#"><span class="fab fa-google-plus-g"></span></a></li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
        {/* <!--Footer Bottom--> */}
        <div class="auto-container">
            <div class="footer-bottom">
                <div class="copyright-text">© Copyright  <a href="#">Abe Garage</a> 2025 . All right reserved.</div>
                <div class="text">Created by <a href="#">Eyuel Degefa</a></div>
            </div>
        </div>
    </footer>
    {/* <!--End Main Footer--> */}
    </>
  )
}

export default Footer