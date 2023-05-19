import axios from 'axios';
import React, { useState,useMemo, useEffect } from 'react';
import Table from "react-bootstrap/Table";

export default function ProcessTable({selectedRowFun,selectRow,processdataList}) {
  // const [refprocess,setRefprocess]=useState({...processdataList})

console.log(selectRow)
//  console.log(processdataList)
  return (
    <div className='row mt-1'>
    <div className='col-md-12 col-sm-12'>
     <div style={{height:"200px",overflowY: "scroll",maxWidth:"850px",marginLeft:"-10px"}}>
     <Table  striped className="table-data border">
       <thead className="tableHeaderBGColor">
         <tr>
           <th>Process</th>
           <th>TgtRate</th>
           <th>Id</th>
           <th>Machine_srl</th>
           <th>refProcess</th>
         </tr>
       </thead>


    <tbody className='tablebody'>
    {processdataList.map((item,key)=>{
  return(
    <>
          <tr onClick={()=>selectedRowFun(item,key)} className={key===selectRow?.index? 'selcted-row-clr':'' }>
             <td style={{whiteSpace:"nowrap"}}>{item.Mprocess}</td>
             <td>{item.TgtRate}</td>
             <td>{item.Id}</td>
             <td>{item.Machine_srl}</td>
             <td style={{whiteSpace:"nowrap"}}>{item.RefProcess}</td>
         </tr>
         </>
  )
})}
       </tbody>
   
 </Table>
     </div>
 </div>
</div>
  )
}
