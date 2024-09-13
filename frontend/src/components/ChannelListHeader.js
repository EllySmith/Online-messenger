import React from 'react'
import { useState } from 'react';
import { addChannel, fetchChannels } from '../store/channelsSlice';
import { randomKey } from '../utils/different';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';


function ChannelListHeader() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');


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
      await dispatch(addChannel({ id: newId, name: newName, removable: true })).unwrap();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to add channel:', error); 
    } finally {
      dispatch(fetchChannels());
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
        <p>Add</p>
      </button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Channel</Modal.Title>
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
            Close
          </Button>
          <Button variant="primary" onClick={handleAddChannel}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ChannelListHeader;
