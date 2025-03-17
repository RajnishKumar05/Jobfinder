"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedNavbar from "@/components/ui/AnimatedNavbar";
import AnimatedHero from "@/components/ui/AnimatedHero";
import Footer from "@/components/ui/Footer";
import AnimatedJobCard from "@/components/jobs/AnimatedJobCard";

// Performance optimization - reuse animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  // Sample featured jobs data
  const featuredJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Bangalore, India",
      type: "Full-time",
      remote: true,
      description: "We are looking for a skilled Frontend Developer to join our team.",
      posted: "2 days ago",
      logo: "/logos/techcorp.png"
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "InnovateX",
      location: "Mumbai, India",
      type: "Full-time",
      remote: true,
      description: "Join our backend team working on scalable cloud solutions.",
      posted: "1 week ago",
      logo: "/logos/innovatex.png"
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "DesignHub",
      location: "Delhi, India",
      type: "Contract",
      remote: false,
      description: "Creative UI/UX designer needed for our product team.",
      posted: "3 days ago",
      logo: "/logos/designhub.png"
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Hyderabad, India",
      type: "Full-time",
      remote: true,
      description: "Experienced DevOps engineer to manage our infrastructure.",
      posted: "Just now",
      logo: "/logos/cloudtech.png"
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "DataInsights",
      location: "Pune, India",
      type: "Full-time",
      remote: true,
      description: "Looking for a data scientist with experience in machine learning.",
      posted: "5 days ago",
      logo: "/logos/datainsights.png"
    },
    {
      id: 6,
      title: "Full Stack Developer",
      company: "WebSolutions",
      location: "Chennai, India",
      type: "Part-time",
      remote: true,
      description: "Develop and maintain full stack web applications.",
      posted: "1 day ago",
      logo: "/logos/websolutions.png"
    }
  ];

  // Categories with icons
  const categories = [
    { name: "Technology", icon: "💻", count: 1200 },
    { name: "Marketing", icon: "📈", count: 850 },
    { name: "Design", icon: "🎨", count: 640 },
    { name: "Finance", icon: "💰", count: 950 },
    { name: "Healthcare", icon: "⚕️", count: 720 },
    { name: "Education", icon: "🎓", count: 530 }
  ];

  return (
    <div className="min-h-screen">
      <AnimatedNavbar />

      <main>
        <AnimatedHero />

        {/* Featured Jobs Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-10 text-center"
            >
              <h2 className="text-3xl font-bold mb-3">Featured Jobs</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our handpicked selection of top job opportunities from leading companies
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.map((job, index) => (
                <AnimatedJobCard key={job.id} job={job} index={index} />
              ))}
            </div>
            
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/jobs" 
                className="inline-block"
              >
                <motion.button
                  className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Browse All Jobs
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Browse by Category Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-10 text-center"
            >
              <h2 className="text-3xl font-bold mb-3">Browse by Category</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore jobs across different industries and specializations
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {categories.map((category) => (
                <motion.div
                  key={category.name}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center hover:shadow-md cursor-pointer"
                  variants={fadeInUp}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-blue-600">{category.count} jobs</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl font-bold mb-3">How JobFinder Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find your dream job with these simple steps
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🔍",
                  title: "Search Jobs",
                  description: "Browse thousands of job listings from top companies.",
                  delay: 0
                },
                {
                  icon: "📝",
                  title: "Apply with Ease",
                  description: "Submit your application with just a few clicks.",
                  delay: 0.2
                },
                {
                  icon: "🚀",
                  title: "Land Your Dream Job",
                  description: "Get hired and start your new career journey.",
                  delay: 0.4
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-8 text-center relative shadow-sm border border-gray-100"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.5, delay: step.delay }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl mx-auto mb-5">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Dream Job?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join thousands of job seekers who have found their perfect career match with JobFinder
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4 items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/auth/login" 
                    className="bg-white text-teal-600 px-8 py-3 rounded-full font-medium hover:bg-blue-50 transition shadow-lg inline-block"
                  >
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      Join as Job Seeker
                    </span>
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/auth/login"
                    className="bg-teal-900 text-white border-2 border-white px-8 py-3 rounded-full font-medium hover:bg-teal-800 transition shadow-lg inline-block"
                  >
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1H7a1 1 0 00-1 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                      </svg>
                      Register as Employer
                    </span>
                  </Link>
                </motion.div>
              </div>
              
              <p className="mt-6 text-blue-100">
                Already have an account? <Link href="/auth/login" className="text-white font-medium underline">Login here</Link>
              </p>
            </motion.div>
        </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
