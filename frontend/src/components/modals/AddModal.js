import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../store/modalSlice";
import { addChannel } from "../../store/channelsSlice";
import { randomKey } from "../../utils/different";
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import leoProfanity from 'leo-profanity';

leoProfanity.loadDictionary('en');
leoProfanity.loadDictionary('ru');
leoProfanity.add('boobs');

function AddModal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.modal.visible);
  const [newName, setNewName] = useState('');
  const [invalidName, setInvalidName] = useState(false);
  const inputRef = useRef(null);
  const notify = () => toast(`${t('notify.add')}`);

  useEffect(() => {
    if (visible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [visible, invalidName]);

  const handleAddChannel = async () => {
    if (newName.length < 4 || newName.length > 20) {
      setInvalidName(true);
      return; 
  }
  setInvalidName(false);
  const newId = randomKey();
    const newChannel = { name: newName, id: newId, removable: true };    
    dispatch(addChannel(newChannel));
    setNewName('');
    dispatch(hideModal());
    };

  const hide = () => {
    dispatch(hideModal());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { 
      e.preventDefault(); 
      handleAddChannel(); 
    }
  };

  return (
    <div>
      <Modal show={visible} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modals.addHeader')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className={`form-control mb-2 ${invalidName ? 'is-invalid' : ''}`}
            value={newName}
            onChange={(e) => setNewName(leoProfanity.clean(e.target.value))}
            placeholder={t('modals.renamePlaceholder')}
            aria-label={t('modals.renamePlaceholder')}
            onKeyDown={handleKeyDown}
            required
          />
          <label className="visually-hidden" htmlFor="name">
              {t('modals.addPlaceholder')}
            </label>
            {invalidName && <div className="invalid-feedback">{t('modals.invalidName')}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hide}>
          {t('modals.quit')}
          </Button>
          <Button variant="primary" onClick={handleAddChannel}>
          {t('modals.add')}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default AddModal;
