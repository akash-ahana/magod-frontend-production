import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PrintShowStatus from './PrintShowStatus';

 export default function ShowStatusPdfModal({setOpenShowStatus,openShowStatus,showStatusData}) {
  const [fullscreen, setFullscreen] = useState(true);


  return (
    <>
      <Modal show={openShowStatus} fullscreen={fullscreen} onHide={() => setOpenShowStatus(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Show Status Pdf</Modal.Title>
        </Modal.Header>
        <Modal.Body><PrintShowStatus showStatusData={showStatusData}/></Modal.Body>
      </Modal>
    </>
  );
}

