
import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import axios from 'axios';



export default function UpdateDayshiftModal({updatedayshift,setUpdatedayshift,
    rowselectDailyShiftTable}) {
    console.log(rowselectDailyShiftTable.Shift_Ic);


    const handleClose=()=>{
        setUpdatedayshift(false);
    }

  return (
    <div>
         <Modal show={updatedayshift} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Dayshift</Modal.Title>
        </Modal.Header>

        <Modal.Body><b> {rowselectDailyShiftTable.Shift_Ic}</b> is updated as shift incharge for <b>{rowselectDailyShiftTable.Shift}</b> shift for 
        &nbsp; <b>{rowselectDailyShiftTable.ShiftDate}</b>
        </Modal.Body> 

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
