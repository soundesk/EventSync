import React, { useState, useEffect, useMemo } from 'react';
import './AllEvents.css';
import { Ticket, Search, Calendar, MapPin, Tag, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllEvents } from '../../services/eventService';
import { useNavigate } from 'react-router-dom';
import elbasta from '../../assets/image4.png';
import el9ante from '../../assets/image5.png';
import tedx from '../../assets/tedx.png';



const categories = [
  { id: 'all', name: 'All Events', icon: Ticket },
  { id: 'comedy', name: 'Comedy', icon: Tag },
  { id: 'concert', name: 'Concert', icon: Tag },
  { id: 'conference', name: 'Conference', icon: Tag },
  { id: 'exhibition', name: 'Exhibition', icon: Tag },
  { id: 'sports', name: 'Sports', icon: Tag },
  { id: 'workshop', name: 'Workshop', icon: Tag },
  { id: 'festival', name: 'Festival', icon: Tag },
  { id: 'meetup', name: 'Meetup', icon: Tag }
];


const AllEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'price'

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (err) {
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    let filtered = events;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(event => 
        event.category.toLowerCase() === activeCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort events
    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date) - new Date(b.date);
      }
      return parseInt(a.price) - parseInt(b.price);
    });
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <motion.div
      className="all-events-page"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="events-header">
        <h2 className="events-heading">Discover Events</h2>
        
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search events, locations, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filters-section">
          <div className="category-tabs">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <Icon size={16} />
                  {cat.name}
                </button>
              );
            })}
          </div>

          <div className="sort-options">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="date">Sort by Date</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {loading ? (
          <div className="loading-container">
            <Loader className="spinner" />
            <p>Loading events...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
          </div>
        ) : (
          <div className="events-grid">
            {filteredEvents.length === 0 ? (
              <motion.div
                className="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No events found matching your criteria
              </motion.div>
            ) : (
              filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="event-row"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <img src={event.image} alt={event.title} />
                  <div className="event-details">
                    <div className="event-header">
                      <h3>{event.title}</h3>
                      <div className="event-meta">
                        <span className="meta-item">
                          <Calendar size={14} />
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="meta-item">
                          <MapPin size={14} />
                          {event.location}
                        </span>
                      </div>
                    </div>
                    <p>{event.description}</p>
                    <div className="tags-container">
                      {event.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                    <div className="card-footer">
                      <span className="price-dark">{event.price}</span>
                      <button className="buy-btn" onClick={() => navigate('/buy-ticket')}>
                        <Ticket size={16} /> Buy Tickets
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AllEvents;
