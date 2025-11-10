import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, LogIn, History, Search, Bell, User, Calendar } from "lucide-react";
import DashboardCard from "../../components/DashboardCard";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const meetings = [
    {
      title: "Frontend Developer Interview",
      date: "2025-11-15",
      time: "10:00 AM",
      interviewer: "John Doe",
    },
    {
      title: "Backend Interview",
      date: "2025-11-12",
      time: "2:00 PM",
      interviewer: "Jane Smith",
    },
    {
      title: "Fullstack Interview",
      date: "2025-11-10",
      time: "11:30 AM",
      interviewer: "Alice Johnson",
    },
  ];

  // Filter meetings based on search
  const filteredMeetings = meetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    meeting.interviewer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate upcoming and past meetings
  const now = new Date();
  const upcomingMeetings = filteredMeetings.filter(m => new Date(`${m.date} ${m.time}`) >= now);
  const pastMeetings = filteredMeetings.filter(m => new Date(`${m.date} ${m.time}`) < now);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Smart Interview</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={22} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <User size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h2>
          <p className="text-gray-600 text-lg">
            Manage your interviews and track your progress
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            to="/create"
            className="group bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-400 rounded-xl p-6 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors">
                <Plus className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Create Meeting
                </h3>
                <p className="text-sm text-gray-600">Schedule new interview</p>
              </div>
            </div>
          </Link>

          <Link
            to="/join"
            className="group bg-white hover:bg-green-50 border-2 border-gray-200 hover:border-green-400 rounded-xl p-6 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center transition-colors">
                <LogIn className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                  Join Meeting
                </h3>
                <p className="text-sm text-gray-600">Enter meeting code</p>
              </div>
            </div>
          </Link>

          <Link
            to="/history"
            className="group bg-white hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-400 rounded-xl p-6 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-200 rounded-lg flex items-center justify-center transition-colors">
                <History className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                  View History
                </h3>
                <p className="text-sm text-gray-600">Past interviews</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search meetings by title or interviewer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Meetings Section */}
        {filteredMeetings.length > 0 ? (
          <>
            {/* Upcoming Meetings */}
            {upcomingMeetings.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Upcoming Interviews
                  </h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {upcomingMeetings.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {upcomingMeetings.map((meeting, index) => (
                    <DashboardCard key={index} meeting={meeting} />
                  ))}
                </div>
              </div>
            )}

            {/* Past Meetings */}
            {pastMeetings.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Past Interviews
                  </h3>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                    {pastMeetings.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {pastMeetings.map((meeting, index) => (
                    <DashboardCard key={index} meeting={meeting} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-gray-400" size={40} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery ? "No meetings found" : "No meetings scheduled"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Create your first meeting to get started"}
            </p>
            {!searchQuery && (
              <Link
                to="/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                <Plus size={20} />
                Create Meeting
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;