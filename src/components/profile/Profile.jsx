import { Calendar, Mail, User as UserIcon, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userEvents, setUserEvents] = useState([
    { id: 1, name: 'Team Meeting', date: '2025-05-15', location: 'Conference Room A' },
    { id: 2, name: 'Project Review', date: '2025-05-20', location: 'Virtual' },
  ]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      <motion.div
        className="profile-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="profile-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="profile-avatar">
            <UserIcon size={40} />
          </div>
          <h1>{user.username}</h1>
          <p className="subtitle">Event Organizer</p>
        </motion.div>

        <motion.div
          className="profile-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="profile-section">
            <h2>Profile Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <UserIcon size={20} />
                <div>
                  <label>Username</label>
                  <span>{user.username}</span>
                </div>
              </div>
              <div className="info-item">
                <Mail size={20} />
                <div>
                  <label>Email</label>
                  <span>{user.email}</span>
                </div>
              </div>
              <div className="info-item">
                <Calendar size={20} />
                <div>
                  <label>Member since</label>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Upcoming Events</h2>
            <div className="events-list">
              {userEvents.map(event => (
                <motion.div
                  key={event.id}
                  className="event-card"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3>{event.name}</h3>
                  <div className="event-details">
                    <div className="event-detail">
                      <Clock size={16} />
                      <span>{event.date}</span>
                    </div>
                    <div className="event-detail">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
