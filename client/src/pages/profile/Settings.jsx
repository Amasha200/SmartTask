import React, { useState } from "react";
import { Bell, Moon, Sun, User, Shield, Save } from "lucide-react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState("Public");

  const handleSave = () => {
    console.log({
      darkMode,
      notifications,
      privacy,
    });
    alert("Settings saved successfully!");
  };

  return (
    <div
      className={`min-h-screen p-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Shield className="text-blue-600" /> Settings
        </h1>

        {/* Theme Section */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Moon className="text-blue-500" /> Appearance
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Bell className="text-blue-500" /> Notifications
          </h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <span>Enable meeting reminders and updates</span>
          </label>
        </div>

        {/* Privacy Section */}
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <User className="text-blue-500" /> Privacy
          </h2>
          <select
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="Public">Public Profile</option>
            <option value="Private">Private Profile</option>
            <option value="FriendsOnly">Visible to Interviewers Only</option>
          </select>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
        >
          <Save size={18} /> Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
