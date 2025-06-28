import React from "react";
import { FaCar, FaHome, FaShoppingCart, FaPhone, FaFacebook, FaYoutube, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Home() {
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
          <FaFacebook className="text-blue-600" />
          <FaYoutube className="text-red-500" />
          <FaLinkedin className="text-blue-700" />
          <FaInstagram className="text-pink-500" />
        </div>
      </div>

      {/* Right Side Image + Bubbles */}
      <div className="relative w-full max-w-xl">
        {/* Family Image */}
        <img
          src="/family.png" // Place your image in the public folder as "family.png"
          alt="Happy Family"
          className="rounded-xl w-full object-cover"
        />

        {/* Floating Car Loan Bubble */}
        <div className="absolute top-28 left-4 bg-white shadow-lg flex items-center gap-2 px-4 py-2 rounded-full">
          <FaCar className="text-blue-600" />
          <span className="text-sm font-medium">Car Recalls</span>
        </div>

        {/* Floating Home Loan Bubble */}
        <div className="absolute top-80 right-4 bg-white shadow-lg flex items-center gap-2 px-4 py-2 rounded-full">
          <FaShoppingCart className="text-blue-600" />
          <span className="text-sm font-medium">Product Recalls</span>
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
