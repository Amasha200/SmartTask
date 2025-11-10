
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Video,
  Calendar,
  History,
  Settings,
  LogOut,
  User,
  Menu,
  X,
  Bell,
  ChevronDown,
  HelpCircle
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://static.vecteezy.com/system/resources/previews/001/993/889/non_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg",
    role: "Interviewer"
  };

  // Navigation items
  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      hoverBg: "hover:bg-blue-100"
    },
    {
      name: "Create Meeting",
      path: "/create",
      icon: Video,
      color: "text-green-600",
      bgColor: "bg-green-50",
      hoverBg: "hover:bg-green-100"
    },
    {
      name: "Join Meeting",
      path: "/join",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      hoverBg: "hover:bg-purple-100"
    },
    {
      name: "History",
      path: "/history",
      icon: History,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      hoverBg: "hover:bg-indigo-100"
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      hoverBg: "hover:bg-gray-100"
    }
  ];

  const handleLogout = () => {
    // Add logout logic here (clear tokens, etc.)
    console.log("Logging out...");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white shadow-2xl z-40 transition-transform duration-300 ease-in-out flex flex-col
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 w-72`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b-2 border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Video className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SmartInterview</h1>
              <p className="text-xs text-gray-500">Interview Platform</p>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-b-2 border-gray-100">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full border-2 border-white shadow-md"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-600 truncate">{user.email}</p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-all duration-200 group
                  ${isActive 
                    ? `${item.bgColor} ${item.color} shadow-md` 
                    : `text-gray-700 hover:bg-gray-50 ${item.hoverBg}`
                  }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all
                  ${isActive ? 'bg-white shadow-sm' : `${item.bgColor} group-hover:shadow-sm`}`}>
                  <Icon 
                    size={20} 
                    className={isActive ? item.color : 'text-gray-600'}
                  />
                </div>
                <span>{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t-2 border-gray-100 space-y-2">
          {/* Help Button */}
          <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-semibold transition-all group">
            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center group-hover:bg-yellow-100 transition-all">
              <HelpCircle size={20} className="text-yellow-600" />
            </div>
            <span>Help Center</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-semibold transition-all group"
          >
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-all">
              <LogOut size={20} className="text-red-600" />
            </div>
            <span>Logout</span>
          </button>
        </div>

        {/* Version Info */}
        <div className="p-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Version 1.0.0 • © 2025
          </p>
        </div>
      </aside>

      {/* Spacer for desktop */}
      <div className="hidden lg:block w-72" />
    </>
  );
};

export default Sidebar;