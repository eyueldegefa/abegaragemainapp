import React, { useState } from 'react'
// import logo
import Logo from '../../../assets/images/logo.png'
// import loginService
import loginService from '../../../services/login.service';
// import useAuth
import { useAuth } from '../../../Contexts/AuthContext'
// import Link from react-router
import { Link } from 'react-router';
// import css
import './Header.css'

function Header() {
    
    const {isLogged, setIsLogged, employee} = useAuth();
    const [status, setStatus] = useState(false);

    const logOut = () => {
        loginService.logOut();
        setIsLogged(false);
    }


  return (
    <>
        {/* // <!-- Main Header --> */}
    <header className="main-header header-style-one">

        {/* <!-- Header Top --> */}
        <div className="header-top">
            <div className="auto-container">
                <div className="inner-container">
                    <div className="left-column">
                        <div className="text">Enjoy with beso while we fix your car</div>
                        <div className="office-hour">Monday - Saturday 2:00AM - 12:00PM</div>
                    </div>
                    <div className="right-column">
                        {isLogged ? (<div className="phone-number"><strong>Welcome : {employee?.employee_first_name}</strong>  </div>) : (<div className="phone-number">Schedule Your Appointment Today : <strong>1800 456 7890</strong>  </div>)}
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- Header Upper --> */}
        <section className="header-upper">
            <div className="auto-container">
                <div className="inner-container">
                    {/* <!--Logo--> */}
                    <div className="logo-box">
                        <div className="logo"><a href="/"><img src={Logo}/></a></div>
                    </div>
                    <div className="right-column">
                        {/* <!--Nav Box--> */}
                        <div className="nav-outer">
                            {/* <!--Mobile Navigation Toggler--> */}
                            {/* <div className="mobile-nav-toggler"><img src="assets/images/icons/icon-bar.png" alt=""/></div> */}

                            {/* <!-- Main Menu --> */}
                            <nav className="main-menu navbar-expand-md navbar-light">
                                <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                                    <ul className="navigation">
                                        <li><a href="/">Home</a>
                                        </li>
                                        <li><a href="/about">About Us</a>
                                        </li>
                                        <li><a href="/services">Services</a>
                                        </li>
                                        <li><a href="/contact-us">Contact Us</a></li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                        <div className="search-btn"></div>
                        {isLogged ? (<div className="link-btn"><Link to="/" className="theme-btn btn-style-one" onClick={logOut}>Log out </Link></div>) : (<div className="link-btn"><Link to="/login" className="theme-btn btn-style-one">Sign in </Link></div>)}
                        <div className="menu-backdrop"></div>
                        <div className='d-xl-none'
                            onClick={()=>setStatus(!status)}>
                            list
                        </div>
                    </div>                        
                </div>
            </div>
            <div className='blank'></div>

        </section>
        {/* <!--End Header Upper--> */}

        {/* <!-- Mobile Menu  --> */}
        <div className="d-lg-none">
            { status ? (
                <section className="mobile-view">
            <div className="menu-backdrop"></div>
            <div className="close-btn">
                <span className="icon flaticon-remove"
                      onClick={()=>setStatus(!status)}
                >
                </span>
            </div>
            
            <nav className="menu-box">
                <div className="nav-logo">
                    <a href="/">
                        <img src={Logo} alt="" title=""/>
                    </a>
                </div>
                <div className="menu-outer"></div>
                        {/* <!-- Main Menu --> */}
                    <nav className="main-menu navbar-expand-md navbar-light">
                        <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                            <ul className="navigation mobile-links">
                                <li className='text-white'><a href="/">Home</a>
                                </li>
                                <li><a href="/about">About Us</a>
                                </li>
                                <li><a href="/services">Services</a>
                                </li>
                                <li><a href="/contact-us">Contact Us</a></li>
                            </ul>
                        </div>
                    </nav>
    {/* --Here Menu Will Come Automatically Via Javascript / Same Menu as in Header-- */}
				{/* --Social Links-- */}
				<div className="social-links">
					<ul className="clearfix d-flex justify-content-center">
						<li><a href="#"><span className="fab fa-twitter"></span></a></li>
						<li><a href="#"><span className="fab fa-facebook-square"></span></a></li>
						<li><a href="#"><span className="fab fa-pinterest-p"></span></a></li>
						<li><a href="#"><span className="fab fa-instagram"></span></a></li>
						<li><a href="#"><span className="fab fa-youtube"></span></a></li>
					</ul>
                </div>
            </nav>
                </section>
            ) : (null)
            }
        </div>
{/* <!-- End Mobile Menu --> */}

        <div className="nav-overlay">
            <div className="cursor"></div>
            <div className="cursor-follower"></div>
        </div>
    </header>
    {/* /* <!-- End Main Header --> */}
    </>
  )
}

export default Header