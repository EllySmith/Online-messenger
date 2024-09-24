import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeChannelName } from '../../store/channelsSlice';
import { hideModal } from '../../store/modalSlice';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function RenameModal({id}) {
  const { t } = useTranslation();
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
const handleKeyDown = (e) => {
  if (e.key === 'Enter') { 
    e.preventDefault(); 
    handleRename(); 
  }
};
  return (
    <div>
      <Modal show={visible} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.renameHeader')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  onKeyDown={handleKeyDown}
                />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
          {t('modals.quit')}          </Button>
          <Button variant="primary" onClick={() => handleRename({id, name})}>
          {t('modals.rename')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default RenameModal


