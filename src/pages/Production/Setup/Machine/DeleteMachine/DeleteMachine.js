import React,{useEffect, useState}from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

export default function DeleteMachine({opendeletemachine,setOpendeletemachine,selectedRow,deleteMachine}) {
    console.log(selectedRow)
    const handleClose = () => setOpendeletemachine(false);
    

  return (
    <div>
      <Modal show={opendeletemachine} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DELETE MACHINE</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are You sure want to delete Machine : {selectedRow.refName}</Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={()=>{deleteMachine()
          handleClose()}}>
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
