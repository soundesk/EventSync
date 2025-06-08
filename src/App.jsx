import React from 'react';
import BuyTicket from './components/buyticket/BuyTicket.jsx';
import Events from './components/events/Events.jsx';
import Hero from './components/hero/Hero.jsx';

const App = () => {
  return (
    <div className="main-sections">
      <Hero />
      <Events />
      <BuyTicket />
    </div>
  );
};

export default App;