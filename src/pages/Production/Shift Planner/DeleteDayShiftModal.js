
import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import axios from 'axios';



export default function DeleteDayShiftModal({deletedayshift,setDeletedayshift,
  rowselectDailyShiftTable}) {
    console.log(rowselectDailyShiftTable);

    const handleClose=()=>{
        setDeletedayshift(false);
    }

  return (
    <div>
         <Modal show={deletedayshift} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Dayshift</Modal.Title>
        </Modal.Header>

        <Modal.Body>{rowselectDailyShiftTable.Shift} shift for  {rowselectDailyShiftTable.ShiftDate} &nbsp;
        with Shift Incharge {rowselectDailyShiftTable.Shift_Ic} is deleted.</Modal.Body> 

        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
