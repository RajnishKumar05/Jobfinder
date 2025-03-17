import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to JobFinder</h1>
        <p className="text-center mb-8">Find your dream job or post job opportunities</p>
        
        <div className="flex justify-center space-x-4">
          <Link 
            href="/auth/register" 
            className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition-colors"
          >
            Get Started
          </Link>
          <Link 
            href="/auth/login" 
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
