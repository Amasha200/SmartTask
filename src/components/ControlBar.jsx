export default function ControlBar({
  micOn,
  camOn,
  setMicOn,
  setCamOn,
  onChatToggle,
}) {
  return (
    <div className="controls">
      <button onClick={() => setMicOn(!micOn)}>
        {micOn ? "🎤 Mic On" : "🔇 Mic Off"}
      </button>

      <button onClick={() => setCamOn(!camOn)}>
        {camOn ? "📷 Cam On" : "🚫 Cam Off"}
      </button>

      <button onClick={onChatToggle}>💬 Chat</button>

      <button className="leave-btn">🚪 Leave</button>
    </div>
  );
}
