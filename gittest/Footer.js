import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faPinterest, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';
import logo from './khub.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Section with Logo */}
        <div className="left-section">
          <img src={logo} alt="K-HUB Logo" className="footer-logo" />
        </div>

        {/* Middle Section with Heading, Text, and Social Links */}
        <div className="middle-section">
          <h2 className="footer-heading">Get in Touch</h2>
          <p className="footer-text">
            Ecosystem bootstrapping learning curve lean startup disruptive. Marketing long tail disruptive agile development partner.
          </p>
          <div className="social-links">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faPinterest} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>

        {/* Right Section with Contact Cards aligned side by side */}
        <div className="right-section">
          <div className="contact-card">
            <FontAwesomeIcon icon={faGlobe} className="contact-icon" />
            <p>dribbble.com/example</p>
          </div>
          <div className="contact-card">
            <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
            <p>contact@example.com</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom Text */}
      <div className="footer-bottom">
        <p>© 2023 Kiet-hub (K-HUB). All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
