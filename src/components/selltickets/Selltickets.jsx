import React from 'react';
import './Selltickets.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Selltickets = () => {
  return (
    <div className="Selltickets">
      <div className="Sell-text">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          SELL EVENT TICKETS ON THE MOST <br />
          POWERFUL EVENTS PLATFORM
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          📢  Sell tickets in 5 minutes <br />
          📊 Real-time sales dashboard <br />
          🌐 Promote to 50k+ active users <br />
        </motion.p>
      </div>
      
      <motion.div 
        className="get-started-wrapper"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Link to="/signup"><button className='get-started-btn'>Get started</button></Link>
        <div className='blur-behind'></div>
      </motion.div>
    </div>
  );
};

export default Selltickets;
