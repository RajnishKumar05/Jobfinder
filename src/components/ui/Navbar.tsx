import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-blue-600 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">JobFinder</Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/jobs" className="hover:underline">Jobs</Link></li>
              <li><Link href="/dashboard" className="hover:underline">Dashboard</Link></li>
              <li><Link href="/profile" className="hover:underline">Profile</Link></li>
              <li><Link href="/auth" className="hover:underline text-white">Sign In</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
} 