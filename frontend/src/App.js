import './App.css';
import io from 'socket.io-client';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, ErrorBoundary } from '@rollbar/react';
import {
  deleteChannel,
  changeChannelName,
  addChannelAction,
} from './store/channelsSlice';
import { addMessage } from './store/messagesSlice';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import RegistrationPage from './pages/RegistrationPage';
import './i18n';

let socket;

const rollbarConfig = {
  accessToken: '9fdca46296a84ba8bda423b6d99d79e5',
  environment: 'testenv',
};

const App = () => {
  const dispatch = useDispatch();

  socket = io();

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
    socket.on('channelDeleted', (channelId) => {
      dispatch(deleteChannel(channelId));
    });

    socket.on('channelUpdated', (updatedChannel) => {
      dispatch(changeChannelName(updatedChannel));
    });

    socket.on('newChannel', (channel) => {
      dispatch(addChannelAction(channel));
    });

    return () => {
      socket.off('newMessage');
      socket.off('channelDeleted');
      socket.off('channelUpdated');
      socket.off('newChannel');
    };
  }, [dispatch]);

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<ChatPage />} />
            <Route path="/signup" element={<RegistrationPage />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
