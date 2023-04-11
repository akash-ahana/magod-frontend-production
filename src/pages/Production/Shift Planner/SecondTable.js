import React, { useEffect, useState } from 'react';
import Table from "react-bootstrap/Table";
import axios from "axios";

// useEffect( () => {
// console.log('props from second table' , props)
// },[])



function SecondTable(props) {
    //  console.log('secondTableShiftState in second TABLE 1' , props.week)
    return (
        <div style={{width:"430px",height:"610px",overflowX: "scroll",overflowY: "scroll",marginTop:"24px"}}>
        <div>


<Table striped className="table-data border" style={{marginLeft:"5px",border:"1px"}}>
       <thead className="tableHeaderBGColor">
         <tr>
           <th style={{width:"100px"}}>ShiftDate</th>
           <th>Shift</th>
           <th style={{width:"70px"}}>Shift IC</th>
           <th style={{width:"100px"}}>From</th>
           <th style={{width:"100px"}}>To</th>
         </tr>
       </thead>

     
        
         <tbody className='tablebody'>
         {props.week.map((rank, i, row) => {
    return(
        <>
              <tr   >
                 <td>{rank.ShiftDate}</td>
                 <td>{rank.Shift}</td>
                 <td>{rank.Shift_Ic}</td>
                 <td>{rank.FromTime}</td>
                 <td>{rank.ToTime}</td>
             </tr>      
        </>
      )
})}
           </tbody>
       </Table>
            
        </div>
        </div>
    );
}

export default SecondTable;