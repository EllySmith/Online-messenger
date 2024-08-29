import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { deleteChannel, changeChannelName, fetchChannels } from './chatSlice';
import '../App.css'
import { useNavigate } from 'react-router-dom';

const Message = ({messageId, username, body}) => {
  return (
    <div className='message-container' key={messageId}>
      <p><b>{username}:</b>   {body}</p>
    </div>
  )
}

const ChannelButton = ({ id, name, onClick }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');


  const handleButtonClick = () => {
    setShowModal(!showModal);
  };

  const handleDelete = async (id) => {
    try {
      console.log('Delete channel:', id);
      dispatch(deleteChannel(id));
      dispatch(fetchChannels());
      console.log('Channel list updated after deletion');
    } catch (error) {
      console.error('Failed to update channels after deletion:', error);
    } finally {
      setShowModal(false);
    }
  };

  const handleNameChange = async (id, newName) => {
    try {
      console.log('changed chanel', id);
      dispatch(changeChannelName(id));
      dispatch(fetchChannels());
      console.log('Channel list updated after deletion');
    } catch (error) {
      console.error('Failed to update channels after deletion:', error);
    } finally {
      setShowModal(false);
    }
  }



  return (
    <div className="channel-button-container">
      <button className="channel-button" onClick={() => onClick(id)}>
        {name}
      </button>
      <div className={`channel-modal ${showModal ? 'show' : ''}`}>
        <button onClick={() => setNewName('hello')}> Set name</button>
        <button onClick={() => handleDelete(id)}>Delete</button>
         <button onClick={() => handleNameChange(id, newName)}>Change Name</button>
      </div>
      <button className="channel-options-button" onClick={handleButtonClick}>
        &#8226;&#8226;&#8226;
      </button>
    </div>
  );
};



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
