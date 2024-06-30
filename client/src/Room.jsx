import React, { useState } from 'react'

function Room({ socket, roomName }) {
  const [messageInput, setMessageInput] = useState("");

  const [messages, setMessages] = useState([{date:'1',sender:'alex',content:'hi'}])

  function leaveRoom() {
    socket.emit('leave_room', roomName)
  }

  function sendMessage() {

  }

  return (
    <div>
      <div className="chat-header">
        <h1>{roomName}</h1>
      </div>
      <div className="chat-body">
        <hr />
      </div>
      <div className="chat-footer">
        {
        messages.map((message) => (<p>{message.sender}:{message.content}</p>))
      }
        <button type="button" className='leave-button' onClick={leaveRoom}>Leave Room</button>
        <input type='text' onChange={(e) => setMessageInput(e.target.value)} value={messageInput} />
        <button onClick={sendMessage} type="">Send</button>
      </div>
    </div>

  )
}

export default Room
