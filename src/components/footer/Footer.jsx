import React from 'react';
import './Footer.css';
import logo from '../../assets/EventSyncLogo.png'; // replace with your actual logo path
import facebookIcon from '../../assets/facebook.png'; // replace with actual path
import instagramIcon from '../../assets/instagram.png'; // replace with actual path
import linkedinIcon from '../../assets/linkedin.png'; // replace with actual path

const Footer = () => {
  return (
    <footer className="footer">
      <img src={logo} alt="Event Logo" className="footer-logo" />
      <span className="footer-text">© 2025 All rights reserved.</span>
      <div className="footer-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src={facebookIcon} alt="Facebook" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <img src={linkedinIcon} alt="LinkedIn" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={instagramIcon} alt="Instagram" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
