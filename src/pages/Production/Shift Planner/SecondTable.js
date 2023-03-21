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


<Table bordered style={{marginLeft:"5px",border:"1px",fontSize:"15px"}}>
       <thead style={{textAlign:"center",backgroundColor:"lightblue"}}>
         <tr>
           <th style={{width:"100px"}}>ShiftDate</th>
           <th>Shift</th>
           <th style={{width:"70px"}}>Shift_IC</th>
           <th style={{width:"100px"}}>From</th>
           <th style={{width:"100px"}}>To</th>
         </tr>
       </thead>
       {props.week.map((rank, i, row) => {
    return(
        <>
        
         <tbody className='tablebody'>
              <tr   >
                 <td>{rank.ShiftDate}</td>
                 <td>{rank.Shift}</td>
                 <td>{rank.Shift_Ic}</td>
                 <td>{rank.FromTime}</td>
                 <td>{rank.ToTime}</td>
             </tr>
           </tbody>
          
        </>
      )
  
})}
       </Table>
            
        </div>
        </div>
    );
}

export default SecondTable;