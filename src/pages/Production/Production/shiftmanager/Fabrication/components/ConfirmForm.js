import { Modal } from 'react-bootstrap'
import React from 'react'
import { Button } from 'react-bootstrap'

export default function Prompt({open, setOpen}) {

const handleClose=()=>{
    setOpen(false)
}

let num = '1234';

  return (
    <>
      <Modal show={open}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title>Magod Production Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>   
            <p>Do you wish to shift program number No-{num} from Laser 23to Laser 27 </p>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" type='submit' >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
