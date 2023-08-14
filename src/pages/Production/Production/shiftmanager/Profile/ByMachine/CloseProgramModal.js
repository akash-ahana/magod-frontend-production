import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function CloseProgramModal({openCloseProgram,setCloseProgram}) {
    const handleClose=()=>{
        setCloseProgram(false);
    }
  return (
    <Modal show={openCloseProgram}>
    <Modal.Header closeButton  onClick={handleClose}>
          <Modal.Title>Production Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Program Closed
        </Modal.Body>
        <Modal.Footer>
        <Button style={{backgroundColor:"#2b3a55",border:"#2b3a55"}} onClick={handleClose}>
           OK
          </Button>
        </Modal.Footer>
  </Modal>

  )
}
