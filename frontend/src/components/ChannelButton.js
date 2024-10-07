import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentChannel } from '../store/channelsSlice';
import ChannelMenu from './ChannelMenu';
import { showModal } from '../store/modalSlice';

const ChannelButton = ({ id, name, removable }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(changeCurrentChannel(id));
  };

  const handleRenameClick = () => {
    dispatch(showModal({ type: 'rename', channelId: id }));
  };

  const handleDeleteClick = () => {
    dispatch(showModal({ type: 'delete', channelId: id }));
  };

  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId
  );
  const buttonClass = id === currentChannelId ? 'btn btn-secondary' : 'btn';

  return (
    <li className="nav-item w-100">
      <div role="group" className="d-flex dropdown btn-group">
        <button
          type="button"
          className={`w-100 rounded-0 text-start text-truncate ${buttonClass}`}
          onClick={handleClick}
        >
          <span className="me-1">#</span>
          {name}
        </button>
        {removable && (
          <ChannelMenu
            handleDeleteClick={handleDeleteClick}
            handleRenameClick={handleRenameClick}
            buttonClass={buttonClass}
          />
        )}
      </div>
    </li>
  );
};

export default ChannelButton;
