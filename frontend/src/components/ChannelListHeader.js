import React from 'react'
import { useState } from 'react';
import { addChannel } from '../store/channelsSlice';
import { randomKey } from '../utils/different';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { changeCurrentChannel } from '../store/channelsSlice';


function ChannelListHeader() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const current = useSelector(state => state.channels.currentChannelId);



  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setNewName('');
  };

  const handleAddChannel = async () => {
    if (!newName) {
      console.error("Channel name is empty!");
      return; 
    }

    try {
      const newId = randomKey(); 
      const newChannel = { id: newId, name: newName, removable: true };
      console.log(newChannel);
      await dispatch(addChannel(newChannel)).unwrap();
      await dispatch(changeCurrentChannel(newId));
      console.log(current);
      handleCloseModal();
     
    } catch (error) {
      console.error('Failed to add channel:', error); 
    } 
  };

  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>Каналы</b>
      <button
        type="button"
        className="p-0 text-primary btn btn-group-vertical"
        onClick={handleShowModal}
      >
        <p><b>+</b></p>
      </button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Введите название:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            value={newName}
            onChange={(e) => setNewName(e.target.value)} 
            placeholder="Enter channel name"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={handleAddChannel}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ChannelListHeader;
