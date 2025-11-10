import React from "react";
import { Calendar, Clock, User, Video, MoreVertical } from "lucide-react";

const DashboardCard = ({ meeting }) => {
  // Calculate time until meeting
  const getTimeUntilMeeting = () => {
    const meetingDate = new Date(`${meeting.date} ${meeting.time}`);
    const now = new Date();
    const diffMs = meetingDate - now;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 0) return "Past";
    if (diffMins < 60) return `In ${diffMins} mins`;
    if (diffMins < 1440) return `In ${Math.floor(diffMins / 60)} hours`;
    return `In ${Math.floor(diffMins / 1440)} days`;
  };

  const timeUntil = getTimeUntilMeeting();
  const isPast = timeUntil === "Past";
  const isUpcoming = timeUntil.includes("mins") || timeUntil.includes("hours");

  return (
    <div className="bg-white shadow-md rounded-xl p-5 mb-4 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300 group">
      {/* Header with Title and Status Badge */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
            {meeting.title}
          </h2>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isPast
                  ? "bg-gray-100 text-gray-600"
                  : isUpcoming
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {timeUntil}
            </span>
          </div>
        </div>
        
        {/* More Options Button */}
        <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Meeting Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-700">
          <Calendar size={18} className="mr-3 text-blue-500" />
          <span className="text-sm font-medium">{meeting.date}</span>
        </div>
        
        <div className="flex items-center text-gray-700">
          <Clock size={18} className="mr-3 text-blue-500" />
          <span className="text-sm font-medium">{meeting.time}</span>
        </div>
        
        <div className="flex items-center text-gray-700">
          <User size={18} className="mr-3 text-blue-500" />
          <span className="text-sm font-medium">{meeting.interviewer}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-3 border-t border-gray-100">
        {!isPast && (
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
            <Video size={18} />
            <span>Join Meeting</span>
          </button>
        )}
        
        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 px-4 rounded-lg transition-colors">
          {isPast ? "View Recording" : "View Details"}
        </button>
      </div>
    </div>
  );
};

// Demo Component
export default function DashboardDemo() {
  const meetings = [
    {
      title: "Frontend Developer Interview",
      date: "2025-11-15",
      time: "14:30",
      interviewer: "Sarah Johnson"
    },
    {
      title: "Technical Assessment - Round 2",
      date: "2025-11-10",
      time: "10:00",
      interviewer: "Mike Chen"
    },
    {
      title: "Final Interview - Senior Role",
      date: "2025-11-08",
      time: "16:00",
      interviewer: "Emily Rodriguez"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Interviews</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meetings.map((meeting, index) => (
            <DashboardCard key={index} meeting={meeting} />
          ))}
        </div>
      </div>
    </div>
  );
}