
import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import axios from 'axios';



export default function UpdateDayshiftModal({updatedayshift,setUpdatedayshift,
    rowselectDailyShiftTable}) {
    console.log(rowselectDailyShiftTable)


    const handleClose=()=>{
        setUpdatedayshift(false);
    }

  return (
    <div>
         <Modal show={updatedayshift} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Dayshift</Modal.Title>
        </Modal.Header>

        <Modal.Body> {rowselectDailyShiftTable.Shift_Ic} is updated as shift incharge for {rowselectDailyShiftTable.Shift} shift for 
        &nbsp; {rowselectDailyShiftTable.ShiftDate}
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
