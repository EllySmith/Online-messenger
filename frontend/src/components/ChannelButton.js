import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeChannelName, changeCurrentChannel, deleteChannel } from '../store/channelsSlice';
import DeleteModal from './DeleteModal';
import RenameModal from './RenameModal';
import ChannelMenu from './ChannelMenu';

const ChannelButton = ({ id, name, removable }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(changeCurrentChannel(id));
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleRenameClick = () => {
    setShowRenameModal(true);
  };

  const handleDelete = () => {
    dispatch(deleteChannel(id));
    setShowDeleteModal(false);
  };

  const handleRename = (newName) => {
    dispatch(changeChannelName(id, newName));
    setShowRenameModal(false);
  };

  const handleCancel = () => {
    setShowDeleteModal(false);
    setShowRenameModal(false);
  };

  const currentChannelId = useSelector(state => state.channels.currentChannelId);
  const buttonClass = id === currentChannelId ? 'btn btn-primary' : 'btn';

  return (
    <>
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
          {removable && <ChannelMenu handleDeleteClick={handleDeleteClick} handleRenameClick={handleRenameClick} buttonClass={buttonClass}/>}
        </div>
      </li>

      {showDeleteModal && <DeleteModal handleCancel={handleCancel} handleDelete={handleDelete}/>}

      {showRenameModal && <RenameModal handleCancel={handleCancel} handleRename={handleRename}/>}
    </>
  );
};

export default ChannelButton;
