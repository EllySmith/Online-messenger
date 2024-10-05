import React from 'react'
import { useTranslation } from 'react-i18next';

function MessageBoxHeader({ channelName, filteredMessages}) {
     const { t } = useTranslation();
  return (
     <div className="bg-light mb-4 p-3 shadow-sm small">
     <p className="m-0"><b>#{channelName}</b></p>
     <span className="text-muted">{filteredMessages.length} {t('chat.messages')}</span>
     </div>
  )
}

export default MessageBoxHeader
