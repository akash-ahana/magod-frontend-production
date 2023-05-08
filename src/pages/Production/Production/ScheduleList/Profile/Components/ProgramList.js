import React,{useState,useEffect} from 'react';
import { Table } from 'react-bootstrap';
import axios from "axios";
import { baseURL } from "../../../../../../api/baseUrl";


export default function ProgramList({taskno}) {
  console.log(taskno)  ;

   //Process Table(Right First table) data
   const[programlistdata,setProgramlistdata]=useState([])
   const getProgramlistdata=()=>{
    axios.post(
      baseURL + "/scheduleListProfile/schedulesListProgramList",
      {
       TaskId :taskno
      }).then((response) => {
        setProgramlistdata(response.data);
    });
   } 
   console.log(programlistdata)
 
   useEffect(() => {
    getProgramlistdata();
  }, [taskno]);
 
  return (
    <div  className='mt-4' style={{height:"200px",overflowY: "scroll"}}>
    <Table striped className="table-data border">
      <thead className="tableHeaderBGColor">
        <tr>
          <th>NCProgramNo</th>
          <th>Machine</th>
          <th>ActualTime</th>
          <th>EstmatedTime</th>
          <th>QtyAlloted</th>
          <th>QtyProcessed</th>
        </tr>
      </thead>

    <tbody className='tablebody'>
    {programlistdata.map((item,key)=>{
  return(
    <>
  <tr>
    <td style={{whiteSpace:"nowrap"}}>{item.NCProgramNo}</td>
    <td style={{whiteSpace:"nowrap"}}>{item.Machine}</td>
    <td>{item.ActualTime}</td>
    <td>{item.EstimatedTime}</td>
    <td>{item.QtyAllotted}</td>
    <td>{item.QtyCut}</td>
  </tr>
  </>
  )
})}
</tbody>
</Table>
    </div>
  )
}
