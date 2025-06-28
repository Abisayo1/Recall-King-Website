import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home.jsx';
import HowitWorks from './components/HowitWorks';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BlogPage from './Blog.jsx';  // 👈 Import your new Blog Page here

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20 scroll-smooth">
        <Routes>
          {/* Home/Landing Page */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <HowitWorks />
                <Features />
                <FAQ />
                <Footer />
              </>
            }
          />

          {/* Blog Page */}
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
