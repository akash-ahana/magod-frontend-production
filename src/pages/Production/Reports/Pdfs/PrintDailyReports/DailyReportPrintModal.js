import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import DailyReportsPdf from './DailyReportsPdf';

export default function DailyReportPrintModal({ opendailyReport, setOpendailyReport, pdfData,dateSelect,preparedby,roleValue}) {
  const [fullscreen, setFullscreen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pdfData && pdfData.length > 0) {
      setLoading(false); // Set loading to false when the data is available
    }
  }, [pdfData]); // Run the effect whenever pdfData changes

  console.log(pdfData);

  return (
    <>
      <Modal show={opendailyReport} fullscreen={fullscreen} onHide={() => setOpendailyReport(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Print Daily Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <DailyReportsPdf pdfData={pdfData} dateSelect={dateSelect} preparedby={preparedby}
            roleValue={roleValue} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
