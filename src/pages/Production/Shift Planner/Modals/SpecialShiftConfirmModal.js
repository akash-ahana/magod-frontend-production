import react from 'react'
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../../../api/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function SpecialShiftConfirmModal({setOpen,specialConfirmModal,specialShiftFromDate,setSpecialShiftConfirmModal, specialShiftToDate,handleSubmit}) {

    const handleClose = () => {
        setOpen(true)
        setSpecialShiftConfirmModal(false)
    }

    const handleSubmitYes = () => {
        handleSubmit();
        setSpecialShiftConfirmModal(false)
    }
    return (
        <div>
        <Modal show={specialConfirmModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Special_shift</Modal.Title>
        </Modal.Header>
          <Modal.Body>Are You sure want to create special shift from <b>{specialShiftFromDate}</b> to <b>{specialShiftToDate}</b> ?
          </Modal.Body>

        <Modal.Footer>
         <Button variant="primary" onClick={handleSubmitYes} >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    );
}