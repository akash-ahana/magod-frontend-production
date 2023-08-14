import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../../../api/baseUrl';

export default function CreateweekModal({
  openweekshift,
  setOpenweekshift,
  selectedShift,
  selectedShiftIncharge,
  selectedWeek,
  weekState,
  getSingleDayShiftPlan4thTable,
  getSecondTableData,
  setWeekState,
  setSelectedShift,
  setSelectedMachine,
  setSelectedShiftIncharge
}) {
  const handleClose = () => {
    setOpenweekshift(false);
  };

  const createWeekshift = () => {
    let constWeekState = weekState
    for(let i=0; i<constWeekState.length; i++) {
      //console.log(letinputArray[i].ShiftDate)  
      let dateSplit = constWeekState[i].ShiftDate.split("/"); 
      let year = dateSplit[2];
      let month = dateSplit[1];
      let day = dateSplit[0];
      let finalDay = year+"-"+month+"-"+day 
      constWeekState[i].ShiftDate = finalDay
      //console.log(finalDay)  
       }

       let fromTime =0; 
let toTime =0;
if(constWeekState.length > 0) {
  if(constWeekState[0].Shift === "First") {
     fromTime = " 06:00:00"
     toTime = " 14:00:00" 
}
if(constWeekState[0].Shift === "Second") {
  fromTime = " 14:00:00"
  toTime = " 22:00:00"
}
if(constWeekState[0].Shift === "Third") {
  fromTime = " 22:00:00"
  toTime = " 06:00:00"
}
if(constWeekState[0].Shift === "General") {
  fromTime = " 09:00:00"
  toTime = " 17:00:00"
}
for(let i=0; i<constWeekState.length; i++) {
constWeekState[i].FromTime = constWeekState[i].ShiftDate + fromTime
constWeekState[i].ToTime = constWeekState[i].ShiftDate + toTime
}
} 
    axios
      .post(baseURL + '/shiftEditor/createWeeklyShiftPlan', constWeekState)
      .then((response) => {
        console.log('CREATE WEEK SHIFT RESPONSE ', response);
        getSecondTableData();
        getSingleDayShiftPlan4thTable();
        handleClose();
        setWeekState('');
        // setSelectedShift('');
      });
      // setSelectedMachine("");
      // setSelectedShiftIncharge("")
  };

  return (
    <div>
      <Modal show={openweekshift} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Weekshift</Modal.Title>
        </Modal.Header>

        {selectedShiftIncharge.length > 0 && selectedShift ? (
          <Modal.Body>
            Do you wish to add <b>{selectedShiftIncharge}</b> for <b>{selectedShift}</b> shift for the week?
          </Modal.Body>
        ) : (
          <Modal.Body>
            Please select a <b>shift</b> and <b>shift Instructor</b> before clicking Create Weekshift.
          </Modal.Body>
        )}

        <Modal.Footer>
          {selectedShiftIncharge.length > 0 && selectedShift ? (
         <>
         <Button variant="primary" onClick={createWeekshift}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
         </>
        ) : (
         <>
         <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
         </>
        )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
