import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideModal } from '../../store/modalSlice'
import { deleteChannel } from '../../store/channelsSlice'
import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'


function DeleteModal({id}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.modal.visible);
  const channelId = useSelector((state) => state.modal.channelId);
  const notify = () => toast(`${t('notify.delete')}`);
  const handleDelete = () => {
    dispatch(deleteChannel(channelId));
    notify();
    dispatch(hideModal());
  };

  const hide = () => {
    dispatch(hideModal());
  }
  return (
        <div><Modal show={visible} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.deleteHeader')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t('modals.deleteBody')}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
          {t('modals.cancel')}
          </Button>
          <Button variant="primary" className='btn-danger' onClick={handleDelete}>
          {t('modals.delete')}
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
  )
}

export default DeleteModal
