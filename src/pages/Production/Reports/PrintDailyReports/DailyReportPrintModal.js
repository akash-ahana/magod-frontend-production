import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import DailyReportsPdf from './DailyReportsPdf';

 export default function DailyReportPrintModal({opendailyReport,setOpendailyReport}) {
  const [fullscreen, setFullscreen] = useState(true);


  return (
    <>
      <Modal show={opendailyReport} fullscreen={fullscreen} onHide={() => setOpendailyReport(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Show Parts Pdf</Modal.Title>
        </Modal.Header>
        <Modal.Body><DailyReportsPdf/></Modal.Body>
      </Modal>
    </>
  );
}

