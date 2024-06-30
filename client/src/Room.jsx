import React from 'react'

function Room({ socket, roomName }) {

  function leaveRoom() {
    socket.emit('leave_room', roomName)
  }
  return (
    <div>
      <div className="chat-header">
        <h1>{roomName}</h1>
      </div>
      <div className="chat-body">
      </div>
      <div className="chat-footer">
        <button type="button" className='leave-button' onClick={leaveRoom}>Leave Room</button>
      </div>
    </div>

  )
}

export default Room
