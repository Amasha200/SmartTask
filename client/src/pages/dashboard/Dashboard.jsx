import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, LogIn, History, Search, Bell, User, Calendar, Filter, SortDesc, TrendingUp, Clock, Video, ChevronDown, X, Settings, LogOut, Moon, Sun } from "lucide-react";

// Enhanced Dashboard Card Component with Animations
const DashboardCard = ({ meeting, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const getTimeUntilMeeting = () => {
        const meetingDate = new Date(`${meeting.date} ${meeting.time}`);
        const now = new Date();
        const diffMs = meetingDate - now;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 0) return { text: "Past", urgent: false };
        if (diffMins < 30) return { text: `In ${diffMins} mins`, urgent: true };
        if (diffMins < 60) return { text: `In ${diffMins} mins`, urgent: false };
        if (diffMins < 1440) return { text: `In ${Math.floor(diffMins / 60)} hours`, urgent: false };
        return { text: `In ${Math.floor(diffMins / 1440)} days`, urgent: false };
    };

    const timeInfo = getTimeUntilMeeting();
    const isPast = timeInfo.text === "Past";

    return (
        <div
            className="relative"
            style={{
                animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`bg-white rounded-2xl p-6 transition-all duration-300 border-2 ${isHovered ? 'border-blue-400 shadow-2xl scale-[1.02]' : 'border-gray-100 shadow-md'
                } ${timeInfo.urgent ? 'ring-2 ring-orange-400 ring-opacity-50' : ''}`}>

                {/* Urgent Badge */}
                {timeInfo.urgent && (
                    <div className="absolute -top-2 -right-2 animate-pulse">
                        <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            URGENT
                        </span>
                    </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                            {meeting.title}
                        </h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${isPast ? 'bg-gray-100 text-gray-600' :
                                timeInfo.urgent ? 'bg-orange-100 text-orange-700 animate-pulse' :
                                    'bg-green-100 text-green-700'
                            }`}>
                            {timeInfo.text}
                        </span>
                    </div>

                    {/* More Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ChevronDown size={20} className={`text-gray-600 transition-transform ${showMenu ? 'rotate-180' : ''}`} />
                        </button>

                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 z-10 animate-fadeIn">
                                <button className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium text-gray-700 rounded-t-xl transition-colors">
                                    Edit Meeting
                                </button>
                                <button className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                                    Share Link
                                </button>
                                <button className="w-full text-left px-4 py-3 hover:bg-red-50 text-sm font-medium text-red-600 rounded-b-xl transition-colors">
                                    Cancel Meeting
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Meeting Details */}
                <div className="space-y-3 mb-5">
                    <div className="flex items-center text-gray-700 group">
                        <Calendar size={18} className="mr-3 text-blue-500 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">{meeting.date}</span>
                    </div>

                    <div className="flex items-center text-gray-700 group">
                        <Clock size={18} className="mr-3 text-blue-500 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">{meeting.time}</span>
                    </div>

                    <div className="flex items-center text-gray-700 group">
                        <User size={18} className="mr-3 text-blue-500 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">{meeting.interviewer}</span>
                    </div>
                </div>

                {/* Progress Bar (for upcoming meetings) */}
                {!isPast && (
                    <div className="mb-4">
                        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                            <span>Preparation</span>
                            <span>{meeting.preparation || 75}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${meeting.preparation || 75}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                    {!isPast ? (
                        <>
                            <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-xl transform hover:-translate-y-0.5">
                                <Video size={18} />
                                <span>Join Now</span>
                            </button>
                            <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300">
                                <Settings size={18} />
                            </button>
                        </>
                    ) : (
                        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-300">
                            View Recording
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// Main Dashboard Component
const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [sortBy, setSortBy] = useState("date");
    const [showFilters, setShowFilters] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(3);
    const [stats, setStats] = useState({ total: 0, upcoming: 0, completed: 0 });

    const meetings = [
        {
            title: "Frontend Developer Interview",
            date: "2025-11-15",
            time: "10:00 AM",
            interviewer: "John Doe",
            preparation: 85
        },
        {
            title: "Backend Interview",
            date: "2025-11-12",
            time: "2:00 PM",
            interviewer: "Jane Smith",
            preparation: 60
        },
        {
            title: "Fullstack Interview",
            date: "2025-11-10",
            time: "11:30 AM",
            interviewer: "Alice Johnson",
            preparation: 90
        },
        {
            title: "System Design Discussion",
            date: "2025-11-08",
            time: "3:00 PM",
            interviewer: "Bob Wilson",
            preparation: 100
        },
    ];

    // Calculate stats
    useEffect(() => {
        const now = new Date();
        const upcoming = meetings.filter(m => new Date(`${m.date} ${m.time}`) >= now).length;
        const completed = meetings.filter(m => new Date(`${m.date} ${m.time}`) < now).length;
        setStats({ total: meetings.length, upcoming, completed });
    }, []);

    // Filter and sort meetings
    const filteredMeetings = meetings
        .filter(meeting => {
            const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                meeting.interviewer.toLowerCase().includes(searchQuery.toLowerCase());
            const now = new Date();
            const meetingDate = new Date(`${meeting.date} ${meeting.time}`);

            if (filterType === "upcoming") return matchesSearch && meetingDate >= now;
            if (filterType === "past") return matchesSearch && meetingDate < now;
            return matchesSearch;
        })
        .sort((a, b) => {
            if (sortBy === "date") {
                return new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`);
            }
            return a.title.localeCompare(b.title);
        });

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'} transition-colors duration-300`}>

            {/* Animated Background Shapes */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
                <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
            </div>

            {/* Top Navigation */}
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-lg border-b sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 transition-colors duration-300`}>
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                                <Calendar className="text-white" size={26} />
                            </div>
                            <div>
                                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Smart Interview</h1>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your AI Interview Platform</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Dark Mode Toggle */}
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`p-2 ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'} hover:scale-110 rounded-lg transition-all`}
                            >
                                {darkMode ? <Sun size={22} /> : <Moon size={22} />}
                            </button>

                            {/* Notifications */}
                            <button
                                onClick={() => setNotifications(0)}
                                className={`relative p-2 ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} rounded-lg transition-all hover:scale-110`}
                            >
                                <Bell size={22} />
                                {notifications > 0 && (
                                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                                        {notifications}
                                    </span>
                                )}
                            </button>

                            {/* Profile Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowProfile(!showProfile)}
                                    className={`p-2 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-blue-100 text-blue-600'} rounded-lg transition-all hover:scale-110`}
                                >
                                    <User size={22} />
                                </button>

                                {showProfile && (
                                    <div className={`absolute right-0 mt-3 w-56 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl shadow-2xl border z-20 animate-fadeIn`}>
                                        <div className="p-4 border-b border-gray-200">
                                            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>John Developer</p>
                                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>john@example.com</p>
                                        </div>
                                        <button className={`w-full text-left px-4 py-3 ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'} transition-colors flex items-center gap-2`}>
                                            <Settings size={16} />
                                            <span className="text-sm font-medium">Settings</span>
                                        </button>
                                        <button className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 transition-colors flex items-center gap-2 rounded-b-2xl">
                                            <LogOut size={16} />
                                            <span className="text-sm font-medium">Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Interviews</p>
                                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.total}</p>
                            </div>
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Calendar className="text-blue-600" size={28} />
                            </div>
                        </div>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Upcoming</p>
                                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.upcoming}</p>
                            </div>
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                                <TrendingUp className="text-green-600" size={28} />
                            </div>
                        </div>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Completed</p>
                                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.completed}</p>
                            </div>
                            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                                <History className="text-purple-600" size={28} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

                    {/* Create Meeting */}
                    <Link
                        to="/create"
                        className={`group ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-blue-50'} border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200 hover:border-blue-400'} rounded-2xl p-6 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 block`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Plus className="text-white" size={26} />
                            </div>
                            <div className="text-left">
                                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                                    Create Meeting
                                </h3>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Schedule new interview
                                </p>
                            </div>
                        </div>
                    </Link>

                    {/* Join Meeting (already a Link) */}
                    <Link
                        to="/join"
                        className={`group ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-green-50'} border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200 hover:border-green-400'} rounded-2xl p-6 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 block`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <LogIn className="text-white" size={26} />
                            </div>
                            <div className="text-left">
                                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} group-hover:text-green-600 transition-colors mb-1`}>
                                    Join Meeting
                                </h3>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Enter meeting code
                                </p>
                            </div>
                        </div>
                    </Link>

                    {/* View History */}
                    <Link
                        to="/history"
                        className={`group ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-purple-50'} border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200 hover:border-purple-400'} rounded-2xl p-6 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 block`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <History className="text-white" size={26} />
                            </div>
                            <div className="text-left">
                                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                                    View History
                                </h3>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Past interviews
                                </p>
                            </div>
                        </div>
                    </Link>

                </div>


                {/* Search and Filters */}
                <div className="mb-6 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search meetings..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full pl-12 pr-4 py-4 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'} border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-md`}
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`px-6 py-4 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-700'} border-2 rounded-2xl font-semibold hover:scale-105 transition-all shadow-md flex items-center gap-2`}
                        >
                            <Filter size={20} />
                            <span>Filter</span>
                        </button>

                        <button
                            onClick={() => setSortBy(sortBy === "date" ? "title" : "date")}
                            className={`px-6 py-4 ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-700'} border-2 rounded-2xl font-semibold hover:scale-105 transition-all shadow-md flex items-center gap-2`}
                        >
                            <SortDesc size={20} />
                            <span>Sort</span>
                        </button>
                    </div>
                </div>

                {/* Filter Dropdown */}
                {showFilters && (
                    <div className={`mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-lg border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'} animate-fadeIn`}>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setFilterType("all")}
                                className={`px-4 py-2 rounded-xl font-semibold transition-all ${filterType === "all" ? 'bg-blue-600 text-white' : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilterType("upcoming")}
                                className={`px-4 py-2 rounded-xl font-semibold transition-all ${filterType === "upcoming" ? 'bg-green-600 text-white' : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`
                                    }`}
                            >
                                Upcoming
                            </button>
                            <button
                                onClick={() => setFilterType("past")}
                                className={`px-4 py-2 rounded-xl font-semibold transition-all ${filterType === "past" ? 'bg-gray-600 text-white' : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`
                                    }`}
                            >
                                Past
                            </button>
                        </div>
                    </div>
                )}

                {/* Meetings Grid */}
                {filteredMeetings.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredMeetings.map((meeting, index) => (
                            <DashboardCard key={index} meeting={meeting} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-12 text-center shadow-lg animate-fadeIn`}>
                        <div className={`w-24 h-24 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                            <Calendar className={darkMode ? 'text-gray-500' : 'text-gray-400'} size={48} />
                        </div>
                        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                            No meetings found
                        </h3>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                            {searchQuery ? "Try adjusting your search" : "Create your first meeting to get started"}
                        </p>
                        <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            <Plus size={22} />
                            Create Meeting
                        </button>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </div>
    );
};

export default Dashboard;