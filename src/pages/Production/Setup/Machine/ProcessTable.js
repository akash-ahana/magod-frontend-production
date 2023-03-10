import axios from 'axios';
import React, { useState,useMemo, useEffect } from 'react';
import Table from "react-bootstrap/Table";

export default function ProcessTable({selectedRowFun,selectRow,processdataList}) {
  // const [refprocess,setRefprocess]=useState({...processdataList})


//  console.log(processdataList)
  return (
    <div className='row mt-1'>
    <div className='col-md-12 col-sm-12'>
     <div style={{height:"200px",overflowY: "scroll"}}>
     <Table bordered>
       <thead style={{textAlign:"center"}}>
         <tr>
           <th>Process</th>
           <th>TgtRate</th>
           <th>Id</th>
           <th>Machine_srl</th>
           <th>refProcess</th>
         </tr>
       </thead>

{processdataList.map((item,key)=>{
  return(
    <>
    <tbody className='tablebody'>
          <tr onClick={()=>selectedRowFun(item,key)} className={key===selectRow?.index? 'selcted-row-clr':'' }>
             <td>{item.Mprocess}</td>
             <td>{item.TgtRate}</td>
             <td>{item.Id}</td>
             <td>{item.Machine_srl}</td>
             <td>{item.RefProcess}</td>
         </tr>
       </tbody>
    </>
  )
})}
 </Table>
     </div>
 </div>
</div>
  )
}
