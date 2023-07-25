import React , {useState, useEffect,useMemo} from 'react';
import Table from "react-bootstrap/Table";
import MachineOperatorTable from './MachineOperatorTable';
import axios from "axios";
import DailyOperator from './DailyOperator';
import SingleDayShiftEditor from './SingleDayShiftEditor';
import { baseURL } from '../../../api/baseUrl';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function DailyShiftTable({SingleDayShiftPlan4thTable,rowSelectFunForDailyShiftTable
,rowselectDailyShiftTable,getMachineOperatorTableData,machineOperatorTableData,
setRowselectDailyShiftTable,getSingleDayShiftPlan4thTable,getSecondTableData,selectedWeek,
rowselect}) {

   
       useEffect(() => {
        getMachineOperatorTableData();
       },[rowselectDailyShiftTable]) 

      
       useMemo(()=>{
        setRowselectDailyShiftTable({...SingleDayShiftPlan4thTable
        [0],index:0})
      },[SingleDayShiftPlan4thTable[0]])

      const [shiftinstruction,setShiftinstruction]=useState('')     
       const onChangeInput = (e, Shift_instruction) => {
        const { name, value } = e.target
        setShiftinstruction(value);
        // console.log('value', value)
      
        // const editData =rowselectDailyShiftTable.map((item) =>
        //   item.Shift_instruction === Shift_instruction && name ? { ...item, [name]: value } : item
        // )
        // setRowselectDailyShiftTable(editData);
      }

      const updateShiftinstruction = () => {
        // Check if the shift instruction is null or empty
        if (!shiftinstruction || shiftinstruction.trim() === "") {
          toast.error('Shift Instructions cannot be empty!', {
            position: toast.POSITION.TOP_CENTER
          });
        } else {
          axios.post(baseURL + '/shiftEditor/updateSingleDaySihiftInstructions', {
              ...rowselectDailyShiftTable,
              shiftInstruction: shiftinstruction
            })
            .then((response) => {
              toast.success('Shift Instructions Saved', {
                position: toast.POSITION.TOP_CENTER
              });
            })
            .catch((error) => {
              toast.error('An error occurred while saving Shift Instructions', {
                position: toast.POSITION.TOP_CENTER
              });
            });
        }
      };

//Machine Operator Table Rowselect
const [rowselectMachineOperator,setRowselectMachineOperator]=useState({})
const rowSelectFun=(item,index)=>{
  let list={...item,index:index}
console.log("ScheduleNo",item.ScheduleNo)
// setScheduleid(item.OrdSchNo);
 setRowselectMachineOperator(list);
}

// console.log(rowselectMachineOperator);
    return (
        
        <div style={{display:"flex"}}>
                  <ToastContainer/>
        <div>
        <SingleDayShiftEditor rowselectDailyShiftTable={rowselectDailyShiftTable}
         getSingleDayShiftPlan4thTable={getSingleDayShiftPlan4thTable}
         getSecondTableData={getSecondTableData}
         selectedWeek={selectedWeek}
         rowselect={rowselect}
         rowSelectFunForDailyShiftTable={rowSelectFunForDailyShiftTable}/>    

        <DailyOperator data={rowselectDailyShiftTable}
         selectMachineOperatorData={rowselectDailyShiftTable}
         rowselectMachineOperator={rowselectMachineOperator}
         getMachineOperatorTableData={getMachineOperatorTableData}/>
        </div>
         
 <div >
 <div style={{marginTop:"23px",width:"300px",height:"385px",fontSize:"15px",
 overflowX: "scroll",overflowY: "scroll"}}>
<Table striped className="table-data border" style={{marginLeft:"5px",border:"1px"}}>
       <thead className="tableHeaderBGColor">
         <tr>
           <th>Shift</th>
           <th>Incharge</th>
           <th style={{whiteSpace:"nowrap"}}>From</th>
           <th style={{whiteSpace:"nowrap"}} >To Time</th>
           <th style={{whiteSpace:"nowrap"}}>Shift Instructions</th>
           <th style={{whiteSpace:"nowrap"}}>Save Shift Instruction</th>
         </tr>
       </thead>
      
         <tbody className='tablebody'>  
       {SingleDayShiftPlan4thTable.map((rank, i, row) => {
    return(
        <>
              <tr onClick={()=>rowSelectFunForDailyShiftTable(rank,i)} 
               className= {i=== rowselectDailyShiftTable?.index? 'selcted-row-clr':'' } >
                 <td style={{whiteSpace:"nowrap"}}>{rank.Shift}</td>
                 <td style={{whiteSpace:"nowrap"}}>{rank.Shift_Ic}</td>
                 <td style={{whiteSpace:"nowrap"}}>{rank.FromTime}</td>
                 <td style={{whiteSpace:"nowrap"}}>{rank.ToTime}</td>
                 <td style={{whiteSpace:"nowrap"}}>
                 <input className='table-cell-editor '
                   name="cleared"
                   defaultValue={rank.Shift_instruction}
                   onChange={(e)=>onChangeInput(e,rank.Shift_instruction)}
                   placeholder="Type Cleared"
                  />
                 </td>
                 <td style={{whiteSpace:"nowrap"}}><button className="button-style group-button" style={{width:"100px"}}
                 onClick={()=>updateShiftinstruction()}
                 >Save</button></td>
             </tr>       
        </>
      )
})}
           </tbody>
       </Table>
       </div>
       <MachineOperatorTable
        rowselectDailyShiftTable={rowselectDailyShiftTable}
        rowselectMachineOperator={rowselectMachineOperator}
        setRowselectMachineOperator={setRowselectMachineOperator}
        rowSelectFun={rowSelectFun}
        machineOperatorTableData={machineOperatorTableData}
        // setMachineOperatorTableData={setMachineOperatorTableData}
        getMachineOperatorTableData={getMachineOperatorTableData}
        selectedWeek={selectedWeek}/>

       </div>   
        </div>
    );
}

export default DailyShiftTable;