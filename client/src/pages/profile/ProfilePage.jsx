import React, { useState } from "react";
import {
  User,
  Mail,
  Briefcase,
  Phone,
  Edit3,
  Save,
  Camera,
} from "lucide-react";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Sandarekha Gunasiri",
    email: "sandarekha@example.com",
    role: "Frontend Developer",
    phone: "+94 77 123 4567",
    bio: "Passionate about building modern web applications using React and Node.js. I love UI design and clean user experiences.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile updated:", profile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
        {/* Header Section */}
        <div className="relative bg-blue-600 h-40">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="relative">
              <img
                src="https://avatars.githubusercontent.com/u/9919?v=4"
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 transition-colors">
                <Camera size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="pt-20 pb-8 px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
          <p className="text-gray-500">{profile.role}</p>

          <div className="flex justify-center mt-4">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <Save size={18} />
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Edit3 size={18} />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* Email */}
            <div className="flex items-center gap-3 border p-4 rounded-xl shadow-sm bg-gray-50">
              <Mail className="text-blue-500" />
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full border-none outline-none bg-transparent text-gray-700"
                />
              ) : (
                <span className="text-gray-700">{profile.email}</span>
              )}
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 border p-4 rounded-xl shadow-sm bg-gray-50">
              <Phone className="text-blue-500" />
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full border-none outline-none bg-transparent text-gray-700"
                />
              ) : (
                <span className="text-gray-700">{profile.phone}</span>
              )}
            </div>

            {/* Role */}
            <div className="flex items-center gap-3 border p-4 rounded-xl shadow-sm bg-gray-50">
              <Briefcase className="text-blue-500" />
              {isEditing ? (
                <input
                  type="text"
                  name="role"
                  value={profile.role}
                  onChange={handleChange}
                  className="w-full border-none outline-none bg-transparent text-gray-700"
                />
              ) : (
                <span className="text-gray-700">{profile.role}</span>
              )}
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Bio</h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 text-gray-700"
                rows="4"
              ></textarea>
            ) : (
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg shadow-sm">
                {profile.bio}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
