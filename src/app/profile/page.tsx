"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedNavbar from "@/components/ui/AnimatedNavbar";
import Footer from "@/components/ui/Footer";
import { ResumeData } from "@/components/profile/ResumeBuilder";
import { useRouter } from "next/navigation";

// Import resume builder component
import ResumeBuilder from "@/components/profile/ResumeBuilder";

// Define job interface to match the job data structure used in job cards
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  remote: boolean;
  description: string;
  posted: string;
  logo?: string;
}

interface EmployerFormData {
  // Company Profile
  companyName: string;
  industry: string;
  founded: string;
  size: string;
  website: string;
  location: string;
  about: string;
  logo: null;
  
  // Contact Info
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  
  // Social Media
  linkedin: string;
  twitter: string;
  facebook: string;
  
  // Resume/Job Preferences
  hiringFor: string[];
  benefits: string[];
  culture: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState<EmployerFormData>({
    // Company Profile
    companyName: "",
    industry: "",
    founded: "",
    size: "",
    website: "",
    location: "",
    about: "",
    logo: null,
    
    // Contact Info
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    
    // Social Media
    linkedin: "",
    twitter: "",
    facebook: "",
    
    // Resume/Job Preferences
    hiringFor: [],
    benefits: [],
    culture: ""
  });

  // Resume data state
  const [resumeData, setResumeData] = useState<ResumeData>({
    summary: "",
    education: [],
    experience: [],
    skills: []
  });
  
  const [newHiringPosition, setNewHiringPosition] = useState("");
  const [newBenefit, setNewBenefit] = useState("");
  
  // Job details form for creating job cards
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [currentJobIndex, setCurrentJobIndex] = useState<number | null>(null);
  const [jobDetails, setJobDetails] = useState<Partial<Job>>({
    title: "",
    type: "Full-time",
    remote: false,
    description: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleJobDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue: string | boolean = value;
    
    if (name === "remote") {
      newValue = (e.target as HTMLInputElement).checked;
    }
    
    setJobDetails({
      ...jobDetails,
      [name]: newValue
    });
  };
  
  const addHiringPosition = () => {
    if (newHiringPosition.trim() !== "") {
      // Get the next index to use for the new position
      const newIndex = formData.hiringFor.length;
      
      setFormData({
        ...formData,
        hiringFor: [...formData.hiringFor, newHiringPosition]
      });
      setNewHiringPosition("");
      
      // Trigger job details form when adding a new position
      setShowJobDetails(true);
      setCurrentJobIndex(newIndex);
      setJobDetails({
        title: newHiringPosition,
        type: "Full-time",
        remote: false,
        description: ""
      });
    }
  };
  
  const removeHiringPosition = (index: number) => {
    // Check if currently editing this position and hide form if so
    if (currentJobIndex === index) {
      setShowJobDetails(false);
      setCurrentJobIndex(null);
    }
    
    const updatedPositions = formData.hiringFor.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      hiringFor: updatedPositions
    });
  };
  
  const editJobDetails = (position: string, index: number) => {
    setCurrentJobIndex(index);
    setShowJobDetails(true);
    setJobDetails({
      title: position,
      type: "Full-time", // Default value
      remote: false,     // Default value
      description: ""    // Default value
    });
  };
  
  const saveJobDetails = () => {
    // In a real application, you would save the job details to your database
    // For this demo, we'll just hide the form and show a success message
    setShowJobDetails(false);
    
    // Show which position was saved using currentJobIndex
    if (currentJobIndex !== null) {
      alert(`Job details saved for position #${currentJobIndex + 1}: ${jobDetails.title}`);
    } else {
      alert(`Job details saved for: ${jobDetails.title}`);
    }
    
    // Reset currentJobIndex after saving
    setCurrentJobIndex(null);
  };
  
  const addBenefit = () => {
    if (newBenefit.trim() !== "") {
      setFormData({
        ...formData,
        benefits: [...formData.benefits, newBenefit]
      });
      setNewBenefit("");
    }
  };
  
  const removeBenefit = (index: number) => {
    const updatedBenefits = formData.benefits.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      benefits: updatedBenefits
    });
  };
  
  const createJobCards = () => {
    // In a real app, you'd make API calls to your backend to create job listings
    
    if (formData.hiringFor.length === 0) {
      alert("Please add hiring positions before creating job cards");
      return;
    }
    
    // Create sample job cards from the hiring positions
    const jobCards = formData.hiringFor.map((position, index) => ({
      id: Date.now() + index,
      title: position,
      company: formData.companyName,
      location: formData.location,
      type: "Full-time", // Default, you'd get this from the job details
      remote: false,     // Default, you'd get this from the job details
      description: `${formData.companyName} is hiring for ${position} position. ${formData.about.substring(0, 100)}...`,
      posted: "Just now",
      logo: "/logos/default-logo.png" // Default logo
    }));
    
    // In a real app, you'd save these to your database
    console.log("Created job cards:", jobCards);
    
    // Show confirmation
    alert(`Successfully created ${jobCards.length} job listings!`);
    
    // Navigate to jobs page to see the listings
    // Note: In a real app, you'd first save the data and then redirect
    setTimeout(() => {
      router.push('/jobs');
    }, 1000);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Submitting form data:", formData);
    console.log("Resume data:", resumeData);
    
    // Create job cards for the hiring positions
    createJobCards();
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <AnimatedNavbar />
      
      <div className="bg-gradient-to-b from-teal-900 to-teal-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Employer Profile</h1>
          <p className="text-xl text-cyan-100">Create your company profile and get noticed by top talent</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            <button 
              className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === "profile" ? "text-teal-700 border-b-2 border-teal-700" : "text-gray-500 hover:text-teal-600"}`}
              onClick={() => setActiveTab("profile")}
            >
              Company Profile
            </button>
            <button 
              className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === "resume" ? "text-teal-700 border-b-2 border-teal-700" : "text-gray-500 hover:text-teal-600"}`}
              onClick={() => setActiveTab("resume")}
            >
              Hiring Information
            </button>
            <button 
              className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === "resume-builder" ? "text-teal-700 border-b-2 border-teal-700" : "text-gray-500 hover:text-teal-600"}`}
              onClick={() => setActiveTab("resume-builder")}
            >
              Resume Builder
            </button>
            <button 
              className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === "preview" ? "text-teal-700 border-b-2 border-teal-700" : "text-gray-500 hover:text-teal-600"}`}
              onClick={() => setActiveTab("preview")}
            >
              Preview
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Company Profile Tab */}
            {activeTab === "profile" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-teal-800">Company Information</h2>
                  
                  <div className="mb-4">
                    <label htmlFor="companyName" className="block text-gray-700 mb-1">Company Name*</label>
                    <input 
                      type="text" 
                      id="companyName" 
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label htmlFor="industry" className="block text-gray-700 mb-1">Industry*</label>
                      <select 
                        id="industry" 
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                        required
                      >
                        <option value="">Select Industry</option>
                        <option value="Technology">Technology</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Finance">Finance</option>
                        <option value="Education">Education</option>
                        <option value="Retail">Retail</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="founded" className="block text-gray-700 mb-1">Founded Year</label>
                      <input 
                        type="number" 
                        id="founded" 
                        name="founded"
                        value={formData.founded}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                        placeholder="e.g., 2010"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="size" className="block text-gray-700 mb-1">Company Size*</label>
                      <select 
                        id="size" 
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                        required
                      >
                        <option value="">Select Size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501-1000">501-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="website" className="block text-gray-700 mb-1">Website URL</label>
                      <input 
                        type="url" 
                        id="website" 
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                        placeholder="https://yourcompany.com"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="location" className="block text-gray-700 mb-1">Location*</label>
                    <input 
                      type="text" 
                      id="location" 
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                      placeholder="City, State, Country"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="about" className="block text-gray-700 mb-1">About Company*</label>
                    <textarea 
                      id="about" 
                      name="about"
                      value={formData.about}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                      placeholder="Tell potential candidates about your company..."
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <motion.button 
                    type="button"
                    className="bg-teal-700 text-white px-6 py-2 rounded hover:bg-teal-600 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("resume")}
                  >
                    Next: Hiring Information
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            {/* Resume/Hiring Tab */}
            {activeTab === "resume" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-teal-800">Hiring Information</h2>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Positions You&apos;re Hiring For</label>
                    <div className="flex mb-2">
                      <input 
                        type="text" 
                        value={newHiringPosition}
                        onChange={(e) => setNewHiringPosition(e.target.value)}
                        className="flex-1 p-2 border border-teal-200 rounded-l focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                        placeholder="e.g., Frontend Developer"
                      />
                      <button 
                        type="button"
                        onClick={addHiringPosition}
                        className="bg-teal-700 text-white px-4 py-2 rounded-r hover:bg-teal-600 transition"
                      >
                        Add
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.hiringFor.map((position, index) => (
                        <div key={index} className="flex items-center bg-teal-100 text-teal-800 px-3 py-1 rounded">
                          {position}
                          <button 
                            type="button"
                            onClick={() => editJobDetails(position, index)}
                            className="ml-2 text-teal-700 hover:text-teal-900"
                            title="Edit job details"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button 
                            type="button"
                            onClick={() => removeHiringPosition(index)}
                            className="ml-1 text-teal-700 hover:text-teal-900"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Job Details Form - Shows when adding or editing a job */}
                  {showJobDetails && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 border border-teal-200 rounded-lg"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-teal-800">
                          Job Details for &quot;{jobDetails.title}&quot;
                        </h3>
                        <button 
                          type="button"
                          onClick={() => setShowJobDetails(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          &times;
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-gray-700 mb-1">Job Title*</label>
                          <input 
                            type="text" 
                            name="title"
                            value={jobDetails.title || ""}
                            onChange={handleJobDetailsChange}
                            className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 mb-1">Job Type*</label>
                          <select 
                            name="type"
                            value={jobDetails.type || "Full-time"}
                            onChange={handleJobDetailsChange}
                            className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                            required
                          >
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="Freelance">Freelance</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="remote"
                            name="remote"
                            checked={jobDetails.remote || false}
                            onChange={handleJobDetailsChange}
                            className="mr-2 h-4 w-4 accent-teal-600"
                          />
                          <label htmlFor="remote" className="text-gray-700">Remote Job</label>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Job Description*</label>
                        <textarea 
                          name="description"
                          value={jobDetails.description || ""}
                          onChange={handleJobDetailsChange}
                          rows={5}
                          className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                          placeholder="Describe the job responsibilities, requirements, and any other details..."
                          required
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <button 
                          type="button"
                          onClick={saveJobDetails}
                          className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
                        >
                          Save Job Details
                        </button>
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Benefits & Perks</label>
                    <div className="flex mb-2">
                      <input 
                        type="text" 
                        value={newBenefit}
                        onChange={(e) => setNewBenefit(e.target.value)}
                        className="flex-1 p-2 border border-teal-200 rounded-l focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                        placeholder="e.g., Health Insurance"
                      />
                      <button 
                        type="button"
                        onClick={addBenefit}
                        className="bg-teal-700 text-white px-4 py-2 rounded-r hover:bg-teal-600 transition"
                      >
                        Add
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center bg-cyan-100 text-cyan-800 px-3 py-1 rounded">
                          {benefit}
                          <button 
                            type="button"
                            onClick={() => removeBenefit(index)}
                            className="ml-2 text-cyan-700 hover:text-cyan-900"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="culture" className="block text-gray-700 mb-1">Company Culture</label>
                    <textarea 
                      id="culture" 
                      name="culture"
                      value={formData.culture}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                      placeholder="Describe your company culture, values, and work environment..."
                    />
                  </div>
                  
                  {/* Create Job Cards Button */}
                  {formData.hiringFor.length > 0 && (
                    <div className="mb-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium text-teal-800 mb-1">Ready to Post Jobs?</h3>
                          <p className="text-gray-600">Create job cards for your hiring positions</p>
                        </div>
                        <motion.button 
                          type="button"
                          className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={createJobCards}
                        >
                          Create Job Cards
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <motion.button 
                    type="button"
                    className="bg-white text-teal-700 border border-teal-700 px-6 py-2 rounded hover:bg-teal-50 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("profile")}
                  >
                    Back: Company Profile
                  </motion.button>
                  
                  <motion.button 
                    type="button"
                    className="bg-teal-700 text-white px-6 py-2 rounded hover:bg-teal-600 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("resume-builder")}
                  >
                    Next: Resume Builder
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            {/* Resume Builder Tab */}
            {activeTab === "resume-builder" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ResumeBuilder 
                  resumeData={resumeData}
                  onUpdate={setResumeData}
                />
                
                <div className="flex justify-between mt-6">
                  <motion.button 
                    type="button"
                    className="bg-white text-teal-700 border border-teal-700 px-6 py-2 rounded hover:bg-teal-50 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("resume")}
                  >
                    Back: Hiring Information
                  </motion.button>
                  
                  <motion.button 
                    type="button"
                    className="bg-teal-700 text-white px-6 py-2 rounded hover:bg-teal-600 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("preview")}
                  >
                    Preview Profile
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            {/* Preview Tab */}
            {activeTab === "preview" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="absolute top-0 right-0 bg-white rounded-full p-2 shadow-md">
                  <motion.button 
                    type="button"
                    className="text-teal-700 hover:text-teal-900"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveTab("profile")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </motion.button>
                </div>
                
                <div className="bg-white rounded-lg overflow-hidden mb-8">
                  <div className="bg-teal-900 text-white p-6">
                    <h2 className="text-2xl font-bold">{formData.companyName || "Your Company Name"}</h2>
                    <p className="text-cyan-100">{formData.industry || "Industry"} • {formData.location || "Location"}</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-teal-800 mb-2">About Us</h3>
                      <p className="text-gray-700">{formData.about || "Your company description will appear here..."}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-teal-800 mb-2">Company Details</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="text-teal-700 mr-2">•</span>
                            <span className="text-gray-700"><span className="font-medium">Founded:</span> {formData.founded || "N/A"}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal-700 mr-2">•</span>
                            <span className="text-gray-700"><span className="font-medium">Size:</span> {formData.size || "N/A"}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal-700 mr-2">•</span>
                            <span className="text-gray-700"><span className="font-medium">Website:</span> {formData.website || "N/A"}</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-teal-800 mb-2">Contact Information</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="text-teal-700 mr-2">•</span>
                            <span className="text-gray-700"><span className="font-medium">Contact Person:</span> {formData.contactName || "N/A"}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal-700 mr-2">•</span>
                            <span className="text-gray-700"><span className="font-medium">Email:</span> {formData.contactEmail || "N/A"}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-teal-700 mr-2">•</span>
                            <span className="text-gray-700"><span className="font-medium">Phone:</span> {formData.contactPhone || "N/A"}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-teal-800 mb-2">We&apos;re Hiring</h3>
                      {formData.hiringFor.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {formData.hiringFor.map((position, index) => (
                            <span key={index} className="bg-teal-100 text-teal-800 px-3 py-1 rounded">
                              {position}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">No positions listed yet</p>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-teal-800 mb-2">Benefits & Perks</h3>
                      {formData.benefits.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {formData.benefits.map((benefit, index) => (
                            <span key={index} className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded">
                              {benefit}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">No benefits listed yet</p>
                      )}
                    </div>
                    
                    {formData.culture && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-teal-800 mb-2">Our Culture</h3>
                        <p className="text-gray-700">{formData.culture}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <motion.button 
                    type="button"
                    className="bg-white text-teal-700 border border-teal-700 px-6 py-2 rounded hover:bg-teal-50 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("resume-builder")}
                  >
                    Back: Resume Builder
                  </motion.button>
                  
                  <motion.button 
                    type="submit"
                    className="bg-teal-700 text-white px-6 py-2 rounded hover:bg-teal-600 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Save Profile
                  </motion.button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 