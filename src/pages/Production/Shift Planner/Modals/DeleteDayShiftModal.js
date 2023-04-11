
import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import axios from 'axios';



export default function DeleteDayShiftModal({deletedayshift,setDeletedayshift,
  rowselectDailyShiftTable,onClickDeleteDayShiftPlan}) {
    // console.log(rowselectDailyShiftTable);

    const handleClose=()=>{
        setDeletedayshift(false);
    }

  return (
    <div>
         <Modal show={deletedayshift} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Dayshift</Modal.Title>
        </Modal.Header>

        <Modal.Body>  Are you sure want to delete <b>{rowselectDailyShiftTable.Shift}</b> shift for <b>{rowselectDailyShiftTable.ShiftDate}</b> &nbsp;
        with Shift Incharge <b>{rowselectDailyShiftTable.Shift_Ic}</b>?</Modal.Body> 

        <Modal.Footer>
          <Button variant="primary" onClick={()=>{onClickDeleteDayShiftPlan()
            handleClose()}}>
            Yes
          </Button>
          <Button variant='secondary' onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
