import React,{useState}from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function PopModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <div>

{/* <Button variant="primary" >Launch demo modal</Button> */}

   <div className="row justify-content-center mt-3 mb-2">
       <button className="button-style " style={{ width: "120px" }}
       onClick={handleShow}>
         Save
        </button>
    </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>System.Window.Forms</Modal.Title>
        </Modal.Header>
        <Modal.Body>Setup Value Saved</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
