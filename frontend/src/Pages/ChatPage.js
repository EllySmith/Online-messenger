import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels, fetchMessages, resetChatState } from './chatSlice'
import './chatPage.css'

function ChatPage() {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.chat.channels);
  const messages = useSelector(state => state.chat.messages);
  console.log('Channels', channels);
  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
    return () => {
      dispatch(resetChatState());
    };
  }, [dispatch]);

  return (
    <div className="chat-container">
      <div className="channel-list">
        <h2>Channels List</h2>
        <ul>
          {channels.map(channel => (
            <li key={channel.id}>{channel.name}</li>
          ))}
        </ul>
      </div>
      <div className="message-container">
        <div className="message-list">
          <h2>Messages</h2>
          <ul>
            {messages.map(message => (
              <li key={message.id}>{message.body}</li>
            ))}
          </ul>
        </div>
        <div className="message-input">
          <textarea placeholder="Type your message..." />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage
