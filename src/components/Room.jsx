import { useState, useEffect } from "react";

export default function Room({ username, roomId, socket }) {
  const [message, setMessage] = useState("");
  const [hadMessage, setHadMessage] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.addEventListener("message", (e) => {
      setMessages(JSON.parse(e.data));
      console.log(messages);
    });
  }, [hadMessage]);
  function sendMessage(e) {
    e.preventDefault();
    setHadMessage(true);
    try {
      socket.send(JSON.stringify({ username, roomId, message }));
    } catch (err) {
      console.error(err);
    }
    e.target.reset();
  }
  return (
    <>
      <div className="info">
        <h2>Room ID: {roomId}</h2>
        <h2>Your username is {username}</h2>
      </div>{" "}
      {messages.map((message) => (
        <p>
          {message.username}: {message.message}
        </p>
      ))}
      <form onSubmit={sendMessage} class="message">
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          className="input-message"
        />
        <button className="send-message">Send</button>
      </form>
    </>
  );
}
