import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateMeeting from "./pages/dashboard/CreateMeeting";
import JoinMeeting from "./pages/dashboard/JoinMeeting";
import History from "./pages/dashboard/History";
import ProfilePage from "./pages/profile/ProfilePage";
import Settings from "./pages/profile/Settings";
import Help from "./pages/profile/Help";




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateMeeting />} />
        <Route path="/join" element={<JoinMeeting />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
};

export default App;
