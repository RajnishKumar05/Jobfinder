"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedFilters() {
  const [isExpanded, setIsExpanded] = useState({
    jobType: true,
    remote: true,
    experience: false,
    salary: false
  });

  // Sample salary ranges
  const salaryRanges = [
    "₹0 - ₹3,00,000",
    "₹3,00,000 - ₹6,00,000",
    "₹6,00,000 - ₹10,00,000",
    "₹10,00,000 - ₹15,00,000",
    "₹15,00,000+"
  ];

  // Sample experience levels
  const experienceLevels = [
    "Entry Level",
    "1-3 years",
    "3-5 years",
    "5-10 years",
    "10+ years"
  ];

  const toggleSection = (section: keyof typeof isExpanded) => {
    setIsExpanded({
      ...isExpanded,
      [section]: !isExpanded[section]
    });
  };

  return (
    <motion.div 
      className="bg-white p-5 rounded-lg shadow-sm border border-teal-100"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-semibold mb-4 text-teal-800">Filters</h2>
      
      {/* Job Type Section */}
      <div className="mb-5">
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer"
          onClick={() => toggleSection('jobType')}
        >
          <h3 className="font-medium text-teal-700">Job Type</h3>
          <motion.div
            animate={{ rotate: isExpanded.jobType ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
        
        <AnimatePresence>
          {isExpanded.jobType && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                {["Full-time", "Part-time", "Contract", "Internship", "Freelance"].map((type) => (
                  <motion.div 
                    key={type} 
                    className="flex items-center"
                    whileHover={{ x: 3 }}
                  >
                    <input 
                      type="checkbox" 
                      id={type.toLowerCase()} 
                      className="mr-2 h-4 w-4 accent-cyan-600" 
                    />
                    <label htmlFor={type.toLowerCase()} className="text-gray-700">{type}</label>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Remote Section */}
      <div className="mb-5">
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer group"
          onClick={() => toggleSection('remote')}
        >
          <h3 className="font-medium text-teal-700 group-hover:text-teal-900 transition-colors">Remote</h3>
          <motion.div
            animate={{ rotate: isExpanded.remote ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-cyan-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
        
        <AnimatePresence>
          {isExpanded.remote && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 3 }}
                >
                  <input 
                    type="checkbox" 
                    id="remote-only" 
                    className="mr-2 h-4 w-4 accent-cyan-600" 
                  />
                  <label htmlFor="remote-only" className="text-gray-700">Remote Only</label>
                </motion.div>
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 3 }}
                >
                  <input 
                    type="checkbox" 
                    id="hybrid" 
                    className="mr-2 h-4 w-4 accent-cyan-600" 
                  />
                  <label htmlFor="hybrid" className="text-gray-700">Hybrid</label>
                </motion.div>
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 3 }}
                >
                  <input 
                    type="checkbox" 
                    id="office" 
                    className="mr-2 h-4 w-4 accent-cyan-600" 
                  />
                  <label htmlFor="office" className="text-gray-700">In-Office</label>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Experience Section */}
      <div className="mb-5">
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer group"
          onClick={() => toggleSection('experience')}
        >
          <h3 className="font-medium text-teal-700 group-hover:text-teal-900 transition-colors">Experience Level</h3>
          <motion.div
            animate={{ rotate: isExpanded.experience ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-cyan-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
        
        <AnimatePresence>
          {isExpanded.experience && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                {experienceLevels.map((level) => (
                  <motion.div 
                    key={level} 
                    className="flex items-center"
                    whileHover={{ x: 3 }}
                  >
                    <input 
                      type="checkbox" 
                      id={`exp-${level.replace(/\s+/g, '-').toLowerCase()}`} 
                      className="mr-2 h-4 w-4 accent-cyan-600" 
                    />
                    <label 
                      htmlFor={`exp-${level.replace(/\s+/g, '-').toLowerCase()}`} 
                      className="text-gray-700"
                    >
                      {level}
                    </label>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Salary Section */}
      <div className="mb-5">
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer group"
          onClick={() => toggleSection('salary')}
        >
          <h3 className="font-medium text-teal-700 group-hover:text-teal-900 transition-colors">Salary Range</h3>
          <motion.div
            animate={{ rotate: isExpanded.salary ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-cyan-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
        
        <AnimatePresence>
          {isExpanded.salary && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                {salaryRanges.map((range) => (
                  <motion.div 
                    key={range} 
                    className="flex items-center"
                    whileHover={{ x: 3 }}
                  >
                    <input 
                      type="checkbox" 
                      id={`salary-${range.replace(/[^\w\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`} 
                      className="mr-2 h-4 w-4 accent-cyan-600" 
                    />
                    <label 
                      htmlFor={`salary-${range.replace(/[^\w\s]/g, '').replace(/\s+/g, '-').toLowerCase()}`}
                      className="text-gray-700"
                    >
                      {range}
                    </label>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Location Section */}
      <div className="mb-5">
        <h3 className="font-medium mb-2">Location</h3>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <input 
            type="text" 
            placeholder="City, State, or Country" 
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </motion.div>
      </div>
      
      {/* Filter Footer */}
      <div className="mt-6 space-y-2">
        <button className="w-full py-2 bg-teal-700 text-white rounded hover:bg-teal-600 transition">
          Apply Filters
        </button>
        <button className="w-full py-2 bg-white text-teal-700 border border-teal-700 rounded hover:bg-teal-50 transition">
          Reset All
        </button>
      </div>
    </motion.div>
  );
} 