import React,{useEffect, useState}from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { baseURL } from '../../../../../api/baseUrl';

export default function DeleteProcess({opendeleteprocess,setOpendeleteprocess,
  processdataList,getprocessdataList,selectRow}) {
    console.log(selectRow)

    // console.log(processdataList);
    const handleClose = () => setOpendeleteprocess(false);

    let  mach_srl=selectRow.Machine_srl;
    let process=selectRow.Mprocess;

    const deleteProcess=()=>{
      console.log(mach_srl,process)
      axios.post(
        baseURL + "/productionSetup/deleteProcessFromMachine",
        {
          Machine_srl:mach_srl,
          Mprocess:process
        }).then((response) => {
          // console.log("process delted",response.data)
          getprocessdataList(selectRow.Machine_srl);
      });
    }

  return (
    <div>
      <Modal show={opendeleteprocess} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DELETE PROCESS</Modal.Title>
        </Modal.Header>

        <Modal.Body> Are you sure u want delete <b>{selectRow.Mprocess}</b>
        <b>({selectRow.RefProcess})</b> ?</Modal.Body>

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
