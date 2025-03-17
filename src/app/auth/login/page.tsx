"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AnimatedNavbar from "@/components/ui/AnimatedNavbar";
import Footer from "@/components/ui/Footer";
import { loginUser, UserType, signInWithGoogle, signInWithFacebook, signInWithLinkedIn } from "@/lib/firebase";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FirebaseError } from "firebase/app";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState<string | null>(null);
  
  // Check URL params for user type on component mount
  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "employer" || type === "employee") {
      setUserType(type as UserType);
    }
  }, [searchParams]);
  
  // If a user type is selected, show the specific login form
  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setError(null); // Clear any errors when switching types
  };
  
  // Validate form fields as user types
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return value ? (emailRegex.test(value) ? "" : "Valid email is required") : "Email is required";
      case 'password':
        return value ? (value.length < 6 ? "Password must be at least 6 characters" : "") : "Password is required";
      default:
        return "";
    }
  };
  
  // Update form data as user types with real-time validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Only validate text fields, not checkboxes
    if (type !== 'checkbox') {
      setFormErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };
  
  // Check if form is valid
  const isFormValid = useMemo(() => {
    if (!formData.email || !formData.password) return false;
    return !formErrors.email && !formErrors.password;
  }, [formData.email, formData.password, formErrors.email, formErrors.password]);
  
  // Handle form submission for login - now optimized
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Form validation
    if (!userType) {
      setError("Please select account type");
      return;
    }
    
    // Final validation check
    const emailError = validateField('email', formData.email);
    const passwordError = validateField('password', formData.password);
    
    if (emailError || passwordError) {
      setFormErrors({
        email: emailError,
        password: passwordError
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      const { user, userData, error: loginError } = await loginUser(
        formData.email,
        formData.password,
        formData.rememberMe
      );
      
      if (loginError) {
        throw loginError;
      }
      
      if (!user || !userData) {
        throw new Error("Login failed. Please try again.");
      }
      
      // Check if the user's type matches the selected type
      if (userData.userType !== userType) {
        throw new Error(`This account is registered as a ${userData.userType}. Please select the correct account type.`);
      }
      
      // Successfully logged in
      toast.success("Login successful! Redirecting...");
      
      // Redirect based on user type - immediately to improve perceived performance
      const redirectPath = userData.userType === "employer" ? "/profile" : "/employee-profile";
      router.push(redirectPath);
      
    } catch (err: unknown) {
      console.error("Login error:", err);
      let errorMessage = "Failed to login. Please try again.";
      
      if (err instanceof FirebaseError) {
        // Handle Firebase-specific errors
        switch (err.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            errorMessage = "Invalid email or password. Please try again.";
            break;
          case 'auth/too-many-requests':
            errorMessage = "Too many failed login attempts. Please try again later.";
            break;
          case 'auth/user-disabled':
            errorMessage = "This account has been disabled. Please contact support.";
            break;
          default:
            errorMessage = err.message || errorMessage;
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle social media login - optimized with better loading states
  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'linkedin') => {
    if (!userType) {
      setError("Please select an account type first");
      return;
    }

    setSocialLoading(provider);
    setError(null);

    try {
      let result;
      
      switch (provider) {
        case 'google':
          result = await signInWithGoogle(userType, formData.rememberMe);
          break;
        case 'facebook':
          result = await signInWithFacebook(userType, formData.rememberMe);
          break;
        case 'linkedin':
          result = await signInWithLinkedIn(userType, formData.rememberMe);
          break;
      }
      
      const { user, userData, error: socialLoginError } = result;
      
      if (socialLoginError) {
        throw socialLoginError;
      }
      
      if (!user || !userData) {
        throw new Error("Login failed. Please try again.");
      }
      
      // Successfully logged in
      toast.success(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login successful!`);
      
      // Redirect based on user type - immediately to improve perceived performance
      const redirectPath = userData.userType === "employer" ? "/profile" : "/employee-profile";
      router.push(redirectPath);
      
    } catch (err: unknown) {
      console.error(`${provider} login error:`, err);
      let errorMessage = `Failed to login with ${provider}. Please try again.`;
      
      if (err instanceof FirebaseError) {
        // Handle Firebase-specific errors
        switch (err.code) {
          case 'auth/popup-closed-by-user':
            errorMessage = "Login popup was closed. Please try again.";
            break;
          case 'auth/cancelled-popup-request':
            errorMessage = "Login process was cancelled. Please try again.";
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
      toast.error(`Login with ${provider} failed.`);
    } finally {
      setSocialLoading(null);
    }
  };
  
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <AnimatedNavbar />
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} />
      
      <div className="bg-gradient-to-b from-teal-900 to-teal-800 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Login to JobFinder</h1>
          <p className="text-xl text-cyan-100">Access your account to manage your job search or hiring process</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
        <div className="max-w-md w-full relative z-[200] mt-[-20px]">
          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div 
                key="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* User Type Selection */}
          <AnimatePresence mode="wait">
            {!userType && (
              <motion.div 
                key="user-type-selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-lg p-6 mb-6 relative z-[200]"
              >
                <h2 className="text-2xl font-semibold mb-4 text-center text-teal-800">Select Account Type</h2>
                
                <div className="grid grid-cols-1 gap-4">
                  <motion.button 
                    onClick={() => handleUserTypeSelect("employer")}
                    className="bg-white border-2 border-teal-600 rounded-lg p-4 flex flex-col items-center transition-all"
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-14 h-14 flex items-center justify-center bg-teal-100 rounded-full mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1H7a1 1 0 00-1 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800">Employer</h3>
                    <p className="text-gray-500 text-center text-sm mt-1">Post jobs and find candidates</p>
                  </motion.button>
                  
                  <motion.button 
                    onClick={() => handleUserTypeSelect("employee")}
                    className="bg-white border-2 border-cyan-600 rounded-lg p-4 flex flex-col items-center transition-all"
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-14 h-14 flex items-center justify-center bg-cyan-100 rounded-full mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-800">Job Seeker</h3>
                    <p className="text-gray-500 text-center text-sm mt-1">Find jobs and build career</p>
                  </motion.button>
                </div>
              </motion.div>
            )}
            
            {/* Employer Login Form */}
            {userType === "employer" && (
              <motion.div 
                key="employer-login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-lg p-6 mb-4 relative z-[200]"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-teal-800">Employer Login</h2>
                  <button 
                    onClick={() => setUserType(null)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Back
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="employer-email" className="block text-gray-700 mb-1 text-sm font-medium">Email Address</label>
                    <input 
                      type="email" 
                      id="employer-email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-2 border ${formErrors.email && formData.email ? 'border-red-300' : 'border-teal-200'} rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black transition-colors`}
                      placeholder="your@company.com"
                      disabled={isLoading}
                      required
                    />
                    {formErrors.email && formData.email && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="employer-password" className="block text-gray-700 mb-1 text-sm font-medium">Password</label>
                    <input 
                      type="password" 
                      id="employer-password" 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full p-2 border ${formErrors.password && formData.password ? 'border-red-300' : 'border-teal-200'} rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-black transition-colors`}
                      placeholder="••••••••"
                      disabled={isLoading}
                      required
                    />
                    {formErrors.password && formData.password && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="employer-remember" 
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="h-4 w-4 accent-teal-600"
                        disabled={isLoading}
                      />
                      <label htmlFor="employer-remember" className="ml-2 text-gray-700 text-sm">Remember me</label>
                    </div>
                    
                    <a href="#" className="text-teal-600 hover:text-teal-800 text-sm transition-colors">Forgot password?</a>
                  </div>
                  
                  <motion.button 
                    type="submit"
                    disabled={isLoading || !isFormValid}
                    className={`w-full py-2 ${isFormValid ? 'bg-teal-700 hover:bg-teal-600' : 'bg-teal-300 cursor-not-allowed'} text-white rounded transition-all relative overflow-hidden`}
                    whileHover={{ scale: isLoading || !isFormValid ? 1 : 1.01 }}
                    whileTap={{ scale: isLoading || !isFormValid ? 1 : 0.99 }}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging in...
                      </span>
                    ) : 'Login'}
                  </motion.button>
                  
                  <p className="text-center mt-3 text-gray-600 text-sm">
                    Don&apos;t have an account? <Link href="/auth/register?type=employer" className="text-teal-600 hover:text-teal-800 transition-colors">Register as an Employer</Link>
                  </p>
                </form>
              </motion.div>
            )}
            
            {/* Employee Login Form */}
            {userType === "employee" && (
              <motion.div 
                key="employee-login"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-lg p-6 mb-4 relative z-[200]"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-cyan-800">Job Seeker Login</h2>
                  <button 
                    onClick={() => setUserType(null)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Back
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="employee-email" className="block text-gray-700 mb-1 text-sm font-medium">Email Address</label>
                    <input 
                      type="email" 
                      id="employee-email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-2 border ${formErrors.email && formData.email ? 'border-red-300' : 'border-cyan-200'} rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black transition-colors`}
                      placeholder="your.name@example.com"
                      disabled={isLoading}
                      required
                    />
                    {formErrors.email && formData.email && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="employee-password" className="block text-gray-700 mb-1 text-sm font-medium">Password</label>
                    <input 
                      type="password" 
                      id="employee-password" 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full p-2 border ${formErrors.password && formData.password ? 'border-red-300' : 'border-cyan-200'} rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black transition-colors`}
                      placeholder="••••••••"
                      disabled={isLoading}
                      required
                    />
                    {formErrors.password && formData.password && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="employee-remember" 
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="h-4 w-4 accent-cyan-600"
                        disabled={isLoading}
                      />
                      <label htmlFor="employee-remember" className="ml-2 text-gray-700 text-sm">Remember me</label>
                    </div>
                    
                    <a href="#" className="text-cyan-600 hover:text-cyan-800 text-sm transition-colors">Forgot password?</a>
                  </div>
                  
                  <motion.button 
                    type="submit"
                    disabled={isLoading || !isFormValid}
                    className={`w-full py-2 ${isFormValid ? 'bg-cyan-700 hover:bg-cyan-600' : 'bg-cyan-300 cursor-not-allowed'} text-white rounded transition-all relative overflow-hidden`}
                    whileHover={{ scale: isLoading || !isFormValid ? 1 : 1.01 }}
                    whileTap={{ scale: isLoading || !isFormValid ? 1 : 0.99 }}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging in...
                      </span>
                    ) : 'Login'}
                  </motion.button>
                  
                  <p className="text-center mt-3 text-gray-600 text-sm">
                    Don&apos;t have an account? <Link href="/auth/register?type=employee" className="text-cyan-600 hover:text-cyan-800 transition-colors">Register as a Job Seeker</Link>
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Social Login Options */}
          {userType && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative z-[200]"
            >
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <motion.button
                  className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 relative"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading || socialLoading !== null}
                >
                  {socialLoading === 'google' ? (
                    <span className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-md">
                      <svg className="animate-spin h-4 w-4 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  ) : null}
                  <svg className="h-5 w-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </motion.button>
                
                <motion.button
                  className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 relative"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={isLoading || socialLoading !== null}
                >
                  {socialLoading === 'facebook' ? (
                    <span className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-md">
                      <svg className="animate-spin h-4 w-4 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  ) : null}
                  <svg className="h-5 w-5 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                  </svg>
                </motion.button>
                
                <motion.button
                  className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 relative"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => handleSocialLogin('linkedin')}
                  disabled={isLoading || socialLoading !== null}
                >
                  {socialLoading === 'linkedin' ? (
                    <span className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-md">
                      <svg className="animate-spin h-4 w-4 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  ) : null}
                  <svg className="h-5 w-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 