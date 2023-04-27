import React,{useState, useEffect} from 'react' 
import {Modal } from 'react-bootstrap';
import { Table } from 'react-bootstrap'
import axios from "axios";


export default function ProgramCompletedModal({show, setShow,selectProgramCompleted,taskNoOnClick,MachineOnClick,setSelectProgramCompleted
}) {
  const blockInvalidChar = e => ['e', 'E', '+', '-','.'].includes(e.key) && e.preventDefault();

  const[programCompleteData,setProgramCompleteData]=useState([]);
  const[newprogramCompleteData,setNewProgramCompleteData]=useState([]);

  const [fullscreen, setFullscreen] = useState(true);

  const[newpartlistdata,setNewPartlistdata]=useState([])

  const modalTable=()=>{
    axios.post('http://172.16.20.61:5000/shiftManagerProfile/shiftManagerncProgramTaskList',
    {...selectProgramCompleted})
   .then((response) => {
     console.log(response.data);
     setProgramCompleteData(response.data)
 })
  }
  
  useEffect(() => {
    modalTable();
  }, [selectProgramCompleted])

  const handleClose = () => setShow(false);

  //console.log(programCompleteData);



  const clearAllButton = () => {
    console.log('Clear All button Clicked' , programCompleteData)
    const constProgramCompleteData = programCompleteData;
    console.log('Const Program Complete Data is ' , constProgramCompleteData)
    //console.log('TYPE OF' , typeof(constProgramCompleteData[0].QtyCleared))
    for(let i =0 ; i<constProgramCompleteData.length ; i++) {
      constProgramCompleteData[i].QtyCleared = constProgramCompleteData[i].QtyCut - constProgramCompleteData[i].QtyRejected
    }
    console.log('Updated Const Program Complete Data is ' , constProgramCompleteData)
    // setProgramCompleteData(constProgramCompleteData)
    //setProgramCompleteData([])
    setProgramCompleteData(constProgramCompleteData)
    setNewProgramCompleteData(constProgramCompleteData)
    setNewPartlistdata(constProgramCompleteData)
    setProgramCompleteData(constProgramCompleteData)
    setNewProgramCompleteData(constProgramCompleteData)
    //modalTable();

    axios.post('http://172.16.20.61:5000/shiftManagerProfile/shiftManagerCloseProgram',
    programCompleteData)
   .then((response) => {
     console.log('Current State of programCompleteData' , response.data);
     //setProgramCompleteData(response.data)
 })
  }

  

  const onChangeRejected = (e, item, key) => {
    console.log("onChange Rejected" , "e is " , e.target.value, " item is " , item, " key is " , key)
    const newconstprogramCompleteData = programCompleteData
    newconstprogramCompleteData[key].QtyRejected = Number(e.target.value)
    //newconstprogramCompleteData[key].QtyCleared = Number(0)
    console.log('NEW CONST PROGRAM COMPLETE DATA IS ' , newconstprogramCompleteData)
    setProgramCompleteData(newconstprogramCompleteData)
    setNewProgramCompleteData(newconstprogramCompleteData)
    
  }

  const onClickCloseProgram = () => {
    console.log('Close Program button is clicked')
    axios.post('http://172.16.20.61:5000/shiftManagerProfile/CloseProgram',
    selectProgramCompleted)
   .then((response) => {
     console.log('Response of Api' , response.data)
     console.log('current State of Program Complete data is ' , selectProgramCompleted)
     const constSelectProgramCompleted = selectProgramCompleted;
     constSelectProgramCompleted.PStatus = 'Closed'
     setSelectProgramCompleted(constSelectProgramCompleted)
    
     //setProgramCompleteData(response.data);
     taskNoOnClick();
     MachineOnClick();
 })
  }
  //console.log(newprogramCompleteData , 'After Updating newprogramCompleteData')  
  console.log(programCompleteData , 'After Updating')  
  const onChangeCleared = (e, item, key) => {
    console.log(" On CHANGE CLEARED " , " e.target.value is " , e.target.value, " item is " , item, " key is " , key)
    // //item is not required , e.target.value contains the entered value in the input box, and key contains the index of the array
    // console.log(' PART LIST IS ' , partlistdata)
     const newconstprogramCompleteData = programCompleteData
    // if(e.target.value <= newconstprogramCompleteData[key].QtyProduced) {
       newconstprogramCompleteData[key].QtyCleared = Number(e.target.value)
    // }
    setProgramCompleteData(newconstprogramCompleteData)
    setNewProgramCompleteData(newconstprogramCompleteData)
     console.log('NEW CONST PROGRAM COMPLETE DATA IS ' , newconstprogramCompleteData)
     setNewProgramCompleteData(newconstprogramCompleteData)
    
     setNewPartlistdata(newconstprogramCompleteData)
  }

  const onChangeRemarks = (e,item, key) => {
    console.log(" On CHANGE REMARKS" , " e.target.value is " , e.target.value, " item is " , item, " key is " , key)
    const newconstprogramCompleteData = programCompleteData
    newconstprogramCompleteData[key].Remarks= e.target.value
    setProgramCompleteData(newconstprogramCompleteData)
    setNewProgramCompleteData(newconstprogramCompleteData)
  }



return (
  <div>
    <Modal size='lg' show={show} fullscreen={fullscreen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Program Parts Inspection Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="col-md-12 col-sm-12">
        <div className="ip-box form-bg ">
          <div className="row">
            <div className="col-md-3">
              <label className="form-label"> Task no</label>
              <input  className='in-field'
              value={selectProgramCompleted.TaskNo}/>
            </div>
            <div className="col-md-2">
              <label className="form-label"> Quantity</label>
              <input  className='in-field'
              value={selectProgramCompleted.Qty} />
            </div>
            <div className="col-md-5">
              <label className="form-label"> Material</label>
              <input  className='in-field'
              value={selectProgramCompleted.Mtrl_Code} />
            </div>

            <div className="col-md-3">
              <label className="form-label"> Program no</label>
              <input  className='in-field'
              value={selectProgramCompleted.NCProgramNo} />
            </div>

            <div className="col-md-2">
              <label className="form-label">Alloted</label>
              <input  className='in-field'
              value={selectProgramCompleted.QtyAllotted} />
            </div>

            <div className="col-md-2">
               <label className="form-label">Process</label>
               <input  className='in-field'
               value={selectProgramCompleted.MProcess} />
            </div>

            <div className="col-md-3">
               <label className="form-label">Status</label>
               <input  className='in-field'
                value={selectProgramCompleted.PStatus} />
            </div>

            <div className="col-md-3">
               <label className="form-label">Machine</label>
               <input  className='in-field' 
               value={selectProgramCompleted.Machine}/>
            </div>

            <div className="col-md-2">
               <label className="form-label">Processed</label>
               <input  className='in-field'
               value={selectProgramCompleted.QtyCut} />
            </div>

            <div className="col-md-2">
               <label className="form-label">Dwgs</label>
               <input  className='in-field'
               value={selectProgramCompleted.NoOfDwgs} />
            </div>

            <div className="col-md-3">
               <label className="form-label">Parts</label>
               <input  className='in-field' 
               value={selectProgramCompleted.TotalParts
               }/>
            </div>

            

           {/* <div className='row'> */}
           <div className="col-md-3">
               <label className="form-label">Process Time</label>
               <input  className='in-field'
               value={selectProgramCompleted.ActualTime
               } />
            </div>

            <div className="col-md-2">
               <label className="form-label">Estimated</label>
               <input  className='in-field'
               value={selectProgramCompleted.EstimatedTime
               } />
            </div>

            <div className="col-md-2 mb-2">
               <label className="form-label">Machine</label>
               <input  className='in-field' 
               value={selectProgramCompleted.Machine}/>
            </div>

            <div className="col-md-2  mt-4">
            <button className="button-style mt-3 group-button ms-2"
          style={{ width:"120px"}}  onClick = {clearAllButton}>
          Clear Parts 
        </button>
            </div>

            <div className="col-md-2 mt-4 " style={{marginLeft:"-50px"}}>
            <button style={{ width:"120px"}} className="button-style mt-3 group-button"
             onClick={onClickCloseProgram}>
             Close Program
            </button>
            </div>

           {/* </div> */}
          </div>
        </div>
      </div>

      <div className='row mt-2'>
  <div className='col-md-12 col-sm-12' style={{marginLeft:"-12px"}}>
   <div style={{height:"250px",width:'100%',overflowY: "scroll", overflowX:'scroll'}}>
   <Table striped className="table-data border">
     <thead className="tableHeaderBGColor">
       <tr>
         <th>DWG Name</th>
         <th>Total Qty Nested</th>
         <th>To Produce/Qty Nested</th>
         <th>Produced</th>
         <th>Rejected</th>
         <th>Cleared</th>
         
         <th>Remarks</th>
       </tr>
     </thead>


  
  <tbody className='tablebody'>
  { programCompleteData.map((item,key)=>{
return(
  <>
        <tr >
           <td>{item.DwgName}</td>
           <td>{item.TotQtyNested}</td>
           <td>{item.QtyNested}</td>
           <td>{item.QtyCut}</td>
           <td >
            <div key={item.QtyRejected}>
           <input className='table-cell-editor '
                 name="cleared"
                 type='number'
                 onKeyDown={blockInvalidChar}
                 defaultValue={item.QtyRejected}
                 onChange={(e)=>onChangeRejected(e,  item, key)}
                 placeholder="Type Cleared"
                />
                </div>
            </td>
           <td>

          <div key={item.QtyCleared || item.QtyRejected} >
          <input className='table-cell-editor '
         name="cleared"
         defaultValue={item.QtyCleared}
         //value = {item.QtyCleared}
         key={`cleared:${item.QtyCleared || "default"}`}
         //key={"OKAYG_" + (10000 + Math.random() * (1000000 - 10000))}
         type="number"
         onChange={(e)=>onChangeCleared(e,  item, key)}
         placeholder="Type Cleared"
       />
          </div>
          {/* <td>{item.QtyCleared}</td> */}
          
          
            
            
            </td>
           <td>
              <input className='table-cell-editor '
                 name="cleared"
                 defaultValue={item.Remarks}
                  onChange={(e)=>onChangeRemarks(e,item, key)}
                 placeholder="Type Cleared"
                />
            </td>
            {/* <td >
              <div key={item.QtyCleared}>
              {item.QtyCleared}
                </div></td> */}
       </tr>
       </>
)
})}
  </tbody>
</Table>
   </div>
</div>
</div>
      </Modal.Body>
    </Modal>
  </div>
)
}