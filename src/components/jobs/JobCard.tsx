import Link from "next/link";

interface JobCardProps {
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    remote: boolean;
    description: string;
    posted: string;
  };
  showFullDescription?: boolean;
}

export default function JobCard({ job, showFullDescription = false }: JobCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold mb-1">{job.title}</h2>
        <span className="text-sm text-gray-500">{job.posted}</span>
      </div>
      <p className="text-blue-600 font-medium">{job.company}</p>
      <p className="text-gray-600 mb-3">{job.location}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{job.type}</span>
        {job.remote && (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Remote</span>
        )}
      </div>
      
      <p className="text-gray-700 mb-4">
        {showFullDescription 
          ? job.description 
          : job.description.length > 100 
            ? `${job.description.substring(0, 100)}...` 
            : job.description
        }
      </p>
      
      <div className="flex justify-between items-center">
        <Link 
          href={`/jobs/${job.id}`} 
          className="text-blue-600 font-medium hover:underline"
        >
          View Details
        </Link>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Apply Now
        </button>
      </div>
    </div>
  );
} 