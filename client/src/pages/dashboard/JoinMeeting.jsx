
import React, { useState } from "react";
import { Video, Copy, Check, AlertCircle, Clock, Users, Calendar, Sparkles } from "lucide-react";

const JoinMeeting = () => {
  const [roomCode, setRoomCode] = useState("");
  const [userName, setUserName] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [recentMeetings] = useState([
    { code: "ABC-123-XYZ", title: "Frontend Interview", time: "10:00 AM" },
    { code: "DEF-456-UVW", title: "Backend Discussion", time: "2:30 PM" },
    { code: "GHI-789-RST", title: "Team Standup", time: "9:00 AM" },
  ]);

  const formatRoomCode = (value) => {
    const cleaned = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    const parts = [];
    for (let i = 0; i < cleaned.length && i < 9; i += 3) {
      parts.push(cleaned.slice(i, i + 3));
    }
    return parts.join('-');
  };

  const handleRoomCodeChange = (e) => {
    const formatted = formatRoomCode(e.target.value);
    setRoomCode(formatted);
    setError("");
  };

  const validateAndJoin = () => {
    setError("");
    if (!userName.trim()) {
      setError("Please enter your name");
      return;
    }
    if (roomCode.length < 11) {
      setError("Please enter a valid meeting code");
      return;
    }
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      console.log("Joining meeting:", roomCode, "as", userName);
    }, 1500);
  };

  const handleQuickJoin = (meeting) => {
    setRoomCode(meeting.code);
    setError("");
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const formatted = formatRoomCode(text);
      setRoomCode(formatted);
      setError("");
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side - Join Form */}
          <div className="space-y-6">
            {/* Header */}
            <div className="animate-slideInLeft">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Video className="text-white" size={32} />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">Join Meeting</h1>
                  <p className="text-gray-600">Enter the meeting code to start</p>
                </div>
              </div>
            </div>

            {/* Join Form Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-100 animate-slideInLeft animation-delay-200">
              
              {/* Name Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      setError("");
                    }}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-lg font-medium"
                  />
                </div>
              </div>

              {/* Meeting Code Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Meeting Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="XXX-XXX-XXX"
                    value={roomCode}
                    onChange={handleRoomCodeChange}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-2xl font-bold text-center tracking-wider uppercase"
                    maxLength={11}
                  />
                  <button
                    onClick={handlePaste}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-all"
                  >
                    Paste
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {roomCode.length}/11 characters
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3 animate-shake">
                  <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              )}

              {/* Join Button */}
              <button
                onClick={validateAndJoin}
                disabled={isValidating}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 rounded-xl transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
              >
                {isValidating ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Joining Meeting...</span>
                  </>
                ) : (
                  <>
                    <Video size={24} />
                    <span>Join Meeting Now</span>
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-gray-500 font-medium text-sm">OR</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              {/* Quick Tips */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <Sparkles className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Quick Tip</h4>
                    <p className="text-sm text-blue-700">
                      You can join recent meetings from the list or paste a meeting link directly into the code field.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Recent Meetings */}
          <div className="space-y-6">
            <div className="animate-slideInRight">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Meetings</h2>
              <p className="text-gray-600">Quick access to your previous interviews</p>
            </div>

            <div className="space-y-4 animate-slideInRight animation-delay-200">
              {recentMeetings.map((meeting, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-green-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      {meeting.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} />
                      <span>{meeting.time}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <code className="flex-1 bg-gray-100 px-4 py-3 rounded-xl font-mono text-lg font-bold text-gray-800 border border-gray-200">
                      {meeting.code}
                    </code>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(meeting.code);
                      }}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                    >
                      {copied ? (
                        <Check className="text-green-600" size={20} />
                      ) : (
                        <Copy className="text-gray-600" size={20} />
                      )}
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleQuickJoin(meeting)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <Video size={18} />
                      <span>Quick Join</span>
                    </button>
                    <button className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all">
                      <Calendar size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Help Card */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 shadow-2xl text-white animate-slideInRight animation-delay-400">
              <h3 className="text-xl font-bold mb-2">Need Help?</h3>
              <p className="text-purple-100 mb-4">
                Having trouble joining? Check your meeting invitation email or contact the meeting organizer for the correct code.
              </p>
              <button className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-xl hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                View Help Center
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out; }
        .animate-shake { animation: shake 0.4s ease-in-out; }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default JoinMeeting;