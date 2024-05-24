import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PrintShowStatus from './PrintShowStatus';

export default function ShowStatusPdfModal({ setOpenShowStatus, openShowStatus, showStatusData,location }) {
  const [fullscreen, setFullscreen] = useState(true);
  const [loading, setLoading] = useState(false); // Set to false by default

  useEffect(() => {
    if (showStatusData && showStatusData.length > 0) {
      setLoading(false); // Set loading to false when the data is available
    }
  }, [showStatusData]); // Run the effect whenever showStatusData changes

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
            <PrintShowStatus showStatusData={showStatusData} location={location}/>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
