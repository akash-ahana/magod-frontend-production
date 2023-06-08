import React from 'react'
import { Table } from 'react-bootstrap'

export default function MachineUtilisationSummary() {
  return (
    <div className='col-md-12'>
    <div className='row'>
      <div className='col-md-4' style={{fontSize:"13px"}}>
         <p><b>Machine Name</b></p>
         <p><b>Total On 1440</b></p>
         <p>Production  135</p>
         <p>Non Production 1305</p>

        <div  className='row' >
          <div className='col-md-4'style={{marginLeft:"-20px"}}>
              <label>Total Off</label>
          </div>
          <div className='col-md-4' style={{marginLeft:"-20px"}}>
              <input></input>
          </div><div className='col-md-4'>
          <button className="button-style  group-button" type='button'
              style={{ width: "120px",marginTop:"-20px",marginLeft:"-10px"}}>
               Update Production
            </button>
          </div>
        </div> 

        <div  className='row mt-4'>
          <div className='col-md-4' style={{marginLeft:"-20px"}}>
              <label>Laser ON</label>
          </div>
          <div className='col-md-4' style={{marginLeft:"-20px"}}>
              <input></input>
          </div><div className='col-md-4'>
          <button className="button-style  group-button" type='button'
              style={{ width: "120px",marginTop:"-10px",marginLeft:"-10px"}}>
              Save
            </button>
          </div>
        </div>

        

      </div>
      <div className='col-md-8'>
      <div style={{maxWidth:"800px",overflowX:"scroll",height:"300px",overflowY:"scroll"}}>
      <Table striped className="table-data border"  >
       <thead className="tableHeaderBGColor">
         <tr>
           <th>Machine</th>
           <th>TotalOn</th>
           <th>TotalCft</th>
           <th>ProtOn</th>
           <th>Noof</th>
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
    </div>
    </div>
  )
}
