import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Room from "./Room";

const socket = io.connect("http://localhost:8081");

function App() {

  const [usernameInput, setUsernameInput] = useState("");
  const [roomInput, setRoomInput] = useState("");

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  function handleUserInput(e) {
    setUsernameInput(e.target.value);
  }

  function handleRoomInput(e) {
    setRoomInput(e.target.value);

  }

  function handleJoin() {
    setUsername(() => usernameInput)
    setRoom(() => roomInput)
    socket.emit('join_room', [usernameInput, roomInput])
  }

  return (
    <div className="App">
      <div className="input-fields">
        <input placeholder="Enter username...." onChange={handleUserInput} value={usernameInput} />
        <input placeholder="Enter room name...." onChange={handleRoomInput} value={roomInput} />
        <button type="submit" onClick={handleJoin}>Join room</button>
      </div> <Room socket={socket} setRoom={setRoom} roomName={room} username={username} />
    </div>
  );
}

export default App;
