
import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import axios from 'axios';



export default function DeleteMachineoperatorweekModal({opendeleteoperator,setOpendeleteoperator,
    onClickDeleteWeekOperatorMachine,selectedOperator,selectedWeek,selectedMachine,selectedShift}) {


    const handleClose=()=>{
        setOpendeleteoperator(false);
    }

  return (
    <div>
         <Modal show={opendeleteoperator} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Machine Operator for week</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are you sure want to delete <b>{selectedOperator}</b> for <b>{selectedMachine}</b> for 
         <b>{selectedShift}</b> shift?
        </Modal.Body> 

        <Modal.Footer>
          <Button variant="primary" onClick={()=>{handleClose()
          onClickDeleteWeekOperatorMachine()}}>
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
