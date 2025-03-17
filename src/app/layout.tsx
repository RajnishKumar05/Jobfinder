import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "JobFinder - Find Your Dream Job Today",
  description: "Search for jobs, create your profile, and apply to positions from top companies.",
=======
  title: "JobFinder - Find Your Dream Job",
  description: "A platform to connect job seekers with employers",
>>>>>>> 9a1db631a19bc024dc1c61f1cc5fb57005ec4b71
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
