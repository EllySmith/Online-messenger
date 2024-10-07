import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChannelList from "../components/ChannelList";
import Input from "../components/ChatInput";
import Header from "../components/Header";
import "../App.css";
import DeleteModal from "../components/modals/DeleteModal";
import RenameModal from "../components/modals/RenameModal";
import { fetchChannels, changeCurrentChannel } from "../store/channelsSlice";
import { fetchMessages } from "../store/messagesSlice";
import MessageBox from "../components/MessageBox";
import ChannelListHeader from "../components/ChannelListHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessageBoxHeader from "../components/MessageBoxHeader";
import LeoProfanity from "leo-profanity";
import AddModal from "../components/modals/AddModal";

function ChatPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messages = useSelector((state) => state.messages.messages);
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );
  const modal = useSelector((state) => state.modal);
  const messageInputRef = useRef(null);
  const messageListRef = useRef(null);
  LeoProfanity.loadDictionary(["en", "ru", "it"]);
  LeoProfanity.remove("boob");
  LeoProfanity.add("boobs");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
    dispatch(changeCurrentChannel("1"));
  }, [dispatch]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const channelName = useSelector((state) => {
    const channel = state.channels.channels.find(
      (c) => c.id === currentChannelId
    );
    return channel ? channel.name : "unknown";
  });

  const modalVisible = useSelector((state) => state.modal.visible);

  useEffect(() => {
    if (!modalVisible) {
      messageInputRef.current.focus();
    }
  }, [modalVisible]);

  return (
    <div className="h-100">
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
                <MessageBox messageListRef={messageListRef} />

                <div className="mt-auto px-5 py-3">
                  <Input
                    ref={messageInputRef}
                    currentChannelId={currentChannelId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal.visible && modal.type === "delete" && (
        <DeleteModal id={modal.channelId} />
      )}
      {modal.visible && modal.type === "rename" && (
        <RenameModal id={modal.channelId} />
      )}
      {modal.visible && modal.type === "add" && <AddModal />}

      <ToastContainer />
    </div>
  );
}

export default ChatPage;
