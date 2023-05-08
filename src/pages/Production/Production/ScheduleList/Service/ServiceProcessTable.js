import React,{useState,useEffect} from 'react';
import { Table } from 'react-bootstrap';


export default function ProcessTable({scheduleid,getprocessTabledata,processtable,
  serviceprocesstableSelectFun,serviceprocessrowselect}) {

 useEffect(() => {
  getprocessTabledata();
}, [scheduleid]);
  


  return (
     <div style={{height:"200px",overflowY: "scroll"}}>
     <Table striped className="table-data border">
       <thead className="tableHeaderBGColor">
         <tr>
           <th>Status</th>
           <th style={{whiteSpace:"nowrap"}}>Task No</th>
           <th>Material</th>
           <th>Process</th>
           <th style={{whiteSpace:"nowrap"}}>Estm Time</th>
           <th style={{whiteSpace:"nowrap"}}>Time Taken</th>
           <th style={{whiteSpace:"nowrap"}}>No of Dwgs</th>
           <th style={{whiteSpace:"nowrap"}}>Dwgs Nested</th>
           <th style={{whiteSpace:"nowrap"}}>Total Parts</th>
           <th style={{whiteSpace:"nowrap"}}>Parts Nested</th>
           <th style={{whiteSpace:"nowrap"}}>No of Sheets</th>
         </tr>
       </thead>

        {processtable.map((item,key)=>{
      return(
        <>
        <tbody className='tablebody'>
         <tr onClick={()=>serviceprocesstableSelectFun(item,key)} className={key===serviceprocessrowselect?.index? 'selcted-row-clr':'' }>
          <td>{item.Schedule_Status}</td>
          <td style={{whiteSpace:"nowrap"}}>{item.TaskNo}</td>
          <td style={{whiteSpace:"nowrap"}}>{item.Mtrl_Code}</td>
          <td style={{whiteSpace:"nowrap"}}>{item.Mprocess}</td>
          <td>{item.EstimatedTime}</td>
          <td>{item.TaskProcessTime}</td>
          <td>{item.DwgsNested}</td>
          <td>{item.DwgsNested}</td>
          <td>{item.TotalParts}</td>
          <td>{item.PartsNested}</td>
          <td>{item.NoOfSheets}</td>
         </tr>
   </tbody>
        </>
      )
    })} 
 </Table>
     </div>
  )
}
