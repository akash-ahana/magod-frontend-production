
import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import axios from 'axios';



export default function UpdateDayshiftModal({updatedayshift,setUpdatedayshift,
    rowselectDailyShiftTable,onClickUpdateDayShift,selectedShiftIncharge,selectedWeek}) {

// Function to log the value when selectedWeek changes
const logSelectedWeekValue = () => {
};

// Use useEffect to call logSelectedWeekValue when selectedWeek changes
useEffect(() => {
  logSelectedWeekValue();
}, [selectedWeek, rowselectDailyShiftTable]);

    const handleClose=()=>{
        setUpdatedayshift(false);
    }

  return (
    <div>
         <Modal show={updatedayshift} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Dayshift</Modal.Title>
        </Modal.Header>

        <Modal.Body>Do you wish to add <b>{selectedShiftIncharge}</b> as Shift Incharge for <b>{rowselectDailyShiftTable?.Shift}</b> shift for  <b>{rowselectDailyShiftTable?.ShiftDate} ?</b>
        </Modal.Body> 

        <Modal.Footer>
          <Button variant="primary" onClick={()=>{handleClose()
            onClickUpdateDayShift()
            }}>
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
