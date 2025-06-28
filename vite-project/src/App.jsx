import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home.jsx';
import HowitWorks from './components/HowitWorks';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <div className="pt-20 scroll-smooth">
        <Home />
        <HowitWorks />
        <Features />
        <FAQ />
        <Footer/>
      </div>
    </div>
  );
}

export default App;
