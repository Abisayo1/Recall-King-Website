import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FaCar,
  FaPhone,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
  FaShoppingCart,
  FaTwitter,
  FaEnvelope, // 📧 Email icon
} from "react-icons/fa";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const sectionId = location.state?.scrollTo;
    if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState({}, document.title);
        }, 100);
      }
    }
  }, [location]);

  return (
    <section id="home" className="flex flex-col md:flex-row items-center justify-between p-6 md:p-16 bg-gray-50">
      {/* Left Side Text */}
      <div className="max-w-lg mb-10 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Know What’s Recalled <br /> Stay Protected
        </h1>
        <p className="text-gray-600 mb-6">
          Get real-time recall alerts based on your purchases or subscriptions.
        </p>
        <div className="flex gap-4 mb-8">
          <button className="bg-blue-600 text-white px-5 py-3 rounded-md shadow hover:bg-blue-700 transition">
            Download for iPhone
          </button>
          <button className="border border-blue-600 text-blue-600 px-5 py-3 rounded-md hover:bg-blue-50 transition">
            Download for Android
          </button>
        </div>

        {/* Contact Info and Social Icons */}
        <div className="flex items-center gap-4 text-gray-600">
          <FaPhone className="text-green-500" />
          <span>+1 404 857 3245</span>

          {/* 📧 Email Icon */}
          <a
            href="mailto:info@therecallking.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaEnvelope className="text-red-500" />
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61575234003983"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-blue-600" />
          </a>

          <a
            href="https://www.linkedin.com/company/107562109/admin/dashboard/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-blue-700" />
          </a>

          <a
            href="https://www.instagram.com/therecallking?igsh=eGd1Z24wZXUybmp6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-pink-500" />
          </a>

          <a
            href="https://x.com/therecallking?s=21"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-blue-500" />
          </a>
        </div>
      </div>

      {/* Right Side Image + Bubbles */}
      <div className="relative w-full max-w-xl">
        <img
          src="/family.png"
          alt="Happy Family"
          className="rounded-xl w-full object-cover"
        />

        {/* Floating Car Loan Bubble */}
        <div className="absolute top-28 hidden sm:inline left-4 bg-white shadow-lg flex items-center gap-2 px-4 py-2 rounded-full">
          <FaCar className="hidden sm:inline text-blue-600" />
          <span className="text-sm hidden sm:inline font-medium">Car Recalls</span>
        </div>

        {/* Floating Product Recall Bubble */}
        <div className="absolute top-80 right-4 hidden sm:inline bg-white shadow-lg flex items-center gap-2 px-4 py-2 rounded-full">
          <FaShoppingCart className="hidden sm:inline text-blue-600" />
          <span className="text-sm hidden sm:inline font-medium">Product Recalls</span>
        </div>

        {/* Pagination Dots */}
        <div className="absolute right-2 bottom-2 flex flex-col gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
          <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
        </div>
      </div>
    </section>
  );
}
