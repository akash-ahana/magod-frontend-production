import React,{useState,useEffect}from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useGlobalContext } from '../../../../../Context/Context';
import { baseURL } from '../../../../../api/baseUrl';

export default function AlertAddprocess({alert,setAlert,processform,
  setProcessform,selectedRow,getprocessdataList}) {
  let addprocessState={RefProcess:'',TgtRate:'',Machine_srl:'',Mprocess:''}


    const submitProcessform = () => {
      setAlert(false)
      axios.post(
        baseURL + "/productionSetup/addProcessToMachine",
        {
        ...processform
        }).then((response) => {
        console.log("sent", response)
        console.log("final response", response.data);
        console.log(selectedRow)
        getprocessdataList(selectedRow.Machine_srl);
        setProcessform(addprocessState)
      });
    };

  return (
    <div>
      <Modal show={alert}>
        <Modal.Header closeButton>
          <Modal.Title>Magod Production Manager </Modal.Title>
        </Modal.Header>

        <Modal.Body> Do you wish to add {processform.RefProcess},({processform.Mprocess}) with Target Rate 
         {processform.TgtRate} / hour  to {selectedRow.refName} 
      
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={()=>submitProcessform()}>
           OK
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
