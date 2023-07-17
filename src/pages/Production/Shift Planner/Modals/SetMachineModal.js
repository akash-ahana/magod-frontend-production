import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../../../api/baseUrl';



export default function SetMachineModal({opensetmachine,setOpensetmachine,selectedMachine,
    selectedOperator, selectedWeek,weekState1,setWeekState1,getMachineOperatorTableData,
    getSingleDayShiftPlan4thTable}) {
    const handleClose=()=>{
        setOpensetmachine(false);
    }

      const setMachineoperators=()=>{
        console.log(weekState1);
        axios.post(baseURL+'/shiftEditor/setMachineOperators', weekState1)
        .then((response) => {
          console.log(response);
        getMachineOperatorTableData();
        getSingleDayShiftPlan4thTable();
        handleClose();
        setWeekState1('')
      })
      }

  return (
    <div>
         <Modal show={opensetmachine} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set Machine </Modal.Title>
        </Modal.Header>

        {selectedOperator && selectedMachine ? (
          <Modal.Body>Are you sure want add <b>{selectedOperator}</b> to <b>{selectedMachine}</b> for the week?</Modal.Body> 

        ) : (
          <Modal.Body>
            Please select a Operator and Machine  before clicking Set MachineOperator
          </Modal.Body>
        )}



<Modal.Footer>
          {selectedOperator && selectedMachine ? (
            <>
          <Button variant="primary" onClick={()=>setMachineoperators()}>
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
