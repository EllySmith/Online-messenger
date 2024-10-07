import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { randomKey } from '../utils/different';
import { sendMessage } from '../store/messagesSlice';
import { toast } from 'react-toastify';

const Input = React.forwardRef(({ currentChannelId }, ref) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [messageInput, setMessageInput] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const notify = () => toast(`${t('errors.noconnection')}`);

  const handleSendMessage = async () => {
    setUsername(localStorage.getItem('username'));
    if (messageInput.trim() && !sendingMessage) {
      setSendingMessage(true);
      try {
        const newId = randomKey();
        await dispatch(
          sendMessage({
            body: messageInput,
            messageId: newId,
            channelId: currentChannelId,
            username: username,
          })
        ).unwrap();
        setMessageInput('');
      } catch (error) {
        console.error('Failed to send message:', error);
        notify();
      } finally {
        setSendingMessage(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="input-group has-validation fom-control">
      <form
        noValidate=""
        className="py-1 border rounded-2 w-100"
        onSubmit={handleSendMessage}
      >
        <div className="input-group has-validation">
          <input
            name="body"
            aria-label="Новое сообщение"
            placeholder={t('chat.messagePlaceholder')}
            value={messageInput}
            onChange={(e) =>
              setMessageInput(leoProfanity.clean(e.target.value))
            }
            onKeyDown={handleKeyDown}
            ref={ref}
            className="border-0 p-0 ps-2 form-control"
          />
          <label className="visually-hidden" htmlFor="name">
            {t('modals.messagePalceholder')}
          </label>
          <button type="submit" className="btn btn-group-vertical">
            {t('chat.sendMessage')}
          </button>
        </div>
      </form>
    </div>
  );
});

export default Input;
