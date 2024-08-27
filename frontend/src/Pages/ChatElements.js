import React from 'react'
import '../App.css'

const Message = ({messageId, username, body}) => {
  return (
    <div className='message-container' key={messageId}>
      <p className='message-username'>{username}:</p><p className='message-body'>    {body}</p>
    </div>
  )
}

function ChannelButton({ id, name, onClick }) {
  return (
    <li key={id} className='channel-title'>
      <button onClick={() => onClick(id)} className='channel-button'>
        #{name}
      </button>
    </li>
  );
}


function Header() {
  return (
    <div className='header' href='/'>
      Hexlet Chat
    </div>
  )
}



export { Message, ChannelButton, Header }
