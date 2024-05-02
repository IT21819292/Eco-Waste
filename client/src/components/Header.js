import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import truck from '.././images/trucks_copy.jpeg';
import { Link } from 'react-router-dom';

const Header = () => {
    const headerStyle = {
        color: 'white',
        padding: '0px',
        height: '300px',
        width: '100%',
        display: 'flex',
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: '999',
        backgroundImage: `url(${truck})`, // Set the background image
        backgroundSize: 'cover', // Ensure the image covers the entire header
        position: 'relative', // Add position relative to make ::before pseudo-element work
    };

    const overlayStyle = {
        content: '',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)', // Adjust opacity (0.5 for 50% opacity)
    };

    const navItemStyle = {
        marginRight: '15px',
    };

    return (
        <div style={headerStyle}>
            <div style={overlayStyle}>
                <div className="w-100 p-0 overflow-x-hidden">
                    <div className="row">
                        <div className="col-12 w-100">
                            <nav className="navbar navbar-expand-lg navbar-light w-100">
                                <a className="navbar-brand" href="/">
                                    {/* logo */}
                                </a>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarNav"
                                    aria-controls="navbarNav"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNav">
                                    <ul className="navbar-nav ml-auto w-100 justify-content-end">
                                        <li className="nav-item" style={navItemStyle}>
                                            <a className="nav-link text-light" href="/">
                                                HOME
                                            </a>
                                        </li>
                                        <li className="nav-item" style={navItemStyle}>
                                            <a className="nav-link text-light" href="/about">
                                                ABOUT US
                                            </a>
                                        </li>
                                        <li className="nav-item" style={navItemStyle}>
                                            <a className="nav-link text-light" href="/services">
                                                WORKING DAYS
                                            </a>
                                        </li>
                                        <li className="nav-item" style={navItemStyle}>
                                            <a className="nav-link text-light" href="/contact">
                                                SERVICES
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-light" href="/contact">
                                                <BsPersonCircle size={40} />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div className="row w-100 text-center">
                        <div style={{ fontSize: '50px', fontWeight: 'bold' }}>
                            <span className='text-light'>TRUCK </span>
                            <span className='text-success'>MAINTENANCE</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="d-flex flex-row justify-content-center">
                            <Link to="/dashboard" className='btn btn-success text-light m-3'>DASHBOARD</Link>
                            <Link to="/maintenance-summary" className='btn btn-success text-light m-3'>MAINTENANCE SUMMARY</Link>
                            <Link to="/add-truck" className='btn btn-success text-light m-3'>ADD NEW TRUCK</Link>
                            <Link to="/maintenance" className='btn btn-success text-light m-3'>MAINTENANCE</Link>
                            <Link to="/view-requests" className='btn btn-success text-light m-3'>VIEW REQUESTS</Link>
                            <Link to="/assign-truck" className='btn btn-success text-light m-3'>ASSIGN TRUCKS</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
