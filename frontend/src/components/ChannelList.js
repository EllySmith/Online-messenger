import React from 'react';
import { useSelector } from 'react-redux';
import ChannelButton from './ChannelButton'; 

const ChannelList = ({ onClick }) => {
  const currentChannelId = useSelector(state => state.channels.currentChannelId)
  const channels = useSelector(state => state.channels.channels);

  return (
    <div>        
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(channel => (
          <ChannelButton key={channel.id} onClick={() => onClick(channel.id)} currentChannelId={currentChannelId} {...channel}/>
        ))}
      </ul>
    </div>
  );
};

export default ChannelList;