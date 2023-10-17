import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import axios from 'axios';



export default function DeleteshiftModal({opendeleteshift,setOpendeleteshift,onClickDeleteWeekShift,
  selectedShift,selectedShiftIncharge,selectedWeek,setSelectedShift,setSelectedShiftIncharge}) {

    const handleClose=()=>{
        setOpendeleteshift(false);
    }

    const onClickonClickDeleteWeekShift=()=>{
      onClickDeleteWeekShift();
      handleClose();
      setSelectedShift("");
      setSelectedShiftIncharge("")
    }
    console.log(selectedShift)

  return (
    <div>
         <Modal show={opendeleteshift} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Shift</Modal.Title>
        </Modal.Header>

        {selectedShift ? (
          <Modal.Body>Are You sure want to Delete <b> {selectedShift}</b>  shift  for the week?
          </Modal.Body>
        ) : (
          <Modal.Body>
            Please select <b>Shift</b> before deleting
          </Modal.Body>
        )}
        
         
          
        <Modal.Footer>
          {selectedShift ? (
            <>
              <Button variant="primary" onClick={onClickonClickDeleteWeekShift}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
            </>
          ) : (
            <Button variant="primary" onClick={handleClose}>
              OK
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  )
}
