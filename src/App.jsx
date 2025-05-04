import React from 'react';
import Hero from './components/hero/Hero';
import Events from './components/events/Events';
import Selltickets from './components/selltickets/Selltickets';
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="main-sections">
      <Hero />
      <Events />

      {/* Explore All Events Button */}
      

      <Selltickets />
    </div>
  );
};

export default App;
