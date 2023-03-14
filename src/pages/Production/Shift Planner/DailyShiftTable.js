import React , {useState, useEffect,useMemo} from 'react';
import Table from "react-bootstrap/Table";
  import MachineOperatorTable from './MachineOperatorTable';
import axios from "axios";
import DailyOperator from './DailyOperator';
import SingleDayShiftEditor from './SingleDayShiftEditor';

function DailyShiftTable({SingleDayShiftPlan4thTable,rowSelectFunForDailyShiftTable
,rowselectDailyShiftTable,getMachineOperatorTableData,machineOperatorTableData}) {

    console.log('DATA FROM Daily Shift Table' , SingleDayShiftPlan4thTable)
    
    console.log('Selected Row in Daily Shift Table ' , rowselectDailyShiftTable)

    

       useEffect(() => {
        getMachineOperatorTableData();
       },[rowselectDailyShiftTable]) 

      
       useMemo(()=>{
        rowSelectFunForDailyShiftTable({...SingleDayShiftPlan4thTable
        [0],index:0})
      },[SingleDayShiftPlan4thTable[0]])

    return (
        
        <div style={{display:"flex"}}>
        <div>
        <SingleDayShiftEditor data={rowselectDailyShiftTable}/>    
        <DailyOperator data={rowselectDailyShiftTable}/>
        </div>
         
 <div >
 <div style={{marginTop:"23px",width:"300px",height:"385px",fontSize:"15px",overflowX: "scroll",overflowY: "scroll"}}>
<Table bordered style={{marginLeft:"5px",border:"1px"}}>
       <thead style={{textAlign:"center",backgroundColor:"lightblue"}}>
         <tr>
           <th>Shift</th>
           <th>Shift Inchare</th>
           <th >From</th>
           <th >To Time</th>
           <th>Shift Instructions</th>
         </tr>
       </thead>
       {SingleDayShiftPlan4thTable.map((rank, i, row) => {
    return(
        <>
         <tbody className='tablebody'>
              <tr onClick={()=>rowSelectFunForDailyShiftTable(rank,i)}  className={i===rowselectDailyShiftTable?.index? 'selcted-row-clr':'' } >
                 {/* <td>{rank.ShiftDate}</td> */}
                 <td>{rank.Shift}</td>
                 <td>{rank.Shift_Ic}</td>
                 <td>{rank.FromTime}</td>
                 <td>{rank.ToTime}</td>
                 <td>{rank.Shift_instruction}</td>
             </tr>
           </tbody>
          
        </>
      )
  
})}
       </Table>
       </div>
       <MachineOperatorTable data={machineOperatorTableData}
        selectData={rowselectDailyShiftTable}/>

       </div>
            
            
        </div>
    );
}

export default DailyShiftTable;