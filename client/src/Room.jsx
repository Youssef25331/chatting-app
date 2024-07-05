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
      </div>
      <div className="chat-body">
        <hr />
      </div>
      <div className="chat-footer">
        {
          messages.map((message) => (<p>{message.sender}:{message.data}</p>))
        }
        <button type="button" className='leave-button' onClick={leaveRoom}>Leave Room</button>
        <input type='text' placeholder={`Message people in ${roomName}`} onChange={(e) => setMessageInput(e.target.value)} value={messageInput} />

        <button type="button" className='send-button' onClick={() => sendMessage(messageInput, username)}>send</button>
      </div>
    </div>

  )
}

export default Room
