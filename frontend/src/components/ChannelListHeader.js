import React from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from '../store/modalSlice';
import { useTranslation } from 'react-i18next';

function ChannelListHeader() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleAddClick = () => {
    dispatch(showModal({ type: 'add' }));
  };
  return (
    <div className="d-flex justify-content-between align-items-center mb-2 ps-4 pe-2 p-4">
      <b className="m-0">{t('chat.channels')}</b>
      <div className="ms-auto">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleAddClick}
        >
          <b>+</b>
        </button>
      </div>
    </div>
  );
}

export default ChannelListHeader;
