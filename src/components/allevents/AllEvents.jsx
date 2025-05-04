import React, { useState } from 'react';
import './AllEvents.css';
import { Ticket } from 'lucide-react';
import { motion } from 'framer-motion';
import elbasta from '../../assets/image4.png';
import el9ante from '../../assets/image5.png';
import tedx from '../../assets/tedx.png';

const sampleEvents = [
  {
    id: 1,
    title: 'El Basta',
    description: 'A vibrant concert mixing tradition and modern sounds.',
    image: elbasta,
    category: 'Concert',
    price: '2500 DA',
  },
  {
    id: 2,
    title: 'El9ante Comedy Club',
    description: 'Get ready for unstoppable laughter! 🤩',
    image: el9ante,
    category: 'Comedy',
    price: '1500 DA',
  },
  {
    id: 3,
    title: 'TEDx Boumerdes',
    description: 'Explore bold ideas and innovation in tech.',
    image: tedx,
    category: 'Conference',
    price: '500 DA',
  },
];

const categories = ['All', 'Comedy', 'Concert', 'Conference'];

const AllEvents = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredEvents =
    activeCategory === 'All'
      ? sampleEvents
      : sampleEvents.filter(event => event.category === activeCategory);

  return (
    <motion.div
      className="all-events-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h2 className="events-heading">Explore Events by Category</h2>
      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="events-grid">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            className="event-row"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <img src={event.image} alt={event.title} />
            <div className="event-details">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div className="card-footer">
                <span className="price-dark">{event.price}</span>
                <button className="buy-btn">
                  <Ticket size={16} /> Buy
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AllEvents;
