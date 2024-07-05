import React, { useEffect, useState } from 'react'

function Room({ socket, setRoom, roomName, username }) {
  const [messageInput, setMessageInput] = useState("");

  const [messages, setMessages] = useState([])


  function sendMessage(data, sender) {
    const newMessage = { data: data, sender: sender }
    setMessages(m => [...m, newMessage])
    socket.emit('send_message', newMessage)
    setMessageInput("")
  }
  useEffect(() => {

    socket.off('receive_message').on('receive_message', message => {
      setMessages(m => [...m, message])
    })
  }, [socket])

  function leaveRoom() {
    socket.emit('leave_room', roomName)
    setRoom('')
  }
  return (
    <div className='room-container'>
      <div className="chat-header">
        <h1>{roomName}</h1>
        <button type="button" id='leave-button' onClick={leaveRoom}>Leave Room</button>
      </div>
      <div className="chat-body">
        {
          messages.map((message) => (<p>{message.sender}:{message.data}</p>))
        }
      </div>
      <div className="chat-footer">
        <input type='text' id='text-field' placeholder={`Message people in ${roomName}`} onChange={(e) => setMessageInput(e.target.value)} value={messageInput} />
        <button type="button" id='send-button' onClick={() => sendMessage(messageInput, username)}>send</button>
      </div>
    </div>
  )
}

export default Room
