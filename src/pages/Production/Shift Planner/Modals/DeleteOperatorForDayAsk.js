import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function DeleteOperatorForDayAsk({ openmodal, setOpenModal, data, onDeleteOperatorForDay }) {
  let ShiftDate = data?.ShiftDate ? data.ShiftDate.split(" ") : null;

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Modal show={openmodal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Operator For A Day</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are You Sure You want to delete <b>{data.Operator}</b> for <b>{data.Machine}</b> on {ShiftDate ? <b>{ShiftDate[0]}</b> : 'N/A'}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={()=>{onDeleteOperatorForDay()
        handleClose()}}>Yes</Button>
          <Button variant='secondary' onClick={handleClose}>No</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
