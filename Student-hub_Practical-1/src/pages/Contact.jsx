import { useState } from "react";

function Contact() {
  const [message, setMessage] = useState("");
  const [showTip, setShowTip] = useState(false);

  return (
    <div className="page">
      <h2>Contact Me</h2>

      <button onClick={() => setShowTip(!showTip)}>
        {showTip ? "Hide Help" : "Show Help"}
      </button>

      {showTip && (
        <p style={{ backgroundColor: "#fffbe6", padding: "8px", border: "1px solid #f0c040" }}>
          Tip: Type your message below and it will appear in real time.
        </p>
      )}

      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <p>Message: {message}</p>

      <p>Character Count: {message.length}</p>
    </div>
  );
}

export default Contact;