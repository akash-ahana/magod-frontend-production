import React, {useState, useEffect} from 'react';
import Table from "react-bootstrap/Table";
import axios from 'axios';



function MachineOperatorTable({rowselectMachineOperator,rowselectDailyShiftTable,machineOperatorTableData,
  setMachineOperatorTableData,getMachineOperatorTableData, rowSelectFun}) {
    console.log('PROPS FROM Machine Operators Table is ' , rowselectMachineOperator)

    
       useEffect(() => {
        getMachineOperatorTableData()
       },[rowselectDailyShiftTable])


     console.log('rowselectMachineOperator' , rowselectMachineOperator);
    //  console.log('props.selectdata from MachineOperatorTable' , props.selectData)
    return (
        <div style={{height:"240px",overflowY:"scroll"}}>

<Table bordered style={{border:"1px",marginLeft:"5px",fontSize:"15px"}}>
       <thead style={{textAlign:"center",backgroundColor:"lightblue"}}>
         <tr>
           <th>Machine</th>
           <th>Operator</th>
           
         </tr>
       </thead>
       {machineOperatorTableData.map((rank, i, row) => {
    return(
        <>
         <tbody className='tablebody'>
              <tr onClick={()=>rowSelectFun(rank,i)}  
              className= {i=== rowselectMachineOperator?.index? 'selcted-row-clr':'' } >
                 {/* <td>{rank.ShiftDate}</td> */}
                 <td>{rank.Machine}</td>
                 <td>{rank.Operator}</td>
                
             </tr>
           </tbody>
          
        </>
      )
  
})}


       </Table>
            
        </div>
    );
}

export default MachineOperatorTable;