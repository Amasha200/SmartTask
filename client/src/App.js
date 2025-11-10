import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import CreateMeeting from "./pages/dashboard/CreateMeeting";
import JoinMeeting from "./pages/dashboard/JoinMeeting";
import History from "./pages/dashboard/History";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateMeeting />} />
        <Route path="/join" element={<JoinMeeting />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
};

export default App;
