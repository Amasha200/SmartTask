import React, { useState } from "react";
import { Link} from "react-router-dom";
import { ArrowLeft, Plus, Copy, Check, Calendar, Clock, Users, Mail, Video, Share2, Link as LinkIcon, Download, Sparkles, Settings } from "lucide-react";

const CreateMeeting = () => {
  const [step, setStep] = useState(1);
  const [roomId, setRoomId] = useState("");
  const [copied, setCopied] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState({
    title: "",
    date: "",
    time: "",
    duration: "30",
    participants: "",
    description: ""
  });

  const generateRoomId = () => {
    const id = Math.random().toString(36).substring(2, 9).toUpperCase();
    const formatted = `${id.slice(0, 3)}-${id.slice(3, 6)}-${id.slice(6, 9)}`;
    setRoomId(formatted);
  };

  const handleCreate = () => {
    if (!meetingDetails.title || !meetingDetails.date || !meetingDetails.time) {
      alert("Please fill in all required fields");
      return;
    }
    generateRoomId();
    setStep(2);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = `${window.location.origin}/room/${roomId}`;

  const handleInputChange = (field, value) => {
    setMeetingDetails(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

       {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 py-6 relative z-10">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-x-1 inline-flex"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </Link>
      </div>
      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 pb-12 relative z-10">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8 animate-fadeIn">
          <div className="flex items-center gap-4">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold transition-all ${
              step === 1 ? 'bg-blue-600 text-white shadow-lg scale-110' : 'bg-white text-gray-400 shadow-md'
            }`}>
              1
            </div>
            <div className={`w-24 h-1 transition-all ${step === 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
            <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold transition-all ${
              step === 2 ? 'bg-blue-600 text-white shadow-lg scale-110' : 'bg-white text-gray-400 shadow-md'
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Step 1: Meeting Details */}
        {step === 1 && (
          <div className="animate-slideInLeft">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-100">
              
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Plus className="text-white" size={32} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Create New Meeting</h1>
                  <p className="text-gray-600">Schedule your interview session</p>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-6">
                
                {/* Meeting Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Meeting Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Frontend Developer Interview"
                    value={meetingDetails.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="date"
                        value={meetingDetails.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Time <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="time"
                        value={meetingDetails.time}
                        onChange={(e) => handleInputChange('time', e.target.value)}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <select
                    value={meetingDetails.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg bg-white"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>

                {/* Participants */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Participant Emails (comma-separated)
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-4 text-gray-400" size={20} />
                    <textarea
                      placeholder="john@example.com, jane@example.com"
                      value={meetingDetails.participants}
                      onChange={(e) => handleInputChange('participants', e.target.value)}
                      rows="3"
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    placeholder="Add meeting agenda, topics to discuss, or any special instructions..."
                    value={meetingDetails.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows="4"
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleCreate}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-5 rounded-xl transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg"
                  >
                    <Video size={24} />
                    <span>Create Meeting</span>
                  </button>
                  
                  <button
                    className="px-6 py-5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
                  >
                    <Settings size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Meeting Created */}
        {step === 2 && (
          <div className="animate-slideInRight">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-100">
              
              {/* Success Header */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl animate-bounce">
                  <Check className="text-white" size={40} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Meeting Created Successfully! </h2>
                <p className="text-gray-600 text-lg">Your interview room is ready</p>
              </div>

              {/* Meeting Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border border-blue-200">
                <h3 className="font-bold text-gray-900 text-xl mb-4">Meeting Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Video className="text-blue-600" size={20} />
                    <span className="font-semibold text-gray-900">{meetingDetails.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-blue-600" size={20} />
                    <span className="text-gray-700">{meetingDetails.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="text-blue-600" size={20} />
                    <span className="text-gray-700">{meetingDetails.time} ({meetingDetails.duration} min)</span>
                  </div>
                  {meetingDetails.participants && (
                    <div className="flex items-center gap-3">
                      <Users className="text-blue-600" size={20} />
                      <span className="text-gray-700">{meetingDetails.participants.split(',').length} participants</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Room ID */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Meeting Code
                </label>
                <div className="flex items-center gap-3">
                  <code className="flex-1 bg-gray-100 px-6 py-5 rounded-xl font-mono text-2xl font-bold text-gray-800 border-2 border-gray-300 text-center">
                    {roomId}
                  </code>
                  <button
                    onClick={() => copyToClipboard(roomId)}
                    className="p-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg hover:shadow-xl"
                  >
                    {copied ? <Check size={24} /> : <Copy size={24} />}
                  </button>
                </div>
              </div>

              {/* Share Link */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Meeting Link
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 px-6 py-4 bg-gray-100 border-2 border-gray-300 rounded-xl font-medium text-gray-800"
                  />
                  <button
                    onClick={() => copyToClipboard(shareLink)}
                    className="p-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all"
                  >
                    <LinkIcon size={24} />
                  </button>
                </div>
              </div>

              {/* Share Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button className="flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg">
                  <Mail size={20} />
                  <span>Email Invite</span>
                </button>
                
                <button className="flex items-center justify-center gap-3 px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg">
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
                
                <button className="flex items-center justify-center gap-3 px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg">
                  <Download size={20} />
                  <span>Download</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => window.location.href = `/room/${roomId}`}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-5 rounded-xl transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <Video size={24} />
                  <span>Join Meeting Now</span>
                </button>
                
                <button
                  onClick={() => {
                    setStep(1);
                    setRoomId("");
                    setMeetingDetails({
                      title: "",
                      date: "",
                      time: "",
                      duration: "30",
                      participants: "",
                      description: ""
                    });
                  }}
                  className="px-6 py-5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all flex items-center gap-2"
                >
                  <Plus size={24} />
                  <span>Create Another</span>
                </button>
              </div>

              {/* Quick Tip */}
              <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <Sparkles className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Quick Tip</h4>
                    <p className="text-sm text-blue-700">
                      Share the meeting code or link with participants. They can join 5 minutes before the scheduled time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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

        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
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

export default CreateMeeting;