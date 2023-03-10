import React,{useState}from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function ThirdModal({modalopen,setModalopen,finalresponse}) {

    const handleClose = () => setModalopen(false);

    // console.log("IM final response",finalresponse)

  return (
    <div>
      <Modal show={modalopen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Magod Production Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>{finalresponse}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
