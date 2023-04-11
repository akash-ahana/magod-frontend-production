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

        <Modal.Body>Are You sure want to delete Machine :<b> {selectedRow.refName}</b> ?</Modal.Body>

        <Modal.Footer>
          <Button style={{backgroundColor:"#2b3a55",border:"#2b3a55"}} onClick={()=>{deleteMachine()
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
