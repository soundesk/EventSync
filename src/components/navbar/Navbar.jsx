import React, { useState, useEffect } from 'react';
import './navbar.css';
import EventSyncLogo from '../../assets/EventSyncLogo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-left">
        <Link to="/">
          <img src={EventSyncLogo} alt="EventSync Logo" className="logo" />
        </Link>
      </div>

      <div className="navbar-center">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create-event">Create Event</Link></li>
          <li><Link to="/all-events" >Events</Link></li>

          <li><Link to="/About">About</Link></li>
        </ul>
      </div>

      <div className="navbar-right">
  <Link to="/login">
    <button className="btn">Log in</button>
  </Link>
  <Link to="/signup">
    <button className="btn">Sign Up</button>
  </Link>
</div>

    </nav>
  );
};

export default Navbar;
