import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useState } from 'react';

export default function Popup({openChnageMachine,setOpenChangeMachine,selectProgramProcessing,
   machineData,setSelectProgramProcessing}) {
console.log(selectProgramProcessing)
console.log('MACHINE DATA' , machineData[0].refName)
const [selectedMachine, setSelectedMachine] = useState("")

const handleClose = ()=>{
  setOpenChangeMachine(false);
}

const[changeMachineList,setChangeMachineList]=useState([])
const handleMachineChange = (e) => {
  setChangeMachineList(e.target.value);
  setSelectedMachine(e.target.value)
};


const changeMachineonClick = () => {
  axios.post('http://172.16.20.61:5000/shiftManagerProfile/changeMachine',{...selectProgramProcessing ,  NewMachine : selectedMachine })
  .then((response) => {
    console.log('Current State of programCompleteData' , response.data);
    handleClose();
     const constSelectProgramCompleted = selectProgramProcessing;
     constSelectProgramCompleted.Machine = selectedMachine;
     setSelectProgramProcessing(constSelectProgramCompleted)
    // taskNoOnClick();
 })
}

  return (
    <>
    <Modal show={openChnageMachine} size='lg'>
    <div 
    className="modal show"
    style={{ display: 'block', position: 'initial'}}
  >
    
    <Modal.Header closeButton  onClick={handleClose}>
          <Modal.Title>Machine Selection Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="col-md-12 col-sm-12">
          <div className="ip-box form-bg ">
            <div className="row">

              <div className="col-md-6">
                <label className="">Program No</label>
                <input  className='in-field'
                value={selectProgramProcessing.NCProgramNo} />
              </div>

              <div className="col-md-6">
                <label className="">Machine</label>
                <input  className='in-field' 
                 value={selectProgramProcessing.Machine}/>
              </div>

              <div className="col-md-6 mt-1">
                <label className="">Material</label>
                <input  className='in-field'
                 value={selectProgramProcessing.Mtrl_Code} />
              </div>
          
              <div className="col-md-6 mb-3">
                 <label className="form-label">Change To</label>
                 <select className='ip-select' onChange={handleMachineChange}>
                    <option selected>Select Machine</option>
                    
                    {machineData.map((machineData) => (
                      <option value={machineData.refName}>{machineData.refName}</option>
                    ))}
                    
                  </select>
              </div>
              
              <div className="col-md-6">
                <label className="">Process</label>
                <input  className='in-field'
                 value={selectProgramProcessing.MProcess} />
              </div>

             <div className="col-md-5 mt-3">
              <Button variant="secondary" onClick={changeMachineonClick}>
              Change Machine
              </Button> 
            </div> 

              <div className="col-md-6 mb-3">
                <label className="">Status</label>
                <input  className='in-field'
                 value={selectProgramProcessing.PStatus} />
              </div>  
            </div>
          </div>
        </div>
        </Modal.Body>
  </div>
  </Modal>

  </>
  )
}


