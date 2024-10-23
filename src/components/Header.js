import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Ensure you have this CSS file for styling

function Header() {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        // Remove token from local storage
        localStorage.removeItem('token');
        // Redirect to login page
        navigate('/login');
    };
    const showNavbar = () => {
        setVisible(true);
    };

    const closeNavbar = () => {
        setVisible(false);
    };

    return (
        <div>
            <nav className='navbar'>
                <h1>BulkEmail</h1>
                <div className='navbar-links'>
                    {/* <p className='navbar-link'><Link to='/'>Home</Link></p> */}
                    {/* <p className='navbar-link'><Link to='/collections'>Collections</Link></p> */}
                    {/* <p className='navbar-link'><Link to='/contact'>Contacts</Link></p> */}
                    <p className='navbar-link'><Link exact to='/login'>Login</Link></p>
                    {/* <p className='navbar-link'><Link to='/signup'>Sign Up</Link></p> */}
                    <p className='navbar-link'><Link to='/account'>My Account</Link></p>
                    {/* <p className='navbar-link'><Link to='/adduser'>Add User</Link></p>
                    <p className='navbar-link'><Link to='/edit/:id'>Edit</Link></p>
                    <p className='navbar-link'><Link to='/forgot-password'>Forgot Password</Link></p>
                    <p className='navbar-link'><Link to='/reset-password/:token'>Reset Password</Link></p> */}
                    <p className='navbar-link'>  <Link onClick={handleLogout} className='navbar-btn btn-logout'>Logout</Link></p>
                </div>
                <div onClick={showNavbar} className='navbar-menu-toggle'>
                    <i className="fa-sharp fa-solid fa-bars"></i>
                </div>
            </nav>
            {/* <h1>BulkEmailTask</h1> */}

            {/* Side Navbar */}
            <div className={`side-navbar ${visible ? 'show' : ''}`}>
                <p onClick={closeNavbar} style={{ textAlign: 'right' }}>
                    <i className="fa-solid fa-xmark"></i>
                </p>
                <div className='side-navbar-links'>
                    {/* Repeat the same links in the side navbar if needed */}
                    <p className='navbar-link'><Link to='/'>Home</Link></p>
                    <p className='navbar-link'><Link to='/collections'>Collections</Link></p>
                    <p className='navbar-link'><Link to='/contact'>Contacts</Link></p>
                    {/* Additional Links in Side Navbar */}
                    <p className='navbar-link'><Link to='/adduser'>Add User</Link></p>
                    <p className='navbar-link'><Link to='/dashboard'>Dashboard</Link></p>
                    <p className='navbar-link'><Link to='/login'>Login</Link></p>
                    <p className='navbar-link'><Link to='/signup'>Sign Up</Link></p>
                    <p className='navbar-link'><Link to='/account'>My Account</Link></p>
                    <p className='navbar-link'><Link to='/edit/:id'>Edit</Link></p>
                    <p className='navbar-link'><Link to='/forgot-password'>Forgot Password</Link></p>
                    <p className='navbar-link'><Link to='/reset-password/:token'>Reset Password</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Header;