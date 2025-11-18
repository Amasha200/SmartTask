import React, { useState, useRef } from "react";
import "../styles/video.css";
import ControlBar from "../components/ControlBar";
import VideoTile from "../components/VideoTile";
import ChatPanel from "./ChatPanel";

export default function VideoRoom() {
  const localRef = useRef(null);
  const remoteRef = useRef(null);

  // UI states only — no backend
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="room-container">
      <div className="video-area">
        <VideoTile ref={localRef} label="You" camOn={camOn} />
        <VideoTile ref={remoteRef} label="Interviewer" camOn={camOn} />
      </div>

      <ControlBar
        micOn={micOn}
        camOn={camOn}
        setMicOn={setMicOn}
        setCamOn={setCamOn}
        onChatToggle={() => setShowChat(!showChat)}
      />

      {showChat && <ChatPanel />}
    </div>
  );
}
