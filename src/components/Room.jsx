import { nanoid } from "nanoid";

export default function Room({
  username,
  roomId,
  socket,
  messages,
  message,
  setMessage,
}) {
  function sendMessage(e) {
    e.preventDefault();
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
      </div>
      <div className="messages">
        {messages.map((message) => (
          <>
            <p className="message-username">
              {message.username !== username && message.username}
            </p>
            <p
              key={nanoid()}
              className={`message ${
                message.username === username && "message-own"
              }`}
            >
              {message.message}
            </p>
          </>
        ))}
      </div>
      <form onSubmit={sendMessage} className="message-form">
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
