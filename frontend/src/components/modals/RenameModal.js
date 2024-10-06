import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeChannelName } from '../../store/channelsSlice';
import { hideModal } from '../../store/modalSlice';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';


function RenameModal({id}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.modal.visible);
  const channelId = useSelector((state) => state.modal.channelId);
  const channelName = useSelector((state) => {
    const channel = state.channels.channels.find(c => c.id === channelId);
    return channel ? channel.name : 'unknown';
  });

 const [newName, setName] = useState(channelName);
 const [invalidName, setInvalidName] = useState(false);
 const notify = () => toast(`${t('notify.rename')}`);

 const handleRename = async () => {
  if (newName.length < 3 || newName.length > 20) {
    setInvalidName(true);
    return;
  }
  setInvalidName(false);
  await dispatch(changeChannelName({ id: channelId, name: newName }));
  notify();
  dispatch(hideModal());
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
                  id="name"
                  value={newName}
                  onChange={(e) => {
                    setInvalidName(false); setName(leoProfanity.clean(e.target.value))}}
                  className={`form-control mb-2 ${invalidName ? 'is-invalid' : ''}`}
                  onKeyDown={handleKeyDown}
                />
                <label className="visually-hidden" htmlFor="name">
                Переименовать
            </label>
                {invalidName && <div className="invalid-feedback">{t('modals.invalidName')}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
          {t('modals.quit')}          
          </Button>
          <Button variant="primary" onClick={() => handleRename()}>
          {t('modals.rename')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default RenameModal


