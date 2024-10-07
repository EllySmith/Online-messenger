import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const MessageBoxHeader = ({ channelName }) => {
  const { t } = useTranslation();
  const messages = useSelector((state) => state.messages.messages);
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );
  const filteredMessages = messages.filter(
    (message) => message.channelId === currentChannelId,
  );
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          #
          {channelName}
          </b>
      </p>
      <span className="text-muted">
        {filteredMessages.length}
        {t('chat.messages')}
      </span>
    </div>
  );
};

export default MessageBoxHeader;
