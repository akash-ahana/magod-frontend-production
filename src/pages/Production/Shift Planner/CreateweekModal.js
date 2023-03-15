import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import axios from 'axios';



export default function CreateweekModal({openweekshift,setOpenweekshift,
    selectedShift,selectedShiftIncharge, selectedWeek,weekState,
    getSingleDayShiftPlan4thTable,getSecondTableData,setWeekState}) {

        console.log(selectedShift,selectedShiftIncharge);

    const handleClose=()=>{
        setOpenweekshift(false);
    }

    const createWeekshift=()=>{
        axios.post('http://172.16.20.61:5000/shiftEditor/createWeeklyShiftPlan', weekState)
        .then((response) => {console.log(response)
        getSecondTableData();
        getSingleDayShiftPlan4thTable();
        handleClose();
        setWeekState('')
      }) 
      }

    // useEffect(() => {
    //     createWeekshift();
    //   },[weekState])

  return (
    <div>
         <Modal show={openweekshift} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Weekshift </Modal.Title>
        </Modal.Header>

        <Modal.Body>Do you wish to add {selectedShiftIncharge} for {selectedShift} shift for &nbsp;
         {selectedWeek.map((item)=>{
            return(
                <>
                {item} ,  
                </>
            )
         })} ?
         </Modal.Body> 

        <Modal.Footer>
          <Button variant="primary" onClick={()=>createWeekshift()} >
            Yes
          </Button>
          <Button variant="secondary">
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
