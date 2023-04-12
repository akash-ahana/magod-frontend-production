import React from 'react'
// import { Link } from 'react-router-dom';
// import { Schedulelistdata4 } from '../../ScheduleList/ScheduleListdata';
import CustomModal from '../programpath/CustomModal';
import { Table } from 'react-bootstrap'
import ProgramProcessingModal from '../programpath/ProgramProcessingModal';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TabData({machineProgramesProcessing,taskNoOnClick}) {

  const [show, setShow] = useState(false);
  const [ machineData, setMachineData] = useState([])

    // const getHeadings2 = () => {
    //     return Object.keys(Schedulelistdata4[0]);
    //   };

    const handaleClick =()=>{
       setShow(true);
    }

    const[selectProgramProcessing,setSelectProgramProcessing]=useState('');
    const programProcessing=(item,index)=>{
      let list={...item,index:index}
      // console.log("ScheduleNo",item.ScheduleNo)
      setSelectProgramProcessing(list);
    }

    // useEffect(() => {

    // })

    useEffect(()=>{
  axios.get('http://172.16.20.61:5000/shiftManagerProfile/profileMachines',)
  .then((response) => {
    console.log('Current State of programCompleteData' , response.data);
    setMachineData(response.data)
 })
},[])


  return (
    <>
    <div> 
    <div className="row mt-2">
       <button className="button-style mt-2 group-button"
          style={{ width: "150px",marginLeft:"20px" }} onClick={handaleClick}>
          Open Programs
        </button>
    </div>   

    <div className='row mt-3'>
    <div className='col-md-12 col-sm-12'>
     <div style={{height:"200px",overflowY: "scroll", width:'100%'}}>
     <Table striped className="table-data border">
       <thead className="tableHeaderBGColor">
         <tr>
           <th>Task No</th>
           <th>Machine</th>
           <th>Operation</th>
           <th>Program No</th>
           <th>Plan Time</th>
           <th>Actual Time</th>
           <th>QTY</th>
           <th>Allotted</th>
           <th>Processed</th>
         </tr>
       </thead>

       {machineProgramesProcessing && machineProgramesProcessing.map((item,key)=>{
  return(
    <>
    <tbody className='tablebody'>
          <tr style={{backgroundColor:item.rowColor}}
          onClick={()=>programProcessing(item,key)} className={key===selectProgramProcessing?.index? 'selcted-row-clr':'' } >
             <td>{item.TaskNo}</td>
             <td>{item.Machine}</td>
             <td>{item.Operation}</td>
             <td>{item.NCProgramNo}</td>
             <td>{item.EstimatedTime}</td>
             <td>{item.ActualTime}</td>
             <td>{item.Qty}</td>
             <td>{item.QtyAllotted}</td>
             <td>{item.QtyCut}</td>
         </tr>
    </tbody>
    </>
  )
})}
 </Table>
     </div>
     <ProgramProcessingModal show={show}
     setShow={setShow}
     selectProgramProcessing={selectProgramProcessing}
     machineData={machineData}
     taskNoOnClick={taskNoOnClick}
     />

 </div>
</div>



    {/* <div className="col-md-12 col-sm-12 mt-3">
      <div
        className="table-data"
        style={{overflowY: "scroll" }}>
        <Tables theadData={getHeadings2()} tbodyData={Schedulelistdata4} />
      </div>
    </div> */}
</div>

{/* {
  (
    <CustomModal 
    show={show}
     setShow={setShow}/>
  )
} */}
</>
  )
}
