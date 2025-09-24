import React from 'react'
// import logo
import Logo from '../../../assets/images/logo.png'

function Header() {
  return (
    <>
        {/* // <!-- Main Header --> */}
    <header class="main-header header-style-one">

        {/* <!-- Header Top --> */}
        <div class="header-top">
            <div class="auto-container">
                <div class="inner-container">
                    <div class="left-column">
                        <div class="text">Enjoy with beso while we fix your car</div>
                        <div class="office-hour">Monday - Saturday 2:00AM - 12:00PM</div>
                    </div>
                    <div class="right-column">
                        <div class="phone-number">Schedule Your Appontment Today : <strong>1800 456 7890</strong></div>
                        <div class="language-switcher">
                            <div id="polyglotLanguageSwitcher" class=""></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- Header Upper --> */}
        <div class="header-upper">
            <div class="auto-container">
                <div class="inner-container">
                    {/* <!--Logo--> */}
                    <div class="logo-box">
                        <div class="logo"><a href="index.html"><img src={Logo}/></a></div>
                    </div>
                    <div class="right-column">
                        {/* <!--Nav Box--> */}
                        <div class="nav-outer">
                            {/* <!--Mobile Navigation Toggler--> */}
                            <div class="mobile-nav-toggler"><img src="assets/images/icons/icon-bar.png" alt=""/></div>

                            {/* <!-- Main Menu --> */}
                            <nav class="main-menu navbar-expand-md navbar-light">
                                <div class="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                                    <ul class="navigation">
                                        <li><a href="index.html">Home</a>
                                        </li>
                                        <li><a href="about.html">About Us</a>
                                        </li>
                                        <li><a href="service.html">Services</a>
                                        </li>
                                        <li><a href="contact.html">Contact Us</a></li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                        <div class="search-btn"></div>
                        <div class="link-btn"><a href="login.html" class="theme-btn btn-style-one">Sign in </a></div>
                    </div>                        
                </div>
            </div>
        </div>
        {/* <!--End Header Upper--> */}

        {/* <!-- Sticky Header  --> */}
        <div class="sticky-header">
            {/* <!-- Header Upper --> */}
            <div class="header-upper">
                <div class="auto-container">
                    <div class="inner-container">
                        {/* <!--Logo--> */}
                        <div class="logo-box">
                            <div class="logo"><a href="index.html"><img src="assets/images/logo.png" alt=""/></a></div>
                        </div>
                        <div class="right-column">
                            {/* <!--Nav Box--> */}
                            <div class="nav-outer">
                                {/* <!--Mobile Navigation Toggler--> */}
                                <div class="mobile-nav-toggler"><img src="assets/images/icons/icon-bar.png" alt=""/></div>

                                {/* <!-- Main Menu --> */}
                                <nav class="main-menu navbar-expand-md navbar-light">
                                </nav>
                            </div>
                            <div class="search-btn"></div>
                            <div class="link-btn"><a href="login.html" class="theme-btn btn-style-one">Sign in </a></div>
                        </div>                        
                    </div>
                </div>
            </div>
            {/* <!--End Header Upper--> */}
        </div>
        {/* <!-- End Sticky Menu --> */}

        {/* <!-- Mobile Menu  --> */}
        <div class="mobile-menu">
            <div class="menu-backdrop"></div>
            <div class="close-btn"><span class="icon flaticon-remove"></span></div>
            
            <nav class="menu-box">
                <div class="nav-logo"><a href="index.html"><img src="assets/images/logo3.png" alt="" title=""/></a></div>
                <div class="menu-outer"></div>
            {/* <!--Here Menu Will Come Automatically Via Javascript / Same Menu as in Header--> */}
				{/* <!--Social Links--> */}
				<div class="social-links">
					<ul class="clearfix">
						<li><a href="#"><span class="fab fa-twitter"></span></a></li>
						<li><a href="#"><span class="fab fa-facebook-square"></span></a></li>
						<li><a href="#"><span class="fab fa-pinterest-p"></span></a></li>
						<li><a href="#"><span class="fab fa-instagram"></span></a></li>
						<li><a href="#"><span class="fab fa-youtube"></span></a></li>
					</ul>
                </div>
            </nav>
        </div>
{/* <!-- End Mobile Menu --> */}

        <div class="nav-overlay">
            <div class="cursor"></div>
            <div class="cursor-follower"></div>
        </div>
    </header>
    {/* <!-- End Main Header --> */}
    </>
  )
}

export default Header