import React from 'react';
import { useSelector } from 'react-redux';
import DeleteModal from './DeleteModal';
import RenameModal from './RenameModal';
import AddModal from './AddModal';

const Modal = () => {
  const modal = useSelector((state) => state.modal);
  const { visible, type, channelId } = modal;

  return (
    <div>
      {visible && type === 'delete' && <DeleteModal id={channelId} />}
      {visible && type === 'rename' && <RenameModal id={channelId} />}
      {visible && type === 'add' && <AddModal />}
    </div>
  );
};

export default Modal;
