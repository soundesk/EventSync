import { User, LogOut } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import EventSyncLogo from '../../assets/EventSyncLogo.png';
import './navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
          {user && <li><Link to="/create-event">Create Event</Link></li>}
          <li><Link to="/all-events">Events</Link></li>
          <li><Link to="/About">About</Link></li>
        </ul>
      </div>

      <div className="navbar-right">
        {user ? (
          <div className="user-menu">
            <Link to="/profile" className="profile-link">
              <User size={24} className="profile-icon" />
              <span className="username">{user.username}</span>
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="btn">Log in</button>
            </Link>
            <Link to="/signup">
              <button className="btn">Sign Up</button>
            </Link>
          </>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
