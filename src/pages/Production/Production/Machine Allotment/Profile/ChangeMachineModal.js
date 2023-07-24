import React,{useState,useEffect}from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ChangeMachineModal({openModal,setOpenModal,selectedRows,selectedMachine,clickChangeMachine,handleClose}) {
    console.log(selectedRows[0]?.Machine)

  return (
    <div>
      <Modal show={openModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Magod Production Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Do you wish to change the programs from <b>{selectedRows[0]?.Machine}</b> to <b>{selectedMachine}</b>?
        </Modal.Body>

        <Modal.Footer>
          <Button style={{backgroundColor:"#2b3a55",border:"#2b3a55"}}
          onClick={clickChangeMachine}>
           Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
           No
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
