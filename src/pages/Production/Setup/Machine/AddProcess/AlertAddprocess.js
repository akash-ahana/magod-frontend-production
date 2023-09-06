import React,{useState,useEffect}from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useGlobalContext } from '../../../../../Context/Context';
import { baseURL } from '../../../../../api/baseUrl';

export default function AlertAddprocess({alert,setAlert,processform,
  setProcessform,selectedRow,getprocessdataList,submitProcessform}) {
  let addprocessState={RefProcess:'',TgtRate:'',Machine_srl:'',Mprocess:''}

  const handleClose=()=>{
    setAlert(false);
    console.log(processform)
    // processform.reset();
  }

    

  return (
    <div>
      <Modal show={alert} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Magod Production Manager </Modal.Title>
        </Modal.Header>

        <Modal.Body> Are You sure you want add <b>{processform.RefProcess}</b>(<b>{processform.Mprocess}</b>) with Target Rate &nbsp;
         <b>{processform.TgtRate}</b>/hour to <b>{selectedRow.refName}?</b>
      
        </Modal.Body>

        <Modal.Footer>
          <Button style={{backgroundColor:"#2b3a55",border:"#2b3a55"}} onClick={()=>submitProcessform()}>
           Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>No</Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
