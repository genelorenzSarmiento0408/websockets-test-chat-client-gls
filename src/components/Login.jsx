export default function Login({
  username,
  roomId,
  setIsLoggedIn,
  setRoomId,
  setUsername,
  socket,
}) {
  function sendMessage(e) {
    e.preventDefault();
    try {
      socket.send(JSON.stringify({ username, roomId }));
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <form onSubmit={sendMessage}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        id="username"
        autoComplete="off"
      />
      <label htmlFor="room">Room Number:</label>
      <input
        type="text"
        onChange={(e) => setRoomId(e.target.value)}
        id="room"
        autoComplete="off"
      />
      <button>Login</button>
    </form>
  );
}
