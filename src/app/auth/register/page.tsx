"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AnimatedNavbar from "@/components/ui/AnimatedNavbar";
import Footer from "@/components/ui/Footer";
import { registerUser, UserType, signInWithGoogle, signInWithFacebook, signInWithLinkedIn } from "@/lib/firebase";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FirebaseError } from "firebase/app";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false
  });
  const [error, setError] = useState<string | null>(null);
  
  // Check URL params for user type on component mount
  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "employer" || type === "employee") {
      setUserType(type);
    }
  }, [searchParams]);
  
  // If a user type is selected, show the specific registration form
  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
  };

  // Update form data as user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle form submission for registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Form validation
    if (!userType) {
      setError("Please select account type");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    if (!formData.termsAccepted) {
      setError("You must accept the terms and privacy policy");
      return;
    }
    
    try {
      setIsLoading(true);
      
      const displayName = userType === "employer" 
        ? formData.displayName // Company name for employers
        : formData.displayName; // Full name for employees
      
      const { user, error: registerError } = await registerUser(
        formData.email,
        formData.password,
        userType,
        displayName
      );
      
      if (registerError) {
        throw registerError;
      }
      
      // Successfully registered
      toast.success("Registration successful!");
      
      // Redirect based on user type
      setTimeout(() => {
        if (userType === "employer") {
          router.push("/profile");
        } else {
          router.push("/employee-profile");
        }
      }, 1500);
      
    } catch (err: unknown) {
      console.error("Registration error:", err);
      let errorMessage = "Failed to register. Please try again.";
      
      if (err instanceof FirebaseError) {
        // Handle Firebase-specific errors
        switch (err.code) {
          case 'auth/email-already-in-use':
            errorMessage = "This email is already registered. Please use a different email or login.";
            break;
          case 'auth/invalid-email':
            errorMessage = "Invalid email format. Please enter a valid email address.";
            break;
          case 'auth/weak-password':
            errorMessage = "Password is too weak. Please use a stronger password.";
            break;
          default:
            errorMessage = err.message || errorMessage;
        }
      }
      
      setError(errorMessage);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle social media registration
  const handleSocialRegistration = async (provider: 'google' | 'facebook' | 'linkedin') => {
    if (!userType) {
      setError("Please select an account type first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let result;
      
      switch (provider) {
        case 'google':
          result = await signInWithGoogle(userType);
          break;
        case 'facebook':
          result = await signInWithFacebook(userType);
          break;
        case 'linkedin':
          result = await signInWithLinkedIn(userType);
          break;
      }
      
      const { user, userData, error: socialLoginError } = result;
      
      if (socialLoginError) {
        throw socialLoginError;
      }
      
      if (!user || !userData) {
        throw new Error("Registration failed. Please try again.");
      }
      
      // Successfully registered
      toast.success(`Account created with ${provider.charAt(0).toUpperCase() + provider.slice(1)}!`);
      
      // Redirect based on user type
      setTimeout(() => {
        if (userData.userType === "employer") {
          router.push("/profile");
        } else {
          router.push("/employee-profile");
        }
      }, 1500);
      
    } catch (err: unknown) {
      console.error(`${provider} registration error:`, err);
      let errorMessage = `Failed to register with ${provider}. Please try again.`;
      
      if (err instanceof FirebaseError) {
        // Handle Firebase-specific errors
        switch (err.code) {
          case 'auth/popup-closed-by-user':
            errorMessage = "Registration popup was closed. Please try again.";
            break;
          case 'auth/cancelled-popup-request':
            errorMessage = "Registration process was cancelled. Please try again.";
            break;
          case 'auth/account-exists-with-different-credential':
            errorMessage = "An account already exists with the same email but different sign-in credentials. Try signing in a different way.";
            break;
          default:
            errorMessage = err.message || errorMessage;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast.error(`Registration with ${provider} failed.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Add this after the form submission buttons in both employer and employee forms
  const SocialRegistrationButtons = () => (
    <div className="mt-6">
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or register with</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <motion.button
          className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => handleSocialRegistration('google')}
          disabled={isLoading}
        >
          <svg className="h-5 w-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
          </svg>
        </motion.button>
        
        <motion.button
          className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => handleSocialRegistration('facebook')}
          disabled={isLoading}
        >
          <svg className="h-5 w-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
          </svg>
        </motion.button>
        
        <motion.button
          className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => handleSocialRegistration('linkedin')}
          disabled={isLoading}
        >
          <svg className="h-5 w-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
          </svg>
        </motion.button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <AnimatedNavbar />
      <ToastContainer position="top-center" />
      
      <div className="bg-gradient-to-b from-teal-900 to-teal-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Create an Account</h1>
          <p className="text-xl text-cyan-100">Join JobFinder to access job listings or find talented candidates</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 flex-1 flex flex-col items-center justify-center">
        <div className="max-w-md w-full relative z-[200] mt-[-20px]">
          {/* Error message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            >
              {error}
            </motion.div>
          )}
          
          {/* User Type Selection */}
          {!userType && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-8 mb-6 relative z-[200]"
            >
              <h2 className="text-2xl font-semibold mb-6 text-center text-teal-800">Select Account Type</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <motion.button 
                  onClick={() => handleUserTypeSelect("employer")}
                  className="bg-white border-2 border-teal-600 rounded-lg p-6 flex flex-col items-center transition-all"
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-teal-100 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1H7a1 1 0 00-1 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">Employer</h3>
                  <p className="text-gray-500 text-center mt-2">Post jobs and find the right candidates</p>
                </motion.button>
                
                <motion.button 
                  onClick={() => handleUserTypeSelect("employee")}
                  className="bg-white border-2 border-cyan-600 rounded-lg p-6 flex flex-col items-center transition-all"
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-cyan-100 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">Job Seeker</h3>
                  <p className="text-gray-500 text-center mt-2">Find your dream job and build your career</p>
                </motion.button>
              </div>
            </motion.div>
          )}
          
          {/* Employer Registration Form */}
          {userType === "employer" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-8 mb-6 relative z-[200]"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-teal-800">Employer Registration</h2>
                <button 
                  onClick={() => setUserType(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Back
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="company-name" className="block text-gray-700 mb-1">Company Name</label>
                  <input 
                    type="text" 
                    id="company-name" 
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                    placeholder="Your Company Ltd."
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="employer-email" className="block text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="employer-email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                    placeholder="your@company.com"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="employer-password" className="block text-gray-700 mb-1">Password</label>
                  <input 
                    type="password" 
                    id="employer-password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                    placeholder="••••••••"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="employer-confirm-password" className="block text-gray-700 mb-1">Confirm Password</label>
                  <input 
                    type="password" 
                    id="employer-confirm-password" 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-2 border border-teal-200 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black"
                    placeholder="••••••••"
                    required
                  />
                </div>
                
                <div className="flex items-center mb-6">
                  <input 
                    type="checkbox" 
                    id="employer-terms" 
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="h-4 w-4 accent-teal-600"
                    required
                  />
                  <label htmlFor="employer-terms" className="ml-2 text-gray-700">
                    I agree to the <a href="#" className="text-teal-600 hover:text-teal-800">Terms of Service</a> and <a href="#" className="text-teal-600 hover:text-teal-800">Privacy Policy</a>
                  </label>
                </div>
                
                <motion.button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 bg-teal-700 text-white rounded hover:bg-teal-600 transition disabled:bg-teal-300 disabled:cursor-not-allowed"
                  whileHover={{ scale: isLoading ? 1 : 1.01 }}
                  whileTap={{ scale: isLoading ? 1 : 0.99 }}
                >
                  {isLoading ? 'Creating Account...' : 'Create Employer Account'}
                </motion.button>
                
                <p className="text-center mt-4 text-gray-600">
                  Already have an account? <Link href="/auth/login" className="text-teal-600 hover:text-teal-800">Sign In</Link>
                </p>

                <SocialRegistrationButtons />
              </form>
            </motion.div>
          )}
          
          {/* Employee Registration Form */}
          {userType === "employee" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-8 mb-6 relative z-[200]"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-cyan-800">Job Seeker Registration</h2>
                <button 
                  onClick={() => setUserType(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Back
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="employee-name" className="block text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    id="employee-name" 
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="w-full p-2 border border-cyan-200 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="employee-email" className="block text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="employee-email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-cyan-200 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black"
                    placeholder="your.name@example.com"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="employee-password" className="block text-gray-700 mb-1">Password</label>
                  <input 
                    type="password" 
                    id="employee-password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border border-cyan-200 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black"
                    placeholder="••••••••"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="employee-confirm-password" className="block text-gray-700 mb-1">Confirm Password</label>
                  <input 
                    type="password" 
                    id="employee-confirm-password" 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-2 border border-cyan-200 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black"
                    placeholder="••••••••"
                    required
                  />
                </div>
                
                <div className="flex items-center mb-6">
                  <input 
                    type="checkbox" 
                    id="employee-terms" 
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="h-4 w-4 accent-cyan-600"
                    required
                  />
                  <label htmlFor="employee-terms" className="ml-2 text-gray-700">
                    I agree to the <a href="#" className="text-cyan-600 hover:text-cyan-800">Terms of Service</a> and <a href="#" className="text-cyan-600 hover:text-cyan-800">Privacy Policy</a>
                  </label>
                </div>
                
                <motion.button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 bg-cyan-700 text-white rounded hover:bg-cyan-600 transition disabled:bg-cyan-300 disabled:cursor-not-allowed"
                  whileHover={{ scale: isLoading ? 1 : 1.01 }}
                  whileTap={{ scale: isLoading ? 1 : 0.99 }}
                >
                  {isLoading ? 'Creating Account...' : 'Create Job Seeker Account'}
                </motion.button>
                
                <p className="text-center mt-4 text-gray-600">
                  Already have an account? <Link href="/auth/login" className="text-cyan-600 hover:text-cyan-800">Sign In</Link>
                </p>

                <SocialRegistrationButtons />
              </form>
            </motion.div>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 