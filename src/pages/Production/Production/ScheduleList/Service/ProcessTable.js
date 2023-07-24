import React,{useState,useEffect} from 'react';
import { Table } from 'react-bootstrap';


export default function ProcessTable({OrdSchNo,getprocessTabledata,processtable,
  processtableSelectFun,processrowselect}) {

 useEffect(() => {
  getprocessTabledata();
}, [OrdSchNo]);
  


  return (
     <div style={{height:"200px",overflowY: "scroll",overflowX:"scroll"}}>
     <Table striped className="table-data border">
       <thead className="tableHeaderBGColor">
         <tr>
           <th>Status</th>
           <th style={{whiteSpace:"nowrap"}}>Task No</th>
           <th>Material</th>
           <th>Process</th>
           <th style={{whiteSpace:"nowrap"}}>Estimated Time</th>
           <th style={{whiteSpace:"nowrap"}}>Time Taken</th>
           <th style={{whiteSpace:"nowrap"}}>No of Dwgs</th>
           <th style={{whiteSpace:"nowrap"}}>Dwgs Nested</th>
           <th style={{whiteSpace:"nowrap"}}>Total Parts</th>
           <th style={{whiteSpace:"nowrap"}}>Parts Nested</th>
           <th style={{whiteSpace:"nowrap"}}>No of Sheets</th>
         </tr>
       </thead>

        <tbody className='tablebody'>
        {processtable.map((item,key)=>{
      return(
        <>
         <tr onClick={()=>processtableSelectFun(item,key)} className={key===processrowselect?.index? 'selcted-row-clr':'' }>
          <td>{item.TStatus}</td>
          <td style={{whiteSpace:"nowrap"}}>{item.TaskNo}</td>
          <td style={{whiteSpace:"nowrap"}}>{item.Mtrl_Code}</td>
          <td style={{whiteSpace:"nowrap"}}>{item.MProcess}</td>
          <td style={{textAlign:"center"}}>{item.EstimatedTime}</td>
          <td style={{textAlign:"center"}}>{item.TaskProcessTime}</td>
          <td style={{textAlign:"center"}}>{item.NoOfDwgs}</td>
          <td style={{textAlign:"center"}}>{item.DwgsNested}</td>
          <td style={{textAlign:"center"}}>{item.TotalParts}</td>
          <td style={{textAlign:"center"}}>{item.PartsNested}</td>
          <td style={{textAlign:"center"}}>{item.NoOfSheets}</td>
         </tr>
         </>
      )
    })} 
   </tbody>
 </Table>
     </div>
  )
}
