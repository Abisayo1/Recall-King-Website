import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home.jsx';
import HowitWorks from './components/HowitWorks';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BlogPage from './BlogPage.jsx';
import BlogDetails from './BlogDetails.jsx'; // ✅ NEW
import PrivacyPolicy from './PrivacyPolicy.jsx';
import TermsAndConditions from './TermsAndConditions.jsx';
import RedirectPage from './RedirectPage.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20 scroll-smooth">
        <Routes>
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
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetails />} /> {/* ✅ NEW */}
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/download" element={<RedirectPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
