import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChannels } from '../store/channelsSlice';
import ChannelButton from './ChannelButton';

const ChannelList = () => {
  const channels = useSelector((state) => state.channels.channels);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  return (
    <ul className="h-100 d-block flex-column nav nav-pills nav-fill px-2 mb-3 overflow-auto">
      {channels.map((channel) => (
        <ChannelButton
            key={channel.id}
            id={channel.id}
            name={channel.name}
            removable={channel.removable}
        />
      ))}
    </ul>
  );
};

export default ChannelList;
