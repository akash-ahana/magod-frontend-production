import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ShowPartsPdf from './ShowPartsPdf';

 export default function ShowPartsPdfModal({setOpenShowParts,openShowparts}) {
  const [fullscreen, setFullscreen] = useState(true);


  return (
    <>
      <Modal show={openShowparts} fullscreen={fullscreen} onHide={() => setOpenShowParts(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Show Parts Pdf</Modal.Title>
        </Modal.Header>
        <Modal.Body><ShowPartsPdf/></Modal.Body>
      </Modal>
    </>
  );
}

