import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const CustomModal = ({ show, handleClose, data }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{data.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{data.content}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className='primary' onClick={handleClose}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
