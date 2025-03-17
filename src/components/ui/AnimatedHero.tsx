"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const AnimatedHero = () => {
  // Generate a deterministic array of particles
  const particles = useMemo(() => {
    const particlesArray = [];
    for (let i = 0; i < 30; i++) {
      particlesArray.push({
        id: i,
        x: (i * 71) % 100, // Pseudo-random but deterministic
        y: (i * 37) % 100,
        size: ((i % 3) + 1) * 2,
        duration: 15 + (i % 10)
      });
    }
    return particlesArray;
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Mountain-inspired gradient background */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          background: 'linear-gradient(to bottom, #003135 0%, #024950 40%, #0FA4AF 80%, #AFDDE5 100%)',
        }}
      />
      
      {/* Mountain silhouettes */}
      <div className="absolute bottom-0 w-full h-[200px] z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0">
          <path fill="#003135" fillOpacity="0.5" d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,208C840,213,960,203,1080,192C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0">
          <path fill="#024950" fillOpacity="0.7" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,165.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-cyan-100 opacity-50"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: ['0%', '100%', '0%'],
            opacity: [0.1, 0.8, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Hero content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Find Your Dream Job
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl mb-8 text-cyan-100 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover thousands of opportunities that match your skills and career goals
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="btn-primary px-8 py-3 rounded-full text-lg font-medium">
            Search Jobs
          </button>
          <button className="btn-accent px-8 py-3 rounded-full text-lg font-medium">
            For Employers
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedHero; 