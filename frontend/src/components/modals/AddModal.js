import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';
import { hideModal } from '../../store/modalSlice';
import {
  addChannel,
  changeCurrentChannel,
  fetchChannels,
} from '../../store/channelsSlice';

const AddModal = () => {
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
    if (newName.length < 3 || newName.length > 20) {
      setInvalidName(true);
      return;
    }
    setInvalidName(false);
    const newChannel = { name: newName, removable: true };
    const response = await dispatch(addChannel(newChannel));
    if (response.meta.requestStatus === 'fulfilled') {
      const { id } = response.payload;
      dispatch(changeCurrentChannel(id));
    }
    setNewName('');
    dispatch(hideModal());
    dispatch(fetchChannels());
    notify();
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
          <label htmlFor="name" className="visually-hidden">
            Имя канала
          </label>
          <input
            type="text"
            id="name"
            className={`form-control mb-2 ${invalidName ? 'is-invalid' : ''}`}
            value={newName}
            onChange={(e) => setNewName(leoProfanity.clean(e.target.value))}
            aria-label={t('modals.addPlaceHolder')}
            onKeyDown={handleKeyDown}
            required
          />
          {invalidName && (
            <div className="invalid-feedback">{t('modals.invalidName')}</div>
          )}
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
};

export default AddModal;
