import React, { useState } from "react";
import VideoTile from "../components/VideoTile";

export default function ParticipantsView() {
  const [screenSharing, setScreenSharing] = useState(false);

  // dummy list
  const participants = [
    { id: 1, name: "You" },
    { id: 2, name: "Interviewer" },
    { id: 3, name: "Panel Member" },
  ];

  return (
    <div className="participant-container">
      <button
        className="screen-btn"
        onClick={() => setScreenSharing(!screenSharing)}
      >
        {screenSharing ? "🛑 Stop Sharing" : "🖥️ Share Screen"}
      </button>

      <div className="grid">
        {participants.map((p) => (
          <VideoTile key={p.id} label={p.name} camOn={true} />
        ))}
      </div>
    </div>
  );
}
