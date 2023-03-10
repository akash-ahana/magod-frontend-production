import React,{useEffect, useState}from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { baseURL } from '../../../../../api/baseUrl';

export default function DeleteProcess({opendeleteprocess,setOpendeleteprocess,
  processdataList,getprocessdataList}) {

    // console.log(processdataList);
    const handleClose = () => setOpendeleteprocess(false);

    let  mach_srl=processdataList[0].Machine_srl;
    let process=processdataList[0].Mprocess;

    const deleteProcess=()=>{
      console.log(mach_srl,process)
      axios.post(
        baseURL + "/productionSetup/deleteProcessFromMachine",
        {
          Machine_srl:mach_srl,
          Mprocess:process
        }).then((response) => {
          // console.log("process delted",response.data)
          getprocessdataList(processdataList[0] .Machine_srl);
      });
    }

  return (
    <div>
      <Modal show={opendeleteprocess} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DELETE PROCESS</Modal.Title>
        </Modal.Header>

        <Modal.Body> Are you sure u want delete {processdataList[0].Mprocess}
        ({processdataList[0].RefProcess})</Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={()=>{deleteProcess()
          handleClose()}}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
