import React from 'react';
import Message from './Message';

const MessageBox = ({filteredMessages, messageListRef, channelName}) => {

  return (
     <div id="messages-box" className="chat-messages overflow-auto px-5 flex-grow-1">
     <div className="flex-grow-1 overflow-auto p-3" ref={messageListRef}>
       <ul className="list-unstyled">
         {filteredMessages.map(message => (
           <Message key={message.messageId} {...message} />
         ))}
       </ul>
     </div>
   </div>
  );
};

export default MessageBox;
