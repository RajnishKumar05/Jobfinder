"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  // Use client-side only rendering for the year
  const [currentYear, setCurrentYear] = useState("2024");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-teal-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">JobFinder</h3>
            <p className="text-cyan-100">
              Connecting talented professionals with amazing job opportunities.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/jobs" className="text-cyan-100 hover:text-white transition-colors">Find Jobs</Link></li>
              <li><Link href="/dashboard" className="text-cyan-100 hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/profile" className="text-cyan-100 hover:text-white transition-colors">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-cyan-100">Email: info@jobfinder.com</p>
            <p className="text-cyan-100">Phone: +91 123-456-7890</p>
          </div>
        </div>
        <div className="border-t border-teal-800 mt-8 pt-8 text-center text-cyan-200">
          <p>&copy; {currentYear} JobFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 