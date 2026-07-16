import { useState } from "react";

function Contact() {
  const [message, setMessage] = useState("");

  return (
    <div className="page">
      <h2>Contact Me</h2>

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