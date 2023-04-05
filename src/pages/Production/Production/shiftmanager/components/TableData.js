// import React from 'react'
// import { Table } from 'react-bootstrap'

// export default function TableData({programCompleteData}) {

//   return (
//     <div className='row mt-1'>
//     <div className='col-md-12 col-sm-12' style={{paddingRight:'462px', paddingBottom:'23px'}}>
//      <div style={{height:"150px",width:'760px',overflowY: "scroll", overflowX:'scroll'}}>
//      <Table bordered style={{border:'1px solid grey'}}>
//        <thead style={{textAlign:"center"}}>
//          <tr>
//            <th>DWG Name</th>
//            <th>Total Qty Nested</th>
//            <th>To Produce/Qty Nested</th>
//            <th>Produced</th>
//            <th>Rejected</th>
//            <th>Cleared</th>
//            <th>Remarks</th>
//          </tr>
//        </thead>

// {programCompleteData.map((item,key)=>{
//   return(
//     <>
//     <tbody className='tablebody'>
//           <tr>
//              <td>{item.DwgName}</td>
//              <td>{item.TotQtyNested}</td>
//              <td>{item.QtyNested}</td>
//              <td>{item.QtyCut}</td>
//              <td>
//              <input className='table-cell-editor '
//                    name="cleared"
//                    type='number'
//                    onKeyDown={blockInvalidChar}
//                    defaultValue={item.QtyRejected}
//                   //  onChange={(e)=>onChangeInput(e,rank.Shift_instruction)}
//                    placeholder="Type Cleared"
//                   />
//               </td>
//              <td>
//               <input className='table-cell-editor '
//                    name="cleared"
//                    type='number'
//                    onKeyDown={blockInvalidChar}
//                    defaultValue={item.QtyCleared}
//                   //  onChange={(e)=>onChangeInput(e,rank.Shift_instruction)}
//                    placeholder="Type Cleared"
//                   />
//               </td>
//              <td>
//                 <input className='table-cell-editor '
//                    name="cleared"
//                    defaultValue={item.Remarks}
//                   //  onChange={(e)=>onChangeInput(e,rank.Shift_instruction)}
//                    placeholder="Type Cleared"
//                   />
//               </td>
//          </tr>
//     </tbody>
//     </>
//   )
// })}
//  </Table>
//      </div>
//  </div>
// </div>
//   )
// }
