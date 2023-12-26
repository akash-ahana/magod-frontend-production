import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function AddProcessConfirmation({
  show,
  handleClose,
  data,
  handleDelete,
  handleAdd,
}) {
  const handleYesClick = () => {
    handleAdd(data);
    toast.success("Process Added Successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{data.content}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleYesClick}>
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
