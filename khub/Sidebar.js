import React, { useState } from 'react';

// Importing necessary icons
import { FaHome, FaUniversity,  FaUsers, FaCalendarAlt, FaBook, FaStar, FaCertificate, FaBars } from 'react-icons/fa'; // Added new icons
import { AiOutlineClose } from 'react-icons/ai';

// CSS
import './Sidebar.css';

const menuItems = [
  { icon: <FaHome size={25} />, label: 'Home' },
  { icon: <FaUniversity size={25} />, label: 'Colleges' },
  { icon: <FaUsers size={25} />, label: 'Teams' }, // Added Teams
  { icon: <FaCalendarAlt size={25} />, label: 'Calendar' }, // Added Calendar
  { icon: <FaBook size={25} />, label: 'My Courses' }, // Added My Courses
  { icon: <FaUsers size={25} />, label: 'Students' }, // Added Students
  { icon: <FaStar size={25} />, label: 'Reviews' }, // Added Reviews
  { icon: <FaCertificate size={25} />, label: 'Certificates' } // Added Certificates
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Start with the sidebar open

  return (
    <nav className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
      <div className="top-section">
        <div className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <AiOutlineClose size={25} /> : <FaBars size={25} />}
        </div>
      </div>
      
      <ul className="menu">
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item">
            <div className="icon">{item.icon}</div>
            {isOpen && <span className="label">{item.label}</span>}
            <div className="tooltip">{item.label}</div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
