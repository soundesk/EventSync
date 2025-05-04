import React from 'react';
import './About.css';
import { motion } from 'framer-motion';
import { Sparkles, Users, Calendar } from 'lucide-react'; // Optional icons

const features = [
  {
    icon: <Users size={40} className="feature-icon" />,
    title: 'Connect with People',
    description: 'Discover events and meet like-minded individuals.',
  },
  {
    icon: <Calendar size={40} className="feature-icon" />,
    title: 'Organize Effortlessly',
    description: 'Create and manage your own events in minutes.',
  },
  {
    icon: <Sparkles size={40} className="feature-icon" />,
    title: 'Unforgettable Experiences',
    description: 'Enjoy carefully curated experiences near you.',
  },
];

const About = () => {
  return (
    <motion.div
      className="about-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="about-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Why EventSync?
      </motion.h2>
      <motion.p
        className="about-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        A platform to explore, create, and connect through events.
      </motion.p>

      <div className="about-features">
        {features.map((feature, index) => (
          <motion.div
            className="feature-card"
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
            viewport={{ once: true }}
          >
            {feature.icon}
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default About;
