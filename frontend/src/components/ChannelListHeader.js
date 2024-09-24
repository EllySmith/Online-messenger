import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddModal from './modals/AddModal';
import { changeModalType, showModal } from '../store/modalSlice';
import { useTranslation } from 'react-i18next';



function ChannelListHeader() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const type = useSelector((state) => state.modal.type);

  const handleAddClick = () => {
    dispatch(changeModalType('add'));
    console.log(type);
  dispatch(showModal());
 };
 return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t('chat.channels')}</b>
      <button
        type="button"
        className="p-0 text-primary btn btn-group-vertical"
        onClick={handleAddClick}
      >
        <p><b>+</b></p>
      </button>

    { type === 'add'&& <AddModal/>}
    </div>
  );
}

export default ChannelListHeader;
