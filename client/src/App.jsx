import io from "socket.io-client";
import { useEffect, useState } from "react";
import Room from "./Room";
import "./App.css";

const socket = io.connect("http://localhost:8081");

function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [connectionTimeout, setConnectionTimeout] = useState(false)

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    })
    socket.on('connect_error', () => {
      setConnectionTimeout(true)
    })
  }, [])
  const [usernameInput, setUsernameInput] = useState("");
  const [roomInput, setRoomInput] = useState("");

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [inRoom, setInRoom] = useState(false)

  function handleUserInput(e) {
    setUsernameInput(e.target.value);
  }

  function handleRoomInput(e) {
    setRoomInput(e.target.value);

  }

  function handleJoin() {
    setUsername(() => usernameInput)
    setRoom(() => roomInput)
    setInRoom(() => true)
    socket.emit('join_room', [usernameInput, roomInput])
  }
  return (
    <div className="App">
      {

        isConnected ? (
          <>
            <div className={inRoom ? "input-fields hidden" : "input-fields"}>
              <input placeholder="Enter username...." onChange={handleUserInput} value={usernameInput} />
              <input placeholder="Enter room name...." onChange={handleRoomInput} value={roomInput} />
              <button type="submit" onClick={handleJoin}>Join room</button>
            </div> <Room socket={socket} setRoom={setRoom} inRoom={inRoom} setInRoom={setInRoom} roomName={room} username={username} />
          </>
        ) : connectionTimeout ? <h1 className="connection-message">Connection timeout make sure you can connect to the server.</h1> : <h1 className="connection-message">Attempting to connect to the server...</h1>

      }
    </div>
  );
}

export default App;
