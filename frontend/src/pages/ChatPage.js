import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';
import ChannelList from '../components/ChannelList';
import Input from '../components/ChatInput';
import Header from '../components/Header';
import '../App.css';
import Modal from '../components/modals/Modal';
import { fetchChannels, changeCurrentChannel } from '../store/channelsSlice';
import { fetchMessages } from '../store/messagesSlice';
import MessageBox from '../components/MessageBox';
import ChannelListHeader from '../components/ChannelListHeader';
import MessageBoxHeader from '../components/MessageBoxHeader';

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const load = async () => {
      try {
        await dispatch(fetchChannels()).unwrap();
        await dispatch(fetchMessages()).unwrap();
      } catch (error) {
        navigate('/login');
      }
    };
    load();
    setLoading(false);
  }, [dispatch, navigate]);

  const channelName = useSelector((state) => {
    const channel = state.channels.channels.find(
      (c) => c.id === currentChannelId,
    );
    return channel ? channel.name : 'unknown';
  });

  return (
    <div className="h-100">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <Header className="mb-4" />

            <div
              className="container h-100 my-4 overflow-hidden rounded shadow"
              id="chat-container"
            >
              <div className="row h-100 bg-white flex-md-row">
                <div className="col-4 col-md-2 border-end px-0 bg-light flex-column d-flex">
                  <ChannelListHeader
                    currentChannelId={currentChannelId}
                    setCurrentChannel={changeCurrentChannel}
                  />
                  <ChannelList
                    currentChannelId={currentChannelId}
                    onClick={(id) => dispatch(changeCurrentChannel(id))}
                  />
                </div>

                <div className="col p-0 d-flex flex-column h-100">
                  <MessageBoxHeader channelName={channelName} />
                  <MessageBox/>

                  <div className="mt-auto px-5 py-3">
                    <Input
                      currentChannelId={currentChannelId}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal />
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default ChatPage;
