import React, { useState } from "react";
import MessageBubble from "../components/MessageBubble";

export default function ChatPanel() {
  const [messages, setMessages] = useState([
    { id: 1, from: "You", text: "Hello!" },
    { id: 2, from: "Interviewer", text: "Hi, welcome!" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;
    setMessages([...messages, { id: Date.now(), from: "You", text: input }]);
    setInput("");
  };

  return (
    <div className="chat-panel">
      <div className="messages">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} from={msg.from} text={msg.text} />
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
