import React,{useEffect, useState}from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ThirdModal from './ThirdModule';
import axios from "axios";
import {useGlobalContext} from '../../../../../Context/Context'
import { baseURL } from '../../../../../api/baseUrl';

export default function MachineModal({open,setOpen,formdata,setFormdata}) {
  // useEffect(()=>{
  //   handleC();
  // },[])

  // console.log("Im data",formdata.refName)

     const {MachineTabledata} = useGlobalContext()
     const[finalresponse,setFinalresponse]=React.useState("")
     let initialState={manufacturer:'',refName:'',model:'',machine_Type:''}
     const handleClose = () => setOpen(false);
     const[modalopen,setModalopen]=React.useState(false);

    const openThirdmodal=()=>{
      console.log(formdata)
        setModalopen(true);
        setOpen(false);
        console.log('form data when sending api request' + JSON.stringify(formdata))
        axios.post(
          baseURL+"/productionSetup/addNewMachine",
          {
          ...formdata
          }).then((response) => {
          // console.log("sent", response)
          // console.log("final response", response.data)
          setFinalresponse(response.data);  
          setFormdata(initialState);
          MachineTabledata();
        });
    }

  return (
    <div>
       {(
            <ThirdModal modalopen={modalopen}
            setModalopen={setModalopen}
            finalresponse={finalresponse}/>
        )}

{/* <Button variant="primary" >Launch demo modal</Button> */}

   {/* <div className="row justify-content-center mt-3 mb-2">
        <Button variant="primary" onClick={handleShow}>
            Save Changes
          </Button>
    </div> */}

      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Magod Production Manager</Modal.Title>
        </Modal.Header>

        <Modal.Body>Do you wish to add <b>{formdata.manufacturer}</b>,<b>{formdata.model}</b> as &nbsp;
         <b>{formdata.refName}</b>
        &nbsp; to Magod Machine List?</Modal.Body>

        <Modal.Footer>
          <Button style={{backgroundColor:"#2b3a55",border:"#2b3a55"}} onClick={()=>openThirdmodal()}>
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
