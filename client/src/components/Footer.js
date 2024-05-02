import React from 'react';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { FiPhoneCall } from 'react-icons/fi';
import { BsFacebook, BsLinkedin } from 'react-icons/bs';
import { PiInstagramLogoFill } from 'react-icons/pi';

const Footer = () => {

    const footerStyle = {
        backgroundColor: '#333',
        color: 'white',
        padding: '10px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column', // Make it a column flex container
        minHeight: '100%', // Ensure it takes at least the full viewport height
      };
    return (
        <footer className="bg-dark text-white" style={footerStyle}>
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Contact</h5>
                        <ul className="list-unstyled">
                            <li><MdEmail /> ecowaste@gmail.com</li>
                            <li><FiPhoneCall /> 071 159 0500</li>
                            <li><MdLocationOn /> 168/7/4b, Tramqioo Terrace, New Kandy Road, Malabe</li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/working-days">Working Days</a></li>
                            <li><a href="/services">Services</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4 d-flex flex-column justify-content-start align-items-start">
                        <h5>Follow Us</h5>
                        <ul className="list-unstyled d-flex">
                            <li><BsFacebook size={40} /></li>
                            <li><PiInstagramLogoFill size={40} /></li>
                            <li><BsLinkedin size={40} /></li>
                        </ul>
                        <div>
                            <div><a href="/privacy-policy">Privacy Policy</a></div>
                            <div><a href="/terms-and-conditions">Terms & Conditions</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
