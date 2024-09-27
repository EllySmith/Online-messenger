import './App.css';
import io from 'socket.io-client';
import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {deleteChannel, changeChannelName } from './store/channelsSlice';
import { addMessage,  } from './store/messagesSlice';
import ErrorPage from './pages/ErrorPage'
import LoginPage from './pages/LoginPage'
import ChatPage from './pages/ChatPage';
import RegistrationPage from './pages/RegistrationPage';
import { Provider, ErrorBoundary } from '@rollbar/react'; 
import './i18n';

let socket;


const rollbarConfig = {
  accessToken: '9fdca46296a84ba8bda423b6d99d79e5',
  environment: 'testenv',
};

  
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!socket) {
      socket = io('http://localhost:3001');
    }

    const setupSocketListeners = () => {
      socket.on('newMessage', (message) => {
        dispatch(addMessage(message));
      });

      socket.on('channelDeleted', (channelId) => {
        dispatch(deleteChannel(channelId));
      });

      socket.on('channelUpdated', (updatedChannel) => {
        dispatch(changeChannelName(updatedChannel));
      });
    };

    setupSocketListeners();

    return () => {
      socket.off('newMessage');
      socket.off('channelDeleted');
      socket.off('channelUpdated');
    };
  }, [dispatch]);
    
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/success" element={<ChatPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      </BrowserRouter>
      </ErrorBoundary>
      </Provider>
    );
}

export default App;
