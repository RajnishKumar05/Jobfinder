"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  isCurrentlyStudying: boolean;
  location: string;
  description: string;
}

interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  isCurrentlyWorking: boolean;
}

interface SkillItem {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface ResumeData {
  summary: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
}

interface ResumeBuilderProps {
  resumeData: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

export default function ResumeBuilder({ resumeData, onUpdate }: ResumeBuilderProps) {
  const [activeSection, setActiveSection] = useState<"summary" | "education" | "experience" | "skills">("summary");
  
  // Education handlers
  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      isCurrentlyStudying: false,
      location: "",
      description: ""
    };
    
    onUpdate({
      ...resumeData,
      education: [...resumeData.education, newEducation]
    });
  };
  
  const updateEducation = (id: string, field: keyof EducationItem, value: string | boolean) => {
    const updatedEducation = resumeData.education.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    
    onUpdate({
      ...resumeData,
      education: updatedEducation
    });
  };
  
  const removeEducation = (id: string) => {
    onUpdate({
      ...resumeData,
      education: resumeData.education.filter(item => item.id !== id)
    });
  };
  
  // Experience handlers
  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: "",
      title: "",
      location: "",
      description: "",
      startDate: "",
      endDate: "",
      isCurrentlyWorking: false
    };
    
    onUpdate({
      ...resumeData,
      experience: [...resumeData.experience, newExperience]
    });
  };
  
  const updateExperience = (id: string, field: keyof ExperienceItem, value: string | boolean) => {
    const updatedExperience = resumeData.experience.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    
    onUpdate({
      ...resumeData,
      experience: updatedExperience
    });
  };
  
  const removeExperience = (id: string) => {
    onUpdate({
      ...resumeData,
      experience: resumeData.experience.filter(item => item.id !== id)
    });
  };
  
  // Skills handlers
  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: "",
      level: "Intermediate" as const
    };
    
    onUpdate({
      ...resumeData,
      skills: [...resumeData.skills, newSkill]
    });
  };
  
  const updateSkill = (id: string, field: keyof SkillItem, value: string) => {
    const updatedSkills = resumeData.skills.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    
    onUpdate({
      ...resumeData,
      skills: updatedSkills
    });
  };
  
  const removeSkill = (id: string) => {
    onUpdate({
      ...resumeData,
      skills: resumeData.skills.filter(item => item.id !== id)
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-teal-800">Resume Builder</h2>
      
      {/* Section Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        <button 
          className={`py-2 px-4 font-medium whitespace-nowrap ${activeSection === "summary" ? "text-teal-700 border-b-2 border-teal-700" : "text-gray-500 hover:text-teal-600"}`}
          onClick={() => setActiveSection("summary")}
        >
          Professional Summary
        </button>
        <button 
          className={`py-2 px-4 font-medium whitespace-nowrap ${activeSection === "education" ? "text-teal-700 border-b-2 border-teal-700" : "text-gray-500 hover:text-teal-600"}`}
          onClick={() => setActiveSection("education")}
        >
          Education
        </button>
        <button 
          className={`py-2 px-4 font-medium whitespace-nowrap ${activeSection === "experience" ? "text-teal-700 border-b-2 border-teal-700" : "text-gray-500 hover:text-teal-600"}`}
          onClick={() => setActiveSection("experience")}
        >
          Work Experience
        </button>
        <button 
          className={`py-2 px-4 font-medium whitespace-nowrap ${activeSection === "skills" ? "text-teal-700 border-b-2 border-teal-700" : "text-gray-500 hover:text-teal-600"}`}
          onClick={() => setActiveSection("skills")}
        >
          Skills
        </button>
      </div>
      
      {/* Summary Section */}
      {activeSection === "summary" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-4">
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
              Professional Summary
            </label>
            <textarea
              id="summary"
              value={resumeData.summary}
              onChange={(e) => onUpdate({ ...resumeData, summary: e.target.value })}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-black"
              placeholder="Write a brief summary of your professional experience and career goals..."
            />
          </div>
          <p className="text-sm text-gray-500 mb-4">
            A compelling professional summary quickly communicates your qualifications and value to employers.
          </p>
        </motion.div>
      )}
      
      {/* Education Section */}
      {activeSection === "education" && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {resumeData.education.map((edu, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">Education {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor={`institution-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Institution*
                  </label>
                  <input
                    type="text"
                    id={`institution-${index}`}
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-black"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor={`degree-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Degree*
                  </label>
                  <input
                    type="text"
                    id={`degree-${index}`}
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-black"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor={`fieldOfStudy-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    id={`fieldOfStudy-${index}`}
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-black"
                  />
                </div>
                
                <div>
                  <label htmlFor={`location-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id={`location-${index}`}
                    value={edu.location}
                    onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-black"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor={`startDate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date*
                  </label>
                  <input
                    type="date"
                    id={`startDate-${index}`}
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-black"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                    End Date (or Expected)
                  </label>
                  <input
                    type="date"
                    id={`endDate-${index}`}
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-black"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor={`description-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id={`description-${index}`}
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-black"
                  placeholder="Achievements, activities, or relevant coursework..."
                />
              </div>
            </div>
          ))}
          
          <div className="flex justify-center">
            <motion.button 
              type="button"
              className="flex items-center bg-teal-50 text-teal-700 px-4 py-2 rounded hover:bg-teal-100 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addEducation}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Education
            </motion.button>
          </div>
        </motion.div>
      )}
      
      {/* Experience Section */}
      {activeSection === "experience" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {resumeData.experience.length > 0 ? (
            <div className="space-y-6 mb-6">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="p-4 border border-teal-100 rounded-lg relative">
                  <button 
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    onClick={() => removeExperience(exp.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-3">
                      <label className="block text-gray-700 mb-1">Company</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-gray-700 mb-1">Job Title</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Your job title"
                        value={exp.title}
                        onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-gray-700 mb-1">Location</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="City, Country or Remote"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                      />
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center mb-2">
                        <input 
                          type="checkbox" 
                          id={`currently-working-${exp.id}`}
                          className="mr-2 h-4 w-4 accent-teal-600"
                          checked={exp.isCurrentlyWorking}
                          onChange={(e) => updateExperience(exp.id, "isCurrentlyWorking", e.target.checked)}
                        />
                        <label htmlFor={`currently-working-${exp.id}`} className="text-gray-700">
                          I currently work here
                        </label>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label className="block text-gray-700 mb-1">Start Date</label>
                      <input 
                        type="month" 
                        className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                      />
                    </div>
                    
                    {!exp.isCurrentlyWorking && (
                      <div className="mb-3">
                        <label className="block text-gray-700 mb-1">End Date</label>
                        <input 
                          type="month" 
                          className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-3 mt-2">
                    <label className="block text-gray-700 mb-1">Job Description</label>
                    <textarea 
                      rows={4}
                      className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Describe your responsibilities and accomplishments..."
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 border border-dashed border-teal-200 rounded-lg mb-6">
              <p className="text-gray-500 mb-4">No work experience entries yet. Add your work history.</p>
            </div>
          )}
          
          <div className="flex justify-center">
            <motion.button 
              type="button"
              className="flex items-center bg-teal-50 text-teal-700 px-4 py-2 rounded hover:bg-teal-100 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addExperience}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Work Experience
            </motion.button>
          </div>
        </motion.div>
      )}
      
      {/* Skills Section */}
      {activeSection === "skills" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {resumeData.skills.length > 0 ? (
            <div className="space-y-4 mb-6">
              {resumeData.skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-4 p-3 border border-teal-100 rounded-lg">
                  <div className="flex-grow">
                    <input 
                      type="text" 
                      className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Skill name (e.g., JavaScript, Project Management)"
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                    />
                  </div>
                  <div className="w-32">
                    <select
                      className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                      value={skill.level}
                      onChange={(e) => updateSkill(skill.id, "level", e.target.value)}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-red-500"
                    onClick={() => removeSkill(skill.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 border border-dashed border-teal-200 rounded-lg mb-6">
              <p className="text-gray-500 mb-4">No skills added yet. Add your professional skills.</p>
            </div>
          )}
          
          <div className="flex justify-center">
            <motion.button 
              type="button"
              className="flex items-center bg-teal-50 text-teal-700 px-4 py-2 rounded hover:bg-teal-100 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addSkill}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Skill
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
} 