import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinMeeting = () => {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (roomCode.trim()) navigate(`/room/${roomCode}`);
  };

  return (
    <div>
      <h2>Join Meeting</h2>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
};

export default JoinMeeting;
