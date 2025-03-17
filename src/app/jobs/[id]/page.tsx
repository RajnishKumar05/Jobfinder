import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { notFound } from "next/navigation";

// This would typically come from an API or database
const jobsData = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Bangalore, India",
    type: "Full-time",
    remote: true,
    salary: "₹8,00,000 - ₹15,00,000 per year",
    description: "We are looking for a skilled Frontend Developer to join our team. The ideal candidate should have experience with React, TypeScript, and modern web development practices.",
    responsibilities: [
      "Develop and maintain responsive web applications",
      "Collaborate with back-end developers and designers",
      "Write clean, efficient, and maintainable code",
      "Troubleshoot and debug applications",
      "Optimize applications for maximum speed and scalability"
    ],
    requirements: [
      "3+ years of experience with React.js",
      "Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model",
      "Experience with TypeScript",
      "Familiarity with RESTful APIs",
      "Understanding of server-side rendering",
      "Knowledge of modern front-end build pipelines and tools"
    ],
    benefits: [
      "Flexible working hours",
      "Remote work options",
      "Health insurance",
      "Annual bonus",
      "Professional development budget"
    ],
    posted: "2 days ago"
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "InnovateX",
    location: "Mumbai, India",
    type: "Full-time",
    remote: true,
    salary: "₹10,00,000 - ₹18,00,000 per year",
    description: "Join our backend team working on scalable cloud solutions. You'll be building APIs and microservices that power our customer-facing applications.",
    responsibilities: [
      "Design and implement scalable backend services",
      "Create and maintain API documentation",
      "Work with database design and optimization",
      "Collaborate with frontend engineers",
      "Participate in code reviews"
    ],
    requirements: [
      "4+ years of experience with Node.js or Python",
      "Experience with microservices architecture",
      "Knowledge of SQL and NoSQL databases",
      "Familiarity with AWS or other cloud platforms",
      "Understanding of CI/CD pipelines"
    ],
    benefits: [
      "Competitive salary",
      "Remote work",
      "Healthcare benefits",
      "Equity options",
      "Unlimited paid time off"
    ],
    posted: "1 week ago"
  }
];

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const jobId = parseInt(params.id);
  
  // Find the job by ID
  const job = jobsData.find(job => job.id === jobId);
  
  // If job not found, show 404 page
  if (!job) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/jobs" className="text-blue-600 hover:underline flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Jobs
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
              <p className="text-blue-600 font-medium text-lg">{job.company}</p>
              <p className="text-gray-600">{job.location}</p>
            </div>
            <div className="text-right">
              <div className="flex flex-wrap gap-2 mb-2 justify-end">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">{job.type}</span>
                {job.remote && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded">Remote</span>
                )}
              </div>
              <p className="text-gray-500">Posted {job.posted}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="text-lg font-medium text-gray-800 mb-2">Salary</div>
            <p className="text-gray-700 mb-6">{job.salary}</p>
            
            <div className="text-lg font-medium text-gray-800 mb-2">Job Description</div>
            <p className="text-gray-700 mb-6">{job.description}</p>
            
            <div className="text-lg font-medium text-gray-800 mb-2">Responsibilities</div>
            <ul className="list-disc pl-5 mb-6">
              {job.responsibilities.map((item, index) => (
                <li key={index} className="text-gray-700 mb-1">{item}</li>
              ))}
            </ul>
            
            <div className="text-lg font-medium text-gray-800 mb-2">Requirements</div>
            <ul className="list-disc pl-5 mb-6">
              {job.requirements.map((item, index) => (
                <li key={index} className="text-gray-700 mb-1">{item}</li>
              ))}
            </ul>
            
            <div className="text-lg font-medium text-gray-800 mb-2">Benefits</div>
            <ul className="list-disc pl-5 mb-6">
              {job.benefits.map((item, index) => (
                <li key={index} className="text-gray-700 mb-1">{item}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Apply for this Position</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email" />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Phone</label>
              <input type="tel" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your phone number" />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Cover Letter</label>
              <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32" placeholder="Tell us why you're interested in this position"></textarea>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Resume</label>
              <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center">
                <p className="text-gray-500 mb-2">Drag your file here or</p>
                <button type="button" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition">
                  Browse Files
                </button>
                <p className="text-gray-500 mt-2 text-sm">Maximum file size: 5MB (PDF, DOC, DOCX)</p>
              </div>
            </div>
            
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition w-full md:w-auto">
              Submit Application
            </button>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 