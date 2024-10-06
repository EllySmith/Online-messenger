import React from 'react'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function MessageBoxHeader({ channelName, filteredMessages}) {
     const { t } = useTranslation();
     const messages = useSelector(state => state.channels.channels);
  return (
     <div className="bg-light mb-4 p-3 shadow-sm small">
     <p className="m-0"><b>#{channelName}</b></p>
     <span className="text-muted">{messages.length} {t('chat.messages')}</span>
     </div>
  )
}

export default MessageBoxHeader
