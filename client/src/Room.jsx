import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-regular-svg-icons'

function Room({ socket, setRoom, roomName, inRoom,setInRoom, username }) {
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
    setInRoom(false)
  }
  console.log(inRoom)
  return (
    <div className={inRoom ? "room-container" : "room-container hidden"}>
      <div className="chat-header">
        <FontAwesomeIcon className='icon' icon={faMessage} />
        <h1>{roomName}</h1>
        <button type="button" id='leave-button' onClick={leaveRoom}>Leave Room</button>
      </div>
      <div className="chat-body">
        {
          messages.map((message, index) => (<div className="message-container"><p className={'message-sender'}>{message.sender}</p> <p className={`message`} id={message.sender == username ? "user-message" : "sender-message"}>{message.data}</p></div>))
        }
      </div>
      <div className="chat-footer">
        <input type='text' id='text-field' onSubmit={() => sendMessage(messageInput, username)} placeholder={`Message people in ${roomName}`} onChange={(e) => setMessageInput(e.target.value)} value={messageInput} />
        <button type="button" id='send-button' onClick={() => sendMessage(messageInput, username)}>send</button>
      </div>
    </div>
  )
}

export default Room
