import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeChannelName } from '../../store/channelsSlice';
import { hideModal } from '../../store/modalSlice';
import { Modal, Button } from 'react-bootstrap';

function RenameModal({id}) {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.modal.visible);
 const [name, setName] = useState('');

 const handleRename = async () => {
  if (name.trim()) { 
    await dispatch(changeChannelName({ id, name }));
    dispatch(hideModal());
  }
};

const hide = () => {
  dispatch(hideModal());
}
  return (
    <div>
      <Modal show={visible} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>Введите новое имя:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
Закрыть          </Button>
          <Button variant="primary" onClick={() => handleRename({id, name})}>
          Изменить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default RenameModal


