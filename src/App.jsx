import { useState, useEffect } from "react";
import Login from "./components/Login";
import Room from "./components/Room";
const socket = new WebSocket("wss://websockets-chat-test-gls.herokuapp.com");
socket.addEventListener("open", () => {
  console.log("connected");
});
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  socket.addEventListener("message", (e) => {
    let data = JSON.parse(e.data);
    console.log(data?.error);
    console.log(data);
    if (data.error) {
      setError(data.error);
      return;
    }
    setError("");
    setMessages(data);
    setIsLoggedIn(true);
  });
  useEffect(() => {
    if (isLoggedIn) {
      socket.send(JSON.stringify({ username, roomId }));
    }
  }, [message]);
  return (
    <div className="App">
      <h1>
        A messaging app by Gene Lorenz Sarmiento created in the MFRPW Stack
      </h1>
      {isLoggedIn && !error ? (
        <Room
          username={username}
          roomId={roomId}
          socket={socket}
          messages={messages}
          message={message}
          setMessage={setMessage}
        />
      ) : (
        <Login
          username={username}
          roomId={roomId}
          setIsLoggedIn={setIsLoggedIn}
          setUsername={setUsername}
          setRoomId={setRoomId}
          error={error}
          setError={setError}
          socket={socket}
        />
      )}
    </div>
  );
}

export default App;
