import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import axios from 'axios';



export default function DeleteshiftModal({opendeleteshift,setOpendeleteshift,onClickDeleteWeekShift,
  selectedShift,selectedShiftIncharge,selectedWeek}) {

    const handleClose=()=>{
        setOpendeleteshift(false);
    }

  return (
    <div>
         <Modal show={opendeleteshift} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Shift</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are You sure want to Delete <b> {selectedShift}</b>  shift  for the week?
         </Modal.Body> 

        <Modal.Footer>
          <Button variant="primary" onClick={()=>{onClickDeleteWeekShift()
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
