import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PrintWeeklyplan from './PrintWeeklyplan';

 export default function ModalPrintWeeklyPlan({openPrintModal,setOpenPrintModal,selectedWeek}) {

    console.log("in Print Modal",selectedWeek)

//   const values = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'];
  const [fullscreen, setFullscreen] = useState(true);

//   function handleShow(breakpoint) {
//     setFullscreen(breakpoint);
//     setShow(true);
//   }

  return (
    <>
      <Modal show={openPrintModal} fullscreen={fullscreen} onHide={() => setOpenPrintModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Print Weekly Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body><PrintWeeklyplan selectedWeek={selectedWeek}/></Modal.Body>
      </Modal>
    </>
  );
}

