import Events from './components/events/Events.jsx';
import Hero from './components/hero/Hero.jsx';
import Selltickets from './components/selltickets/Selltickets.jsx';

const App = () => {
  return (
    <div className="main-sections">
      <Hero />
      <Events />
      <Selltickets />
    </div>
  );
};

export default App;