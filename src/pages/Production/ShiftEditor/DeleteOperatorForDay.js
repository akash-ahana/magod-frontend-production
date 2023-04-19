
import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import axios from 'axios';



export default function DeleteOperatorForDay({deleteoperator,setDeleteoperator}) {

    const handleClose=()=>{
        setDeleteoperator(false);
    }

  return (
    <div>
         <Modal show={deleteoperator} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Oprator</Modal.Title>
        </Modal.Header>

        <Modal.Body> Machine Operator Deleted</Modal.Body> 

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
