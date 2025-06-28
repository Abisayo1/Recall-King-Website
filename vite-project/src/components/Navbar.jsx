import React, { useState } from 'react';
import { Sling as Hamburger } from 'hamburger-react'; // Fancy animated hamburger
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../public/logo.png'; // Adjust the path as needed

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#home">
            <img src={logo} alt="Logo" className="h-16 w-auto cursor-pointer" />
          </a>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><a href="#home" className="hover:text-blue-600">Home</a></li>
          <li><a href="#howitworks" className="hover:text-blue-600">How it Works</a></li>
          <li><a href="#features" className="hover:text-blue-600">features</a></li>
          <li><a href="#faq" className="hover:text-blue-600">faq</a></li>
        </ul>

        {/* Fancy Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <Hamburger
            toggled={isOpen}
            toggle={setIsOpen}
            color="#4B5563" // Tailwind's gray-700
            size={26}
            rounded
            direction="right"
            duration={0.4}
          />
        </div>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full right-4 mt-2 w-60 bg-blue-600 text-white rounded-2xl shadow-lg md:hidden z-40"
          >
            <div className="p-6">
              <ul className="flex flex-col space-y-5 text-lg font-semibold">
                {['Home', 'howitworks', 'features', 'faq'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="hover:bg-blue hover:text-blue-600 px-4 py-2 rounded transition"
                      onClick={toggleMenu}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
