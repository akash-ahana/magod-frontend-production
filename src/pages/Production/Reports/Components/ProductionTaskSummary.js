import React from 'react'
import { Table } from 'react-bootstrap'

export default function ProductionTaskSummary() {
  return (
    <div>
      <div
      style={{maxWidth:"900px",overflowX:"scroll",height:"300px",overflowY:"scroll"}}>
      <Table striped className="table-data border"  >
       <thead className="tableHeaderBGColor">
         <tr>
           <th>Machine</th>
           <th>Task No</th>
           <th>Mtrl Code</th>
           <th>Operation</th>
           <th>Machine Time</th>
           <th>MachineTime</th>
         </tr>
       </thead>

{/* {processdataList.map((item,key)=>{
  return(
    <>
    <tbody className='tablebody'>
          <tr onClick={()=>selectedRowFn(item,key)} className={key===selectRow?.index? 'selcted-row-clr':'' }>
             <td>{item.Mprocess}</td>
             <td>{item.TgtRate}</td>
             <td>{item.Id}</td>
             <td>{item.Machine_srl}</td>
             <td>{item.RefProcess}</td>
         </tr>
    </tbody>
    </>
  )
})} */}
 </Table>
 </div>
    </div>
  )
}
