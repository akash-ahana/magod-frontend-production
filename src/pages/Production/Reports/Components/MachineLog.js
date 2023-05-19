import React from 'react'
import { Table } from 'react-bootstrap'


export default function MachineLog() {
  return (
    <div >
      <div style={{marginTop:"-15px"}}>
      <button className="button-style  group-button" type='button'
              style={{ width: "150px",marginLeft:"20px" }}>
               Save Log
            </button>
            <button className="button-style group-button" type='button'
              style={{ width: "150px",marginLeft:"20px" }}>
               Print Shift Log
            </button>
      </div>
      <div className='mt-3'
      style={{maxWidth:"900px",overflowX:"scroll",height:"300px",overflowY:"scroll"}}>
      <Table striped className="table-data border"  >
       <thead className="tableHeaderBGColor">
         <tr>
           <th>Machine</th>
           <th>Shift</th>
           <th>Srl</th>
           <th>FromTime</th>
           <th>ToTime</th>
           <th>MachineTime</th>
           <th>Program</th>
           <th>Remarks</th>
           <th style={{whiteSpace:"nowrap"}}>Machine Operator</th>
           <th> Operation</th>
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
