import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='hero'>
      <div className="find-event-wrapper">
        <Link to="/all-events">
          <button className='find-event-btn'>Find an Event</button>
        </Link>
        <div className='blur-behind'></div>
      </div>
    </div>
  );
};

export default Hero;
