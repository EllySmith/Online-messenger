import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideModal } from '../../store/modalSlice'
import { deleteChannel } from '../../store/channelsSlice'
import { Modal, Button } from 'react-bootstrap'

function DeleteModal({id}) {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.modal.visible);
  const handleDelete = () => {
    dispatch(deleteChannel(id));
    dispatch(hideModal());
  }
  const hide = () => {
    dispatch(hideModal());
  }
  return (
        <Modal show={visible} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
            Нет
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Да
          </Button>
        </Modal.Footer>
      </Modal>

  )
}

export default DeleteModal
