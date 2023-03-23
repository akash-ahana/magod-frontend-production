import React, {useState, useEffect, useMemo} from 'react';
import Table from "react-bootstrap/Table";
import axios from 'axios';



function MachineOperatorTable({rowselectMachineOperator,rowselectDailyShiftTable,machineOperatorTableData,
  getMachineOperatorTableData, rowSelectFun,setRowselectMachineOperator,
  selectedWeek}) {
    // console.log('PROPS FROM Machine Operators Table is ' , rowselectMachineOperator)

    // console.log(machineOperatorTableData);

       useEffect(() => {
        getMachineOperatorTableData()
       },[rowselectDailyShiftTable])

      //  useEffect(() => {
      //   getMachineOperatorTableData()
      //  },[selectedWeek])

       useMemo(()=>{
        setRowselectMachineOperator({...machineOperatorTableData[0],index:0})
      },[machineOperatorTableData[0]])


    //  console.log('rowselectMachineOperator' , rowselectMachineOperator);
    //  console.log('props.selectdata from MachineOperatorTable' , props.selectData)
    return (
        <div style={{height:"228px",overflowY:"scroll"}}>

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