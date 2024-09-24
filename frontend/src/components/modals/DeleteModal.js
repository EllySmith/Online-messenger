import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideModal } from '../../store/modalSlice'
import { deleteChannel } from '../../store/channelsSlice'
import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.minimal.css";


function DeleteModal({id}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.modal.visible);
  const notify = () => toast(`${t('notify.delete')}`);
  const handleDelete = () => {
    dispatch(deleteChannel(id));
    notify();
    dispatch(hideModal());
  }
  const hide = () => {
    dispatch(hideModal());
  }
  return (
        <div><Modal show={visible} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.deleteHeader')}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
          {t('modals.no')}
          </Button>
          <Button variant="primary" onClick={handleDelete}>
          {t('modals.yes')}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>
      </div>
  )
}

export default DeleteModal
