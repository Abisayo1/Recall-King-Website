import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home.jsx';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';

function App() {
  return (
    <div>
      <Navbar />
      <div className="pt-20 scroll-smooth">
        <Home />
        <About />
        <Services />
        <Contact />
      </div>
    </div>
  );
}

export default App;
