import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChannels } from '../store/channelsSlice';
import ChannelButton from './ChannelButton';

const ChannelList = () => {
  const channels = useSelector((state) => state.channels.channels);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch, channels]);

  return (
    <div>
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <ChannelButton
            key={channel.id}
            id={channel.id}
            name={channel.name}
            removable={channel.removable}
          />
        ))}
      </ul>
    </div>
  );
};

export default ChannelList;
