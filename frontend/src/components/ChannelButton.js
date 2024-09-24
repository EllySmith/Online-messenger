import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentChannel } from '../store/channelsSlice';
import DeleteModal from './modals/DeleteModal';
import RenameModal from './modals/RenameModal';
import ChannelMenu from './ChannelMenu';
import { changeModalType, showModal } from '../store/modalSlice';


const ChannelButton = ({ id, name, removable }) => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.modal.type);

  const handleClick = () => {
    dispatch(changeCurrentChannel(id));
  };

  const handleRenameClick = () => {
    dispatch(changeModalType('rename'));
    dispatch(showModal());
  };

  const handleDeleteClick = () => {
    dispatch(changeModalType('delete'));
    dispatch(showModal());
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
            #{name}
          </button>
          {removable && <ChannelMenu handleDeleteClick={handleDeleteClick} handleRenameClick={handleRenameClick} buttonClass={buttonClass}/>}
        </div>
      </li>

      {type === 'delete' && <DeleteModal id={id} />}
      {type === 'rename' && <RenameModal id={id} />}
    </>
  );
};

export default ChannelButton;
