import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import axios from 'axios';



export default function SetMachineModal({opensetmachine,setOpensetmachine,selectedMachine,
    selectedOperator, selectedWeek,weekState1,setWeekState1,getMachineOperatorTableData}) {
    const handleClose=()=>{
        setOpensetmachine(false);
    }

    // useEffect(() => {
        
    //   },[weekState1])

      const setMachineoperators=()=>{
        axios.post('http://172.16.20.61:5000/shiftEditor/setMachineOperators', weekState1)
        .then((response) => {console.log(response)
        getMachineOperatorTableData();
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

        <Modal.Body>Are you sure want add {selectedOperator} to {selectedMachine} for the week?</Modal.Body> 

        <Modal.Footer>
          <Button variant="primary" onClick={()=>setMachineoperators()}>
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
