import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ShowProgramsPdf from './ShowProgramsPdf';

 export default function ShowProgramsPdfModal({setOpenShowPrograms,openShowPrograms,rowselect,processrowselect,programlistdata}) {
  const [fullscreen, setFullscreen] = useState(true);
  console.log("Show Programs Modal  data",programlistdata);

  return (
    <>
      <Modal show={openShowPrograms} fullscreen={fullscreen} onHide={() => setOpenShowPrograms(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Show Program Report</Modal.Title>
        </Modal.Header>
        <Modal.Body><ShowProgramsPdf 
        rowselect={rowselect}
        processrowselect={processrowselect}
        programlistdata={programlistdata}/></Modal.Body>
      </Modal>
    </>
  );
}

