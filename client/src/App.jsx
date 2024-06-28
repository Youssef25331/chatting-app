import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:8081");

socket.on('hello', (args) => {
  console.log(args)
})
function App() {

  useEffect(() => console.log(socket), [socket])
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  function handleUserInput(e) {
    setUsername(e.target.value);
  }

  function handleRoomInput(e) {
    setRoom(e.target.value);

  }

  function handleJoin() {
    socket.emit('join_room', [username,room])
  }

  return (
    <div className="App">
      <div className="inputfields">
        <input onChange={handleUserInput} value={username} />
        <input onChange={handleRoomInput} value={room} />
        <button type="submit" onClick={handleJoin}>click to join</button>
      </div>
    </div>
  );
}

export default App;
