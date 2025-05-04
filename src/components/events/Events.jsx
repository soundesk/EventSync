import React from 'react';
import './Events.css';
import { motion } from 'framer-motion';
import { Ticket } from 'lucide-react';
import elbasta from '../../assets/image4.png';
import el9ante from '../../assets/image5.png';
import tedx from '../../assets/tedx.png';
import arrow from '../../assets/weui_arrow-filled.png';
import { Link } from 'react-router-dom'; 
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Events = () => {
  return (
    <div className="Events">
      <motion.div
        className="event-text"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h1>WHAT AWAITS YOU!</h1>
        <p>
          This month, we’re bringing you a whirlwind of culture, music, and innovation—where heritage shakes hands with the future. Dive into electrifying events, from high-energy festivals to exclusive club nights. Every moment is crafted to thrill. Don’t just witness it—live it.
        </p>
      </motion.div>

      <div className="event-gallery">
        {[{
          image: elbasta,
          title: 'El Basta',
          description: 'Their show, a true blend of heritage and modernity, never fails to captivate an ever-growing audience, always in an electrifying atmosphere!',
          price: '2500 DA',
          category: 'Concert',
        }, {
          image: el9ante,
          title: 'El9ante Comedy Club',
          description: 'This month, we’ve cooked up a packed schedule for you—and trust us, no joke! 🤩. Book now!',
          price: '1500 DA',
          category: 'Comedy',
        }, {
          image: tedx,
          title: 'TEDx in Boumerdes',
          description: 'TEDx University of Boumerdes: An inspiring day with incredible speakers to broaden our horizons in Science and Technology!',
          price: '500 DA',
          category: 'Conference',
        }].map((event, index) => (
               
          <motion.div
            className="Event"
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1, delay: index * 0.01 }}
            viewport={{ once: true }}
          >
            <img src={event.image} alt={event.title} />
            <div className="event-info">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div className="category-badge">{event.category}</div>
              <div className="event-footer">
                <span className="price">{event.price}</span>
                <Link
                   to="/buy-ticket"
                   state={{ title: event.title, price: event.price }}
                >
                  <button className="buy-btn">
                    <Ticket size={16} color="black" />
                    <span>Buy Ticket</span>
                  </button>
                </Link>

              </div>
            </div>
          </motion.div>
          
        ))}
      </div>

      <div className="arrow-wrapper">
  <Link to="/all-events">
    <button className="arrow-btn">
      <img src={arrow} alt="View All Events" />
    </button>
  </Link>
</div>

    </div>
  );
};

export default Events;
