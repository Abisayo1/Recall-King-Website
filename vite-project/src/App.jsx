import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home.jsx";
import HowitWorks from "./components/HowitWorks";
import Features from "./components/Features";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import BlogPage from "./BlogPage.jsx";
import BlogDetails from "./BlogDetails.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import TermsAndConditions from "./TermsAndConditions.jsx";
import RedirectPage from "./pages/OpenRedirect.jsx";

function App() {
  return (
    <>
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
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/download" element={<RedirectPage />} />
          <Route path="/open/*" element={<RedirectPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
