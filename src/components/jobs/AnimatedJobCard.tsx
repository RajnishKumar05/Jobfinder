"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

interface JobCardProps {
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    remote: boolean;
    description: string;
    posted: string;
    logo?: string;
  };
  index: number;
  showFullDescription?: boolean;
}

// Animation variants to avoid duplicate code
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      delay: Math.min(index * 0.1, 0.5),
      ease: "easeOut" 
    }
  })
};

export default function AnimatedJobCard({ job, index, showFullDescription = false }: JobCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Calculate truncated description once
  const displayDescription = showFullDescription
    ? job.description
    : job.description.length > 100 
      ? `${job.description.substring(0, 100)}...` 
      : job.description;

  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-sm hover:shadow-xl transition-shadow border border-teal-100"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <motion.div 
            className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center text-teal-600 font-bold text-xl"
            whileHover={{ rotate: 5 }}
          >
            {job.logo && !imageError ? (
              <img 
                src={job.logo} 
                alt={`${job.company} logo`} 
                className="w-full h-full object-contain" 
                onError={() => setImageError(true)}
              />
            ) : (
              job.company.charAt(0)
            )}
          </motion.div>
          <div>
            <h2 className="text-xl font-semibold mb-1 text-gray-800">{job.title}</h2>
            <p className="text-teal-600 font-medium">{job.company}</p>
          </div>
        </div>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {job.posted}
        </span>
      </div>
      
      <p className="text-gray-600 mt-3 mb-3">{job.location}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-cyan-100 text-teal-800 text-xs px-2 py-1 rounded">
          {job.type}
        </span>
        {job.remote && (
          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
            Remote
          </span>
        )}
      </div>
      
      <p className="text-gray-700 mb-4">
        {displayDescription}
      </p>
      
      <div className="flex justify-between items-center pt-2 border-t border-teal-100">
        <motion.div whileHover={{ x: 3 }}>
          <Link 
            href={`/jobs/${job.id}`} 
            className="text-cyan-600 font-medium hover:underline flex items-center gap-1"
          >
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
        <motion.button 
          className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Apply Now
        </motion.button>
      </div>
    </motion.div>
  );
} 