
import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import axios from 'axios';



export default function AddOperatorModal({addoperator,setAddoperator}) {

    const handleClose=()=>{
        setAddoperator(false);
    }

  return (
    <div>
         <Modal show={addoperator} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Operator</Modal.Title>
        </Modal.Header>

        <Modal.Body>Operator Added</Modal.Body> 

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
