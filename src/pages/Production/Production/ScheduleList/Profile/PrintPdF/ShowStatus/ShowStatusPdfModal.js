import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PrintShowStatus from './PrintShowStatus';

 export default function ShowStatusPdfModal({setOpenShowStatus,openShowStatus,showStatusData}) {
  const [fullscreen, setFullscreen] = useState(true);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (showStatusData && showStatusData.length > 0) {
      setLoading(false); // Set loading to false when the data is available
    }
  }, [showStatusData]); // Run the effect whenever pdfData changes


  console.log(showStatusData);
  return (
    <>
      <Modal show={openShowStatus} fullscreen={fullscreen} onHide={() => setOpenShowStatus(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Production Status Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {loading ? (
            <div>Loading...</div>
          ) : (
            <PrintShowStatus showStatusData={showStatusData}/>
          )}
          </Modal.Body>
      </Modal>
    </>
  );
}

