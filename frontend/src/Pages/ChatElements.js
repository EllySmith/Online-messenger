import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom';

const Message = ({messageId, username, body}) => {
  return (
    <div className='message-container' key={messageId}>
      <p><b>{username}:</b>   {body}</p>
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



function Header({username}) {
  const navigate = useNavigate();
  return (
    <div className='header'>
      <h2 className='title'>Hexlet Chat</h2>
      {username.length > 0 && (
        <button className="logout-button" onClick={() => navigate('/')}>
          Выйти
        </button>
      )}
    </div>
  )
}


const Input = React.forwardRef(({ value, onChange, onKeyDown, disabled, onClick }, ref) => {
  return (
    <div className="message-input">
      <textarea 
        placeholder="Type your message..." 
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
        ref={ref}
      />
      <button onClick={onClick} disabled={disabled}>
        {disabled ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
});


export { Message, ChannelButton, Header, Input }
