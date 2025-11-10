


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  BarChart3,
  TrendingUp
} from "lucide-react";

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  // Mock meeting history data
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: "Frontend Developer Interview",
      code: "ABC-123-XYZ",
      date: "Nov 8, 2025",
      time: "10:00 AM - 11:30 AM",
      duration: "1h 30m",
      participants: ["John Doe", "Sarah Smith", "Mike Johnson"],
      status: "completed",
      interviewer: "John Doe",
      candidate: "Sarah Smith",
      rating: 4.5,
      notes: "Great technical skills, strong React knowledge"
    },
    {
      id: 2,
      title: "Backend Discussion",
      code: "DEF-456-UVW",
      date: "Nov 7, 2025",
      time: "2:30 PM - 3:45 PM",
      duration: "1h 15m",
      participants: ["Alice Brown", "Bob Wilson"],
      status: "completed",
      interviewer: "Alice Brown",
      candidate: "Bob Wilson",
      rating: 4.0,
      notes: "Solid understanding of Node.js and databases"
    },
    {
      id: 3,
      title: "Team Standup Meeting",
      code: "GHI-789-RST",
      date: "Nov 9, 2025",
      time: "9:00 AM - 9:30 AM",
      duration: "30m",
      participants: ["Team Lead", "Dev 1", "Dev 2", "Dev 3"],
      status: "cancelled",
      interviewer: "Team Lead",
      candidate: "Team Members",
      rating: null,
      notes: "Cancelled due to scheduling conflict"
    },
    {
      id: 4,
      title: "Full Stack Interview",
      code: "JKL-012-MNO",
      date: "Nov 6, 2025",
      time: "3:00 PM - 4:30 PM",
      duration: "1h 30m",
      participants: ["Emma Davis", "James Miller"],
      status: "completed",
      interviewer: "Emma Davis",
      candidate: "James Miller",
      rating: 3.5,
      notes: "Good problem-solving skills, needs improvement in system design"
    },
    {
      id: 5,
      title: "UI/UX Design Review",
      code: "PQR-345-STU",
      date: "Nov 5, 2025",
      time: "11:00 AM - 12:00 PM",
      duration: "1h",
      participants: ["Design Lead", "Product Manager"],
      status: "no-show",
      interviewer: "Design Lead",
      candidate: "Product Manager",
      rating: null,
      notes: "Candidate did not join the meeting"
    }
  ]);

  // Filter meetings based on search and status
  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meeting.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meeting.candidate.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || meeting.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Stats calculation
  const stats = {
    total: meetings.length,
    completed: meetings.filter(m => m.status === "completed").length,
    cancelled: meetings.filter(m => m.status === "cancelled").length,
    noShow: meetings.filter(m => m.status === "no-show").length,
    avgRating: (meetings.filter(m => m.rating).reduce((sum, m) => sum + m.rating, 0) / 
                meetings.filter(m => m.rating).length).toFixed(1)
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle, label: "Completed" },
      cancelled: { bg: "bg-gray-100", text: "text-gray-700", icon: XCircle, label: "Cancelled" },
      "no-show": { bg: "bg-red-100", text: "text-red-700", icon: AlertCircle, label: "No Show" }
    };
    
    const config = statusConfig[status];
    const Icon = config.icon;
    
    return (
      <span className={`${config.bg} ${config.text} px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1.5`}>
        <Icon size={14} />
        {config.label}
      </span>
    );
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? "text-yellow-400" : "text-gray-300"}>
            ★
          </span>
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-x-1 inline-flex"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12 relative z-10">
        
        {/* Header */}
        <div className="mb-8 animate-slideInDown">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Calendar className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Meeting History</h1>
              <p className="text-gray-600">Track and review all your past interviews</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 animate-slideInDown animation-delay-200">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="text-indigo-600" size={24} />
              <span className="text-3xl font-bold text-gray-900">{stats.total}</span>
            </div>
            <p className="text-sm text-gray-600 font-semibold">Total Meetings</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="text-green-600" size={24} />
              <span className="text-3xl font-bold text-green-600">{stats.completed}</span>
            </div>
            <p className="text-sm text-gray-600 font-semibold">Completed</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <XCircle className="text-gray-600" size={24} />
              <span className="text-3xl font-bold text-gray-600">{stats.cancelled}</span>
            </div>
            <p className="text-sm text-gray-600 font-semibold">Cancelled</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-red-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="text-red-600" size={24} />
              <span className="text-3xl font-bold text-red-600">{stats.noShow}</span>
            </div>
            <p className="text-sm text-gray-600 font-semibold">No Show</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-yellow-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-yellow-600" size={24} />
              <span className="text-3xl font-bold text-yellow-600">{stats.avgRating}</span>
            </div>
            <p className="text-sm text-gray-600 font-semibold">Avg Rating</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-gray-100 animate-slideInDown animation-delay-400">
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by title, code, or candidate name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-12 pr-8 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer font-semibold"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no-show">No Show</option>
              </select>
            </div>

            {/* Export Button */}
            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg">
              <Download size={20} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Meeting Cards */}
        <div className="space-y-4">
          {filteredMeetings.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
              <Calendar className="mx-auto text-gray-400 mb-4" size={64} />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No meetings found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredMeetings.map((meeting, index) => (
              <div
                key={meeting.id}
                className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-slideInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6">
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{meeting.title}</h3>
                        {getStatusBadge(meeting.status)}
                      </div>
                      <code className="bg-gray-100 px-3 py-1 rounded-lg font-mono text-sm font-bold text-gray-700">
                        {meeting.code}
                      </code>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View Details">
                        <Eye className="text-gray-600" size={20} />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 className="text-red-600" size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Calendar className="text-indigo-600" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">Date</p>
                        <p className="text-sm font-bold text-gray-900">{meeting.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Clock className="text-purple-600" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">Duration</p>
                        <p className="text-sm font-bold text-gray-900">{meeting.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                        <Users className="text-pink-600" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">Participants</p>
                        <p className="text-sm font-bold text-gray-900">{meeting.participants.length} people</p>
                      </div>
                    </div>
                  </div>

                  {/* Participants & Rating Row */}
                  <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs text-gray-500 font-semibold mb-1">Interviewer</p>
                        <p className="text-sm font-bold text-gray-900">{meeting.interviewer}</p>
                      </div>
                      <div className="w-px h-10 bg-gray-300" />
                      <div>
                        <p className="text-xs text-gray-500 font-semibold mb-1">Candidate</p>
                        <p className="text-sm font-bold text-gray-900">{meeting.candidate}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      {meeting.rating ? (
                        <>
                          <p className="text-xs text-gray-500 font-semibold mb-1">Rating</p>
                          {renderStars(meeting.rating)}
                        </>
                      ) : (
                        <p className="text-sm text-gray-500 italic">No rating</p>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  {meeting.notes && (
                    <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Notes</p>
                      <p className="text-sm text-gray-700">{meeting.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        .animate-slideInDown {
          animation: slideInDown 0.6s ease-out;
        }

        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
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

export default History;