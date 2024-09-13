import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChannelList from '../components/ChannelList';
import Input from '../components/ChatInput';
import Header from '../components/Header';
import { sendMessage } from '../store/messagesSlice';
import { randomKey } from '../utils/different';
import '../App.css';
import { fetchChannels } from '../store/channelsSlice';
import MessageBox from '../components/MessageBox';
import ChannelListHeader from '../components/ChannelListHeader';

function ChatPage() {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.channels.channels);
  const messages = useSelector(state => state.messages.messages);
  const [messageInput, setMessageInput] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [channelId, setChannelId] = useState('1');
  const messageInputRef = useRef(null);
  const messageListRef = useRef(null);
  
  useEffect(() => {
    dispatch(fetchChannels())
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
  }, [messages, channelId]);

  const handleChannelClick = (channelId) => {
    setChannelId(channelId);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { 
      e.preventDefault(); 
      handleSendMessage(); 
    }
  };

  const handleSendMessage = async () => {
    setUsername(localStorage.getItem('username'))
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
  const channelName = channels.find(channel => channel.id === channelId)?.name || 'Unknown Channel';

  return (
      <div className='h-100'>
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
              <Header username={username} className="mb-4" />
  
            <div className="container h-100 my-4 overflow-hidden rounded shadow" id="chat-container">
              <div className="row h-100 bg-white flex-md-row">
                <div className="col-4 col-md-2 border-end px-0 bg-light flex-column d-flex">
                  <ChannelListHeader />     
                  <ChannelList onClick={handleChannelClick}/>
                </div>
  
                <div className="col p-0 d-flex flex-column h-100">
                  <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0"><b>#{channelName}</b></p>
                    <span className="text-muted">0 сообщений</span>
                  </div>
  
                  <MessageBox filteredMessages={filteredMessages} messageListRef={messageListRef}/>
  
                  <div className="mt-auto px-5 py-3">
                    <div className="input-group has-validation">
                      <Input
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={sendingMessage}
                        ref={messageInputRef}
                        className="form-control"
                        onClick={handleSendMessage}
                      />
                      
                    </div>
                  </div>
  
                </div>
              </div>
            </div>
  
            <div className="Toastify"></div>
          </div>
        </div>
      </div>
  );
}

export default ChatPage;





