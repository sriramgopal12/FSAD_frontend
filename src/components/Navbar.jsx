import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import logo from './images/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // State to track scroll position

  // Get the current route
  const location = useLocation();

  // Check if the current route is Login or Register
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  // Handle scroll event to toggle navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Set to floating navbar when scrolled
      } else {
        setIsScrolled(false); // Reset to fixed navbar
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        isScrolled
          ? 'bg-gray-800 text-white fixed top-6 left-1/2 transform -translate-x-1/2 w-11/12 max-w-7xl rounded-full shadow-lg py-3 px-6 z-50'
          : 'bg-gray-800 text-white fixed top-0 left-0 w-full shadow-md py-4 px-6 z-50'
      } transition-all duration-300`}
    >
      <div className="max-w-7xl m-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <RouterLink to="/" className="flex items-center space-x-2">
            <img
              src={logo} // Use the provided logo path
              alt="LearningHub Logo"
              className="h-10 w-10 rounded-full"
            />
            <span className="text-xl font-bold">LearningHub</span>
          </RouterLink>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {/* Conditionally render the dropdown menu */}
          {!isAuthPage && (
            <>
              <ScrollLink
                to="hero"
                smooth={true}
                duration={500}
                className="text-sm font-medium hover:text-blue-500 cursor-pointer"
              >
                Home
              </ScrollLink>
              <ScrollLink
                to="about"
                smooth={true}
                duration={500}
                className="text-sm font-medium hover:text-blue-500 cursor-pointer"
              >
                About
              </ScrollLink>
              <ScrollLink
                to="features"
                smooth={true}
                duration={500}
                className="text-sm font-medium hover:text-blue-500 cursor-pointer"
              >
                Features
              </ScrollLink>
              <ScrollLink
                to="contact"
                smooth={true}
                duration={500}
                className="text-sm font-medium hover:text-blue-500 cursor-pointer"
              >
                Contact
              </ScrollLink>
            </>
          )}

          {/* Login and Register Buttons */}
          <RouterLink
            to="/login"
            className="px-4 py-2 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-100"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/register"
            className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium hover:bg-blue-600"
          >
            Register
          </RouterLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="-mr-2 flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {!isAuthPage && (
              <>
                <ScrollLink
                  to="hero"
                  smooth={true}
                  duration={500}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 cursor-pointer"
                >
                  Home
                </ScrollLink>
                <ScrollLink
                  to="about"
                  smooth={true}
                  duration={500}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 cursor-pointer"
                >
                  About
                </ScrollLink>
                <ScrollLink
                  to="features"
                  smooth={true}
                  duration={500}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 cursor-pointer"
                >
                  Features
                </ScrollLink>
                <ScrollLink
                  to="content"
                  smooth={true}
                  duration={500}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 cursor-pointer"
                >
                  Content
                </ScrollLink>
                <ScrollLink
                  to="contact"
                  smooth={true}
                  duration={500}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 cursor-pointer"
                >
                  Contact
                </ScrollLink>
              </>
            )}

            {/* Login and Register Buttons for Mobile */}
            <RouterLink
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium"
            >
              Login
            </RouterLink>
            <RouterLink
              to="/register"
              className="block px-3 py-2 rounded-md text-base font-medium"
            >
              Register
            </RouterLink>
          </div>
        </div>
      )}
    </nav>
  );
}