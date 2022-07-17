import { useState } from "react";
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

  return (
    <div className="App">
      <h1>
        A permanent messaging app (All the messages in each room will be
        permanent, you can't delete them, except if I delete them 😈)
      </h1>
      {isLoggedIn ? (
        <Room username={username} roomId={roomId} socket={socket} />
      ) : (
        <Login
          username={username}
          roomId={roomId}
          setIsLoggedIn={setIsLoggedIn}
          setUsername={setUsername}
          setRoomId={setRoomId}
          socket={socket}
        />
      )}
    </div>
  );
}

export default App;
