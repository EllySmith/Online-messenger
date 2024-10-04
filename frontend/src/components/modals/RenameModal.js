import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeChannelName } from '../../store/channelsSlice';
import { hideModal } from '../../store/modalSlice';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import "react-toastify/dist/ReactToastify.minimal.css";

leoProfanity.loadDictionary('en');
leoProfanity.loadDictionary('ru');

function RenameModal({id, name}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.modal.visible);

 const [newName, setName] = useState(name);
 const [invalidName, setInvalidName] = useState(false);
 const notify = () => toast(`${t('notify.rename')}`);

 const handleRename = async () => {
  if (newName.length < 4 || newName.length > 20) {
    setInvalidName(true);
    return; 
}
    setInvalidName(false);
    await dispatch(changeChannelName({ id, name: newName }));
    notify();
    dispatch(hideModal());
  }


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
                  value={newName}
                  onChange={(e) => setName(leoProfanity.clean(e.target.value))}
                  className={`form-control mb-2 ${invalidName ? 'is-invalid' : ''}`}
                  onKeyDown={handleKeyDown}
                />
                {invalidName && <div className="invalid-feedback">{t('modals.invalidName')}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
          {t('modals.quit')}          </Button>
          <Button variant="primary" onClick={() => handleRename()}>
          {t('modals.rename')}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>
    </div>
  )
}

export default RenameModal


