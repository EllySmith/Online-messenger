import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChannelList from '../components/ChannelList';
import Input from '../components/ChatInput';
import Header from '../components/Header';
import { sendMessage } from '../store/messagesSlice';
import { randomKey } from '../utils/different';
import '../App.css';
import { fetchChannels, changeCurrentChannel } from '../store/channelsSlice';
import { fetchMessages } from '../store/messagesSlice';
import MessageBox from '../components/MessageBox';
import ChannelListHeader from '../components/ChannelListHeader';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import "react-toastify/dist/ReactToastify.minimal.css";

leoProfanity.loadDictionary('en');
leoProfanity.loadDictionary('ru');
leoProfanity.add('boobs');


function ChatPage() {
  const { t } = useTranslation(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messages = useSelector(state => state.messages.messages);
  const channels = useSelector(state => state.channels.channels)
  const [messageInput, setMessageInput] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const messageInputRef = useRef(null);
  const messageListRef = useRef(null);
  const notify = () => toast(`${t('notify.noconnection')}`);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      navigate('/login'); 
    }
  }, [navigate]);
  
  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch, messages]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

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
        await dispatch(sendMessage({ body: messageInput, messageId: newId, channelId: currentChannelId, username: username })).unwrap(); 
        setMessageInput('');
      } catch (error) {
        console.error('Failed to send message:', error);
        notify();
      } finally {
        setSendingMessage(false);       
      }
    }
  };
  const currentChannelId = useSelector(state => state.channels.currentChannelId);
  const filteredMessages = messages.filter(message => message.channelId === currentChannelId);
  const channelName = useSelector((state) => {
    const channel = state.channels.channels.find(c => c.id === currentChannelId);
    return channel ? channel.name : 'unknown';
  });
  useEffect(() => {    
    messageInputRef.current.focus();
}, [filteredMessages, channels]);

  return (
      <div className='h-100'>
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
              <Header username={username} className="mb-4" />
  
            <div className="container h-100 my-4 overflow-hidden rounded shadow" id="chat-container">
              <div className="row h-100 bg-white flex-md-row">
                <div className="col-4 col-md-2 border-end px-0 bg-light flex-column d-flex">
                  <ChannelListHeader currentChannelId={currentChannelId} setCurrentChannel={changeCurrentChannel} />     
                  <ChannelList currentChannelId={currentChannelId} onClick={(id) => dispatch(changeCurrentChannel(id))} />
                  </div>
  
                <div className="col p-0 d-flex flex-column h-100">
                  <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0"><b>#{channelName}</b></p>
                    <span className="text-muted">{filteredMessages.length} {t('chat.messages')}</span>
                  </div>
  
                  <MessageBox filteredMessages={filteredMessages} messageListRef={messageListRef} channelName={channelName}/>
  
                  <div className="mt-auto px-5 py-3">
                    <div className="input-group has-validation">
                      <Input
                        value={messageInput}
                        onChange={(e) => setMessageInput(leoProfanity.clean(e.target.value))}
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
        <ToastContainer/>
      </div>
  );
}

export default ChatPage;





