import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels, fetchMessages, resetChatState, initializeSocket, sendMessage } from './chatSlice';
import { ChannelButton, Message, Header } from './ChatElements';
import '../App.css';

function ChatPage() {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.chat.channels);
  const messages = useSelector(state => state.chat.messages);
  const [messageInput, setMessageInput] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [username, setUsername] = useState('');
  const [channelId, setChannelId] = useState('1');
  const messageInputRef = useRef(null);
  const messageListRef = useRef(null);

  useEffect(() => {
    dispatch(initializeSocket());
    const loggedInUser = localStorage.getItem('username');
    if (loggedInUser) {
      setUsername(loggedInUser);
    }
    dispatch(fetchChannels());
    dispatch(fetchMessages());
    return () => {
      dispatch(resetChatState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, [messageInput]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleChannelClick = (channelId) => {
    setChannelId(channelId);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { 
      e.preventDefault(); 
      handleSendMessage(); 
    }
  };

  const randomKey = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const handleSendMessage = async () => {
    if (messageInput.trim() && !sendingMessage) {
      setSendingMessage(true);
      try {
        const newId = randomKey();
        await dispatch(sendMessage({ body: messageInput, messageId: newId, channelId: channelId, username: username })).unwrap(); 
        setMessageInput('');
      } catch (error) {
        console.error('Failed to send message:', error);
      } finally {
        setSendingMessage(false);       
      }
    }
  };

  const filteredMessages = messages.filter(message => message.channelId === channelId);

  return (
    <div className='main-layout'>
      <Header />
      <div className="channel-list">
        <h2>Channels List</h2>
        <ul>
          {channels.map(channel => 
            <ChannelButton key={channel.id} onClick={() => handleChannelClick(channel.id)} {...channel} />
              )}
        </ul>
      </div>
      <div className="message-container" ref={messageListRef}>
        <h2>Messages</h2>
        <ul>
          {filteredMessages.map(message => (
            <Message key={message.messageId} {...message} />
          ))}
        </ul>
      </div>
      <div className="message-input">
        <textarea 
          placeholder="Type your message..." 
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={sendingMessage}
          ref={messageInputRef}
        />
        <button onClick={handleSendMessage} disabled={sendingMessage}>
          {sendingMessage ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
