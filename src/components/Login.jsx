import { useState } from "react";
let err = "";
export default function Login({
  username,
  roomId,
  setIsLoggedIn,
  setRoomId,
  setUsername,
  error,
  setError,
  socket,
}) {
  const [password, setPassword] = useState("");
  const [entryChoice, setEntryChoice] = useState("");

  function sendMessage(e) {
    e.preventDefault();
    if (socket.readyState === 1) {
      socket.send(JSON.stringify({ entryChoice, username, password, roomId }));
      return;
    }
    console.error("Sorry the socket is not connected");
  }
  return (
    <form onSubmit={sendMessage}>
      <h2>Register or Login</h2>
      <select onChange={(e) => setEntryChoice(e.target.value)}>
        <option value="">----------Select--------</option>
        <option value="Register">Register</option>
        <option value="Login">Login</option>
      </select>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        id="username"
        autoComplete="off"
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        autoComplete="off"
      />
      <label htmlFor="room">Room Number:</label>
      <input
        type="text"
        onChange={(e) => setRoomId(e.target.value)}
        id="room"
        autoComplete="off"
      />
      <button
        disabled={entryChoice ? false : true}
        className={`${entryChoice ? "" : "button-disabled"}`}
      >
        {entryChoice ? entryChoice : "Please select register or login"}
      </button>
      <p className="error">{error}</p>
    </form>
  );
}
