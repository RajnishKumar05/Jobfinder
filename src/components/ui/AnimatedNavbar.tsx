"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const navItems = [
    { 
      name: "Jobs", 
      link: "/jobs",
      dropdown: [
        { name: "Browse All", link: "/jobs" },
        { name: "Remote Jobs", link: "/jobs?remote=true" },
        { name: "Full-time", link: "/jobs?type=full-time" },
        { name: "Part-time", link: "/jobs?type=part-time" },
      ]
    },
    { 
      name: "Companies", 
      link: "/companies",
      dropdown: [
        { name: "Top Companies", link: "/companies" },
        { name: "By Industry", link: "/companies/industries" },
        { name: "By Location", link: "/companies/locations" },
      ]
    },
    { name: "Dashboard", link: "/dashboard" },
    { name: "Profile", link: "/profile" },
  ];

  return (
    <motion.header 
      className="bg-gradient-to-r z-[999] from-teal-900 to-cyan-800 text-white py-4 relative"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <motion.div 
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 10, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>
            <motion.h1 
              className="text-2xl font-bold"
              whileHover={{ 
                textShadow: "0px 0px 8px rgb(255 255 255 / 0.8)"
              }}
            >
              JobFinder
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <div 
                key={item.name} 
                className="relative"
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link href={item.link}>
                  <motion.span 
                    className="font-medium hover:underline cursor-pointer flex items-center"
                    whileHover={{ y: -2 }}
                  >
                    {item.name}
                    {item.dropdown && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </motion.span>
                </Link>
                
                {item.dropdown && (
                  <AnimatePresence>
                    {hoveredItem === item.name && (
                      <motion.div
                        className="absolute left-0  mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-[999]"
                        initial={{ opacity: 0, y: -5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <Link href={dropdownItem.link} key={dropdownItem.name}>
                            <motion.div
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50"
                              whileHover={{ x: 2, backgroundColor: "#e6f7f9" }}
                            >
                              {dropdownItem.name}
                            </motion.div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <div
                className="relative"
                onMouseEnter={() => setHoveredItem("Auth")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative group">
                  <Link href="/auth/login"
                    className="ml-4 px-4 py-2  text-white-800 font-semibold rounded-lg border border-teal-200 hover:bg-cyan-50 transition-colors duration-200 flex items-center gap-1"
                  >
                    <span>Sign In</span>
                    <svg className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-1 transition-all duration-200 z-[999] transform origin-top">
                    <div className="py-2 border-b border-gray-100">
                      <h3 className="px-4 py-1 text-xs font-semibold text-gray-500">LOGIN AS</h3>
                      <Link href="/auth/login?type=employee" className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 flex items-center gap-2">
                        <svg className="w-4 h-4 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
                        </svg>
                        Job Seeker
                      </Link>
                      <Link href="/auth/login?type=employer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 flex items-center gap-2">
                        <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1H7a1 1 0 00-1 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"></path>
                        </svg>
                        Employer
                      </Link>
                    </div>
                    <div className="py-2">
                      <h3 className="px-4 py-1 text-xs font-semibold text-gray-500">CREATE ACCOUNT</h3>
                      <Link href="/auth/register?type=employee" className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 flex items-center gap-2">
                        <svg className="w-4 h-4 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                        </svg>
                        Job Seeker
                      </Link>
                      <Link href="/auth/register?type=employer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 flex items-center gap-2">
                        <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                        </svg>
                        Employer
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <motion.button
              className="text-white focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-teal-800 absolute w-full z-[999]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <Link href={item.link}>
                      <motion.div 
                        className="font-medium py-2 block"
                        whileHover={{ x: 5 }}
                      >
                        {item.name}
                      </motion.div>
                    </Link>
                    
                    {item.dropdown && (
                      <div className="pl-4 space-y-2 mt-1 mb-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link href={dropdownItem.link} key={dropdownItem.name}>
                            <motion.div
                              className="block py-1 text-sm text-cyan-100"
                              whileHover={{ x: 3 }}
                            >
                              {dropdownItem.name}
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="py-2 border-t border-gray-100">
                  <div className="px-4 py-2">
                    <button className="w-full py-2 bg-teal-700 text-white rounded hover:bg-teal-600 transition flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <Link href="/auth/login" className="font-medium">Sign In</Link>
                    </button>
                  </div>
                  
                  <div className="px-4 pt-1 pb-2">
                    <div className="text-xs font-semibold text-gray-500 mb-1">LOGIN AS</div>
                    <div className="flex space-x-2">
                      <Link href="/auth/login?type=employee" className="flex-1 py-1.5 px-2 bg-cyan-50 text-cyan-700 font-medium rounded-md text-center text-sm">Job Seeker</Link>
                      <Link href="/auth/login?type=employer" className="flex-1 py-1.5 px-2 bg-teal-50 text-teal-700 font-medium rounded-md text-center text-sm">Employer</Link>
                    </div>
                  </div>
                  
                  <div className="px-4 pt-2 pb-3">
                    <div className="text-xs font-semibold text-gray-500 mb-1">SIGN UP</div>
                    <div className="flex space-x-2">
                      <Link href="/auth/register?type=employee" className="flex-1 py-1.5 px-2 bg-cyan-50 text-cyan-700 font-medium rounded-md text-center text-sm">Job Seeker</Link>
                      <Link href="/auth/register?type=employer" className="flex-1 py-1.5 px-2 bg-teal-50 text-teal-700 font-medium rounded-md text-center text-sm">Employer</Link>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
} 