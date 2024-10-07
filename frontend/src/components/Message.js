import React from 'react';

const Message = ({ messageId, username, body }) => (
  <div className="chat-messages overflow-auto" key={messageId}>
    <div className="text-break mb-2">
      <p>
        <b>
          {username}
          :
          </b>
        <span>
          {body}
          </span>
      </p>
    </div>
  </div>
);

export default Message;
