import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideModal } from '../../store/modalSlice'
import { deleteChannel } from '../../store/channelsSlice'
import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

function DeleteModal({id}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.modal.visible);
  const handleDelete = () => {
    dispatch(deleteChannel(id));
    dispatch(hideModal());
  }
  const hide = () => {
    dispatch(hideModal());
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { 
      e.preventDefault(); 
      handleDelete(); 
    }
  };
  return (
        <Modal show={visible} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.deleteHeader')}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
          {t('modals.no')}
          </Button>
          <Button variant="primary" onClick={handleDelete} onKeyDown={handleKeyDown}>
          {t('modals.yes')}
          </Button>
        </Modal.Footer>
      </Modal>

  )
}

export default DeleteModal
