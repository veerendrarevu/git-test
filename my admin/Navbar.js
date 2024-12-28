import React from 'react';
import './Navbar.css';
import { FaBell, FaCommentDots, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    return (
        <div className="navbar">
            <h2>DevOrbit</h2>
            <div className="navbar-icons">
                <FaBell />
                <FaCommentDots />
                <FaUserCircle />
            </div>
        </div>
    );
};

export default Navbar;
