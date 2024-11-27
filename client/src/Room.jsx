import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-regular-svg-icons'

function Room({ socket, setRoom, roomName, inRoom, setInRoom, username }) {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([])

  const containerRef = useRef(null)

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
    });
  };

  function sendMessage(event, data, sender) {
    event.preventDefault();

    if (data&&data.trimEnd()!='') {
      const newMessage = { data: data.trimEnd(), sender: sender }
      setMessages(m => [...m, newMessage])
      socket.emit('send_message', newMessage)
      setMessageInput("")
    }
  }
  useEffect(() => {

    socket.off('receive_message').on('receive_message', message => {
      setMessages(m => [...m, message])
    })
  }, [socket])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  function leaveRoom() {
    socket.emit('leave_room', roomName)
    setRoom('')
    setInRoom(false)
  }

  return (
    <div className={inRoom ? "room-container" : "room-container hidden"} ref={containerRef}>
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
      <div >
        <form className="chat-footer" onSubmit={(e) => sendMessage(e, messageInput, username)}>
          <input type='text' autoComplete={'off'} id='text-field' placeholder={`Message people in ${roomName}`} onChange={(e) => setMessageInput(e.target.value)} value={messageInput} />
          <button type="submit" id='send-button'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Room
