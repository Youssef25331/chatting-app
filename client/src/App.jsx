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
      setIsConnected(true)
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

  function handleJoin(event) {
    event.preventDefault()
    if (usernameInput && roomInput) {
      if (usernameInput.length >= 4) {
        setUsername(() => usernameInput)
        setRoom(() => roomInput.toUpperCase().trimEnd())
        setInRoom(() => true)
        socket.emit('join_room', [usernameInput, roomInput.toUpperCase().trimEnd()])
      } else (
        alert('make sure the username is atleast 4 letters long')
      )
    } else {
      alert("Please make sure to type a valid usename and room")
    }
  }
  return (
    <div className="App">
      {

        isConnected ? (
          <>
            <form className={inRoom ? "hidden" : "input-fields"} onSubmit={((e) => handleJoin(e))}>
              <input placeholder="Enter username...." onChange={handleUserInput} value={usernameInput} />
              <input placeholder="Enter room name...." onChange={handleRoomInput} value={roomInput} />
              <button type="submit">Join room</button>
            </form>
            <Room socket={socket} setRoom={setRoom} inRoom={inRoom} setInRoom={setInRoom} roomName={room} username={username} />
          </>
        ) : connectionTimeout ? <h1 className="connection-message">Connection timeout make sure you can connect to the server.</h1> : <h1 className="connection-message">Attempting to connect to the server...</h1>

      }
    </div>
  );
}

export default App;
