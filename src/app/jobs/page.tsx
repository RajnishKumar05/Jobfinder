"use client";

import AnimatedNavbar from "@/components/ui/AnimatedNavbar";
import Footer from "@/components/ui/Footer";
import AnimatedJobCard from "@/components/jobs/AnimatedJobCard";
import AnimatedFilters from "@/components/jobs/AnimatedFilters";

// Mock data for job listings
const jobListings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "Bangalore, India",
    type: "Full-time",
    remote: true,
    description: "We are looking for an experienced Frontend Developer proficient in React.js, Next.js, and TypeScript to join our growing team.",
    posted: "2 days ago",
    logo: "/logos/techcorp.png"
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "InnovateTech",
    location: "Mumbai, India",
    type: "Full-time",
    remote: false,
    description: "Join our backend team to build scalable APIs and microservices using Node.js, Express, and MongoDB.",
    posted: "1 week ago",
    logo: "/logos/innovatetech.png"
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "DesignHub",
    location: "Delhi, India",
    type: "Full-time",
    remote: true,
    description: "Looking for a creative UX/UI Designer to create beautiful and functional interfaces for our products.",
    posted: "3 days ago",
    logo: "/logos/designhub.png"
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudNative",
    location: "Hyderabad, India",
    type: "Contract",
    remote: true,
    description: "Experienced DevOps Engineer needed to manage our cloud infrastructure, CI/CD pipelines, and Kubernetes clusters.",
    posted: "5 days ago",
    logo: "/logos/cloudnative.png"
  },
  {
    id: 5,
    title: "Mobile App Developer",
    company: "AppGenius",
    location: "Pune, India",
    type: "Full-time",
    remote: false,
    description: "Develop cross-platform mobile applications using React Native and Firebase for our clients in the healthcare industry.",
    posted: "1 day ago",
    logo: "/logos/appgenius.png"
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "DataMinds",
    location: "Bangalore, India",
    type: "Full-time",
    remote: true,
    description: "Join our data science team to develop machine learning models and analyze large datasets to drive business decisions.",
    posted: "2 weeks ago",
    logo: "/logos/dataminds.png"
  }
];

export default function JobsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <AnimatedNavbar />
      
      <div className="bg-gradient-to-b from-teal-900 to-teal-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Job</h1>
          <p className="text-xl text-cyan-100 mb-8">Browse thousands of job opportunities tailored to your skills and preferences</p>
          
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Job title, keywords, or company" 
              className="flex-1 p-3 border text-black border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input 
              type="text" 
              placeholder="Location" 
              className="flex-1 p-3 border text-black border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button className="bg-teal-700 text-white px-6 py-3 rounded hover:bg-teal-600 transition">
              Search Jobs
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <AnimatedFilters />
          </div>
          
          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-teal-800">Available Jobs</h2>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Sort by:</span>
                <select className="border border-teal-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Newest</option>
                  <option>Relevance</option>
                  <option>Company</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-6">
              {jobListings.map((job, index) => (
                <AnimatedJobCard key={job.id} job={job} index={index} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center items-center mt-10 space-x-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-teal-300 text-teal-700 disabled:opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {[1, 2, 3, 4, 5].map((page) => (
                <button 
                  key={page} 
                  className={`w-10 h-10 rounded-full ${page === 1 ? 'bg-teal-700 text-white' : 'border border-teal-300 text-teal-700 hover:bg-teal-50'}`}
                >
                  {page}
                </button>
              ))}
              
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-teal-300 text-teal-700 hover:bg-teal-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 