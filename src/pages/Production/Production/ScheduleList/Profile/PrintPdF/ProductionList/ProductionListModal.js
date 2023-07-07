import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ProductionListPdf from './ProductionListPdf';
import { useGlobalContext } from '../../../../../../../Context/Context';

 export default function ProductionListModal({openProductionList,setOpenProductionList,rowselect,processrowselect,partlistdata}) {
  const [fullscreen, setFullscreen] = useState(true);

  const { selectedRows } = useGlobalContext();

  console.log(selectedRows)

  return (
    <>
      <Modal show={openProductionList} fullscreen={fullscreen} onHide={() => setOpenProductionList(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Show Parts Pdf</Modal.Title>
        </Modal.Header>
        <Modal.Body><ProductionListPdf selectedRows={selectedRows} /></Modal.Body>
      </Modal>
    </>
  );
}

