"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimatedNavbar from "@/components/ui/AnimatedNavbar";
import Footer from "@/components/ui/Footer";
import ResumeBuilder from "@/components/profile/ResumeBuilder";
import { ResumeData } from "@/components/profile/ResumeBuilder";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  status: "applied" | "interview" | "offer" | "rejected" | "saved";
  date: string;
  logo?: string;
}

interface EmployeeData {
  // Personal Info
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  
  // Profile
  about: string;
  skills: string[];
  experience: number;
  education: string;
  
  // Job Preferences
  jobTypes: string[];
  salary: string;
  remote: boolean;
  relocation: boolean;
}

export default function EmployeeProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState<EmployeeData>({
    // Personal Info
    fullName: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    
    // Profile
    about: "",
    skills: [],
    experience: 0,
    education: "",
    
    // Job Preferences
    jobTypes: [],
    salary: "",
    remote: false,
    relocation: false
  });
  
  // Resume data state
  const [resumeData, setResumeData] = useState<ResumeData>({
    summary: "",
    education: [],
    experience: [],
    skills: []
  });
  
  const [newSkill, setNewSkill] = useState("");
  const [newJobType, setNewJobType] = useState("");
  
  // Dummy job applications data
  const [applications, setApplications] = useState<Job[]>([
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Bangalore, India",
      status: "applied",
      date: "2023-10-15",
      logo: "/logos/company1.png"
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "DesignHub",
      location: "Remote",
      status: "interview",
      date: "2023-10-10",
      logo: "/logos/company2.png"
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "WebSolutions",
      location: "Delhi, India",
      status: "saved",
      date: "2023-10-18",
      logo: "/logos/company3.png"
    }
  ]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };
  
  const addSkill = () => {
    if (newSkill.trim() !== "" && !formData.skills.includes(newSkill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill]
      });
      setNewSkill("");
    }
  };
  
  const removeSkill = (index: number) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      skills: updatedSkills
    });
  };
  
  const addJobType = () => {
    if (newJobType.trim() !== "" && !formData.jobTypes.includes(newJobType)) {
      setFormData({
        ...formData,
        jobTypes: [...formData.jobTypes, newJobType]
      });
      setNewJobType("");
    }
  };
  
  const removeJobType = (index: number) => {
    const updatedJobTypes = formData.jobTypes.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      jobTypes: updatedJobTypes
    });
  };
  
  const updateApplicationStatus = (id: number, status: Job['status']) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };
  
  const removeApplication = (id: number) => {
    setApplications(applications.filter(app => app.id !== id));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Submitting profile data:", formData);
    console.log("Resume data:", resumeData);
    alert("Profile updated successfully!");
  };
  
  // Helper function to get status color
  const getStatusColor = (status: Job['status']) => {
    switch(status) {
      case "applied": return "bg-cyan-100 text-cyan-800";
      case "interview": return "bg-teal-100 text-teal-800";
      case "offer": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "saved": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <AnimatedNavbar />
      
      <div className="bg-gradient-to-b from-cyan-900 to-cyan-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Job Seeker Profile</h1>
          <p className="text-xl text-cyan-100">Manage your profile and track your job applications</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            <button 
              className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === "profile" ? "text-cyan-700 border-b-2 border-cyan-700" : "text-gray-500 hover:text-cyan-600"}`}
              onClick={() => setActiveTab("profile")}
            >
              Personal Information
            </button>
            <button 
              className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === "preferences" ? "text-cyan-700 border-b-2 border-cyan-700" : "text-gray-500 hover:text-cyan-600"}`}
              onClick={() => setActiveTab("preferences")}
            >
              Job Preferences
            </button>
            <button 
              className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === "resume" ? "text-cyan-700 border-b-2 border-cyan-700" : "text-gray-500 hover:text-cyan-600"}`}
              onClick={() => setActiveTab("resume")}
            >
              Resume Builder
            </button>
            <button 
              className={`py-2 px-4 font-medium whitespace-nowrap ${activeTab === "applications" ? "text-cyan-700 border-b-2 border-cyan-700" : "text-gray-500 hover:text-cyan-600"}`}
              onClick={() => setActiveTab("applications")}
            >
              My Applications
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Personal Information Tab */}
            {activeTab === "profile" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-cyan-800">Personal Information</h2>
                  
                  <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700 mb-1">Full Name*</label>
                    <input 
                      type="text" 
                      id="fullName" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-cyan-200 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700 mb-1">Email*</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-cyan-200 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-gray-700 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-cyan-200 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label htmlFor="location" className="block text-gray-700 mb-1">Location*</label>
                      <input 
                        type="text" 
                        id="location" 
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-cyan-200 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="City, State, Country"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="title" className="block text-gray-700 mb-1">Professional Title*</label>
                      <input 
                        type="text" 
                        id="title" 
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-cyan-200 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="e.g., Frontend Developer"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="about" className="block text-gray-700 mb-1">About Me*</label>
                    <textarea 
                      id="about" 
                      name="about"
                      value={formData.about}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full p-2 border border-cyan-200 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Write a brief introduction about yourself..."
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="experience" className="block text-gray-700 mb-1">Years of Experience*</label>
                    <input 
                      type="number" 
                      id="experience" 
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      min="0"
                      max="50"
                      className="w-full p-2 border border-cyan-200 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="education" className="block text-gray-700 mb-1">Highest Education*</label>
                    <select 
                      id="education" 
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-cyan-200 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      required
                    >
                      <option value="">Select Education Level</option>
                      <option value="High School">High School</option>
                      <option value="Associate's Degree">Associate&apos;s Degree</option>
                      <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
                      <option value="Master's Degree">Master&apos;s Degree</option>
                      <option value="Doctorate">Doctorate</option>
                      <option value="Professional Certification">Professional Certification</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Skills</label>
                    <div className="flex mb-2">
                      <input 
                        type="text" 
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="flex-1 p-2 border border-cyan-200 rounded-l focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="e.g., JavaScript"
                      />
                      <button 
                        type="button"
                        onClick={addSkill}
                        className="bg-cyan-700 text-white px-4 py-2 rounded-r hover:bg-cyan-600 transition"
                      >
                        Add
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.skills.map((skill, index) => (
                        <div key={index} className="flex items-center bg-cyan-100 text-cyan-800 px-3 py-1 rounded">
                          {skill}
                          <button 
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="ml-2 text-cyan-700 hover:text-cyan-900"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <motion.button 
                    type="button"
                    className="bg-cyan-700 text-white px-6 py-2 rounded hover:bg-cyan-600 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("preferences")}
                  >
                    Next: Job Preferences
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            {/* Job Preferences Tab */}
            {activeTab === "preferences" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-cyan-800">Job Preferences</h2>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Job Types You&apos;re Interested In</label>
                    <div className="flex mb-2">
                      <input 
                        type="text" 
                        value={newJobType}
                        onChange={(e) => setNewJobType(e.target.value)}
                        className="flex-1 p-2 border border-cyan-200 rounded-l focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="e.g., Full-time"
                      />
                      <button 
                        type="button"
                        onClick={addJobType}
                        className="bg-cyan-700 text-white px-4 py-2 rounded-r hover:bg-cyan-600 transition"
                      >
                        Add
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.jobTypes.map((jobType, index) => (
                        <div key={index} className="flex items-center bg-cyan-100 text-cyan-800 px-3 py-1 rounded">
                          {jobType}
                          <button 
                            type="button"
                            onClick={() => removeJobType(index)}
                            className="ml-2 text-cyan-700 hover:text-cyan-900"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="salary" className="block text-gray-700 mb-1">Expected Salary (Annual)</label>
                    <select 
                      id="salary" 
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-cyan-200 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="">Select Salary Range</option>
                      <option value="0-300k">₹0 - ₹3,00,000</option>
                      <option value="300k-500k">₹3,00,000 - ₹5,00,000</option>
                      <option value="500k-800k">₹5,00,000 - ₹8,00,000</option>
                      <option value="800k-1200k">₹8,00,000 - ₹12,00,000</option>
                      <option value="1200k-1500k">₹12,00,000 - ₹15,00,000</option>
                      <option value="1500k+">₹15,00,000+</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <input 
                        type="checkbox" 
                        id="remote"
                        name="remote"
                        checked={formData.remote}
                        onChange={handleCheckboxChange}
                        className="mr-2 h-4 w-4 accent-cyan-600"
                      />
                      <label htmlFor="remote" className="text-gray-700">Open to Remote Work</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="relocation"
                        name="relocation"
                        checked={formData.relocation}
                        onChange={handleCheckboxChange}
                        className="mr-2 h-4 w-4 accent-cyan-600"
                      />
                      <label htmlFor="relocation" className="text-gray-700">Open to Relocation</label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <motion.button 
                    type="button"
                    className="bg-white text-cyan-700 border border-cyan-700 px-6 py-2 rounded hover:bg-cyan-50 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("profile")}
                  >
                    Back: Personal Information
                  </motion.button>
                  
                  <motion.button 
                    type="button"
                    className="bg-cyan-700 text-white px-6 py-2 rounded hover:bg-cyan-600 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("resume")}
                  >
                    Next: Resume Builder
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            {/* Resume Builder Tab */}
            {activeTab === "resume" && (
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
                    className="bg-white text-cyan-700 border border-cyan-700 px-6 py-2 rounded hover:bg-cyan-50 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("preferences")}
                  >
                    Back: Job Preferences
                  </motion.button>
                  
                  <motion.button 
                    type="button"
                    className="bg-cyan-700 text-white px-6 py-2 rounded hover:bg-cyan-600 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("applications")}
                  >
                    Next: My Applications
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            {/* My Applications Tab */}
            {activeTab === "applications" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4 text-cyan-800">My Job Applications</h2>
                  
                  {applications.length > 0 ? (
                    <div className="space-y-4">
                      {applications.map((job) => (
                        <motion.div 
                          key={job.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
                        >
                          <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-4">
                            <div className="flex items-center">
                              <div className="w-12 h-12 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center mr-4">
                                {job.logo ? (
                                  <Image src={job.logo} alt={job.company} width={48} height={48} className="object-contain" />
                                ) : (
                                  <span className="text-xl font-bold text-cyan-700">{job.company.charAt(0)}</span>
                                )}
                              </div>
                              
                              <div>
                                <h3 className="font-medium text-gray-800">{job.title}</h3>
                                <p className="text-gray-600 text-sm">{job.company} • {job.location}</p>
                                <p className="text-gray-500 text-xs mt-1">Applied on {new Date(job.date).toLocaleDateString()}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 w-full md:w-auto">
                              <span className={`px-2 py-1 rounded text-xs ${getStatusColor(job.status)}`}>
                                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                              </span>
                              
                              <select 
                                value={job.status}
                                onChange={(e) => updateApplicationStatus(job.id, e.target.value as Job['status'])}
                                className="text-sm p-1 border border-gray-300 rounded"
                              >
                                <option value="applied">Applied</option>
                                <option value="interview">Interview</option>
                                <option value="offer">Offer</option>
                                <option value="rejected">Rejected</option>
                                <option value="saved">Saved</option>
                              </select>
                              
                              <button 
                                onClick={() => removeApplication(job.id)}
                                className="text-red-500 hover:text-red-700 ml-2"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                      <div className="flex justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 mb-1">No applications yet</h3>
                      <p className="text-gray-500">Start applying for jobs to track your applications here</p>
                      <Link 
                        href="/jobs"
                        className="mt-4 inline-block bg-cyan-700 text-white px-4 py-2 rounded hover:bg-cyan-600 transition"
                      >
                        Browse Jobs
                      </Link>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <motion.button 
                    type="button"
                    className="bg-white text-cyan-700 border border-cyan-700 px-6 py-2 rounded hover:bg-cyan-50 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("resume")}
                  >
                    Back: Resume Builder
                  </motion.button>
                  
                  <motion.button 
                    type="submit"
                    className="bg-cyan-700 text-white px-6 py-2 rounded hover:bg-cyan-600 transition"
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