import React , {useState, useEffect,useMemo} from 'react';
import Table from "react-bootstrap/Table";
import MachineOperatorTable from './MachineOperatorTable';
import axios from "axios";
import DailyOperator from './DailyOperator';
import SingleDayShiftEditor from './SingleDayShiftEditor';

function DailyShiftTable({SingleDayShiftPlan4thTable,rowSelectFunForDailyShiftTable
,rowselectDailyShiftTable,getMachineOperatorTableData,machineOperatorTableData,
setRowselectDailyShiftTable,getSingleDayShiftPlan4thTable,getSecondTableData,selectedWeek,
rowselect}) {

    // console.log('DATA FROM Daily Shift Table' , SingleDayShiftPlan4thTable)
    // console.log('Selected Row in Daily Shift Table ' , rowselectDailyShiftTable)

    

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

      const updateShiftinstruction=()=>{
        axios.post('http://172.16.20.61:5000/shiftEditor/updateSingleDaySihiftInstructions',
         {...rowselectDailyShiftTable,
          shiftInstruction:shiftinstruction})
        .then((response) => {
          // console.log(response);
          // setWeekState1('')  
      })
      }

    //   const [machineOperatorTableData, setMachineOperatorTableData] = useState([])
    // const getMachineOperatorTableData = () => {
    //     const res =  axios.post('http://172.16.20.61:5000/shiftEditor/getMachineOperatorsShift', rowselectDailyShiftTable ).then((response) => {console.log('Api response is ' , response)
    //     if(response.data === '') {
    //         console.log('response data is null')
    //     } else {
    //         setMachineOperatorTableData(response.data)
    //     }
      
    // })
    
    //    }

//Machine Operator Table
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
        <div>
        <SingleDayShiftEditor rowselectDailyShiftTable={rowselectDailyShiftTable}
         getSingleDayShiftPlan4thTable={getSingleDayShiftPlan4thTable}
         getSecondTableData={getSecondTableData}
         selectedWeek={selectedWeek}
         rowselect={rowselect}/>    

        <DailyOperator data={rowselectDailyShiftTable}
         selectMachineOperatorData={rowselectDailyShiftTable}
         rowselectMachineOperator={rowselectMachineOperator}
         getMachineOperatorTableData={getMachineOperatorTableData}/>
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
           <th>Save Shift Instruction</th>
         </tr>
       </thead>
       {SingleDayShiftPlan4thTable.map((rank, i, row) => {
    return(
        <>
         <tbody className='tablebody'>
              <tr onClick={()=>rowSelectFunForDailyShiftTable(rank,i)} 
               className= {i=== rowselectDailyShiftTable?.index? 'selcted-row-clr':'' } >
                 {/* <td>{rank.ShiftDate}</td> */}
                 <td>{rank.Shift}</td>
                 <td>{rank.Shift_Ic}</td>
                 <td>{rank.FromTime}</td>
                 <td>{rank.ToTime}</td>
                 <td>
                 <input className='table-cell-editor '
                   name="cleared"
                   defaultValue={rank.Shift_instruction}
                   onChange={(e)=>onChangeInput(e,rank.Shift_instruction)}
                   placeholder="Type Cleared"
                  />
                 </td>
                 <td><button className="button-style group-button" style={{width:"100px"}}
                 onClick={()=>updateShiftinstruction()}
                 >Save</button></td>
             </tr>
           </tbody>
          
        </>
      )
  
})}
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