import React, { useState } from 'react';
import { Sling as Hamburger } from 'hamburger-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../public/logo.png'; // adjust as needed

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollLinks = [
    { name: 'Home', target: 'home' },
    { name: 'How it Works', target: 'howitworks' },
    { name: 'Features', target: 'features' },
    { name: 'FAQ', target: 'faq' },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="cursor-pointer">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {scrollLinks.map(({ name, target }) => (
            <li key={target}>
              <Link to="/" state={{ scrollTo: target }} className="hover:text-blue-600">
                {name}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/blog" className="hover:text-blue-600">Blog</Link>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <Hamburger
            toggled={isOpen}
            toggle={setIsOpen}
            color="#4B5563"
            size={26}
            rounded
            direction="right"
            duration={0.4}
          />
        </div>
      </div>

      {/* Mobile Menu */}
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
                {scrollLinks.map(({ name, target }) => (
                  <li key={target}>
                    <Link
                      to="/"
                      state={{ scrollTo: target }}
                      onClick={toggleMenu}
                      className="hover:bg-blue-700 px-4 py-2 rounded transition"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/blog"
                    onClick={toggleMenu}
                    className="hover:bg-blue hover:text-blue-600 px-4 py-2 rounded transition"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
