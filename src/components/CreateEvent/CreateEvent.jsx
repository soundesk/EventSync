import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Tag, Image, Info, Users, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../services/eventService';
import { useAuth } from '../../context/AuthContext';
import './CreateEvent.css';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "Concert",
    price: "",
    capacity: "",
    tags: "",
    image: null
  });

  const categories = [
    "Concert",
    "Comedy",
    "Conference",
    "Workshop",
    "Exhibition",
    "Sports",
    "Other"
  ];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Convert tags string to array
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      // Create event data object
      const eventData = {
        ...formData,
        tags: tagsArray,
        createdBy: user.email,
        image: formData.image ? URL.createObjectURL(formData.image) : null
      };

      await createEvent(eventData);
      navigate('/all-events');
    } catch (err) {
      setError(err.message || 'Failed to create event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="create-event-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="create-event-container">
        <motion.div
          className="form-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1>Create a New Event</h1>
          <p>Fill in the details below to create your event</p>
        </motion.div>

        <form className="create-event-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Basic Information */}
            <div className="form-section">
              <h3><Info size={18} /> Basic Information</h3>
              <div className="input-group">
                <input
                  type="text"
                  name="title"
                  placeholder="Event Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Event Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date and Location */}
            <div className="form-section">
              <h3><Calendar size={18} /> Date & Location</h3>
              <div className="input-group">
                <div className="date-time-group">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="location-input">
                  <MapPin size={16} />
                  <input
                    type="text"
                    name="location"
                    placeholder="Event Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Capacity and Price */}
            <div className="form-section">
              <h3><Users size={18} /> Capacity & Price</h3>
              <div className="input-group">
                <div className="capacity-price-group">
                  <div className="price-input">
                    <DollarSign size={16} />
                    <input
                      type="number"
                      name="price"
                      placeholder="Ticket Price (DA)"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <input
                    type="number"
                    name="capacity"
                    placeholder="Max Capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Tags and Image */}
            <div className="form-section">
              <h3><Tag size={18} /> Tags & Media</h3>
              <div className="input-group">
                <input
                  type="text"
                  name="tags"
                  placeholder="Tags (comma separated)"
                  value={formData.tags}
                  onChange={handleChange}
                />
                <div className="file-input-container">
                  <div className="file-input-label">
                    <Image size={16} />
                    <span>Event Image</span>
                  </div>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="file-input"
                  />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <motion.button
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Event'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateEvent;
