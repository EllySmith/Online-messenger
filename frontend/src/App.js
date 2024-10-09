import './App.css';
import io from 'socket.io-client';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider, ErrorBoundary } from '@rollbar/react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LeoProfanity from 'leo-profanity';
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
import { ru, eng, it } from './utils/locales';

let socket;

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
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

  const savedLanguage = localStorage.getItem('i18nextLng') || 'ru';
  const ruLng = LeoProfanity.getDictionary('ru');
  const engLng = LeoProfanity.getDictionary('en');
  LeoProfanity.add([ruLng, engLng]);

  i18next.use(initReactI18next).init({
    resources: {
      ru: { translation: ru },
      eng: { translation: eng },
      it: { translation: it },
    },
    lng: savedLanguage,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

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
};

export default App;
