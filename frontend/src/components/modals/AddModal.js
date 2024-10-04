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
  const inputRef = useRef(null);

  useEffect(() => {
    if (visible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [visible]);

  const handleAddChannel = async () => {
    const newId = randomKey();
    const newChannel = { name: newName, id: newId, removable: true };    
    dispatch(addChannel(newChannel));
    dispatch(hideModal());
    setNewName('');
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
        <label class="visually-hidden" for="name">Имя канала</label>
          <input
            type="text"
            className="form-control"
            value={newName}
            onChange={(e) => setNewName(leoProfanity.clean(e.target.value))}
            placeholder={t('modals.renamePlaceholder')}
            aria-label={t('modals.renamePlaceholder')}
            onKeyDown={handleKeyDown}
            required
          />
          <label className="visually-hidden" htmlFor="name">
              {t('modals.renamePlaceholder')}
            </label>
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
    </div>
  );
}

export default AddModal;
