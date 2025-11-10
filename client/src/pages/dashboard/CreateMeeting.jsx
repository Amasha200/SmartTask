import React, { useState } from "react";

const CreateMeeting = () => {
  const [roomId, setRoomId] = useState("");

  const handleCreate = () => {
    const id = Math.random().toString(36).substring(2, 9);
    setRoomId(id);
  };

  return (
    <div>
      <h2>Create Meeting</h2>
      <button onClick={handleCreate}>Generate Room ID</button>
      {roomId && (
        <p>
          Room ID: <b>{roomId}</b> <br />
          Share this link: <code>localhost:3000/room/{roomId}</code>
        </p>
      )}
    </div>
  );
};

export default CreateMeeting;
