import "./App.css";
import io from "socket.io-client";
import { useState } from "react";

const socket = io.connect("http://localhost:8081");


function App() {
  const [userName, setUsername] = useState()
  
  return <div className="App">
  </div>;
}

export default App;
