export default function MessageBubble({ from, text }) {
  return (
    <div className={`bubble ${from === "You" ? "me" : "them"}`}>
      <strong>{from}:</strong> {text}
    </div>
  );
}
