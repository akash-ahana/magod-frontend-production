import React , {useState, useEffect,useMemo} from 'react';
import Table from "react-bootstrap/Table";
  import MachineOperatorTable from './MachineOperatorTable';
import axios from "axios";
import DailyOperator from './DailyOperator';
import SingleDayShiftEditor from './SingleDayShiftEditor';

function DailyShiftTable(props) {

    console.log('DATA FROM Daily Shift Table' , props.data)
    const [rowselectDailyShiftTable,setRowselectDailyShiftTable]=useState({})
    const rowSelectFunForDailyShiftTable=(item,index)=>{
        let list={...props.data,index:index}
        // console.log("ScheduleNo",item.ScheduleNo)    
        //setScheduleid(item.OrdSchNo);
        setRowselectDailyShiftTable(item);
    }

    useMemo(()=>{
      rowSelectFunForDailyShiftTable({...props.data
      [0],index:0})
  },[props.data[0]])
     
    console.log('Selected Row in Daily Shift Table ' , rowselectDailyShiftTable)

    const [machineOperatorTableData, setMachineOperatorTableData] = useState([])
    const getMachineOperatorTableData = () => {

        const res =  axios.post('http://172.16.20.61:5000/shiftEditor/getMachineOperatorsShift', rowselectDailyShiftTable ).then((response) => {console.log('Api response is ' , response)
        if(response.data === '') {
            console.log('response data is null')
        } else {
            setMachineOperatorTableData(response.data)
        }
      
    })
    
       }

       useEffect(() => {
        getMachineOperatorTableData()
       },[rowselectDailyShiftTable])

      


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
       {props.data.map((rank, i, row) => {
    return(
        <>
         <tbody className='tablebody'>
              <tr onClick={()=>rowSelectFunForDailyShiftTable(rank,i)}  >
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
       <MachineOperatorTable data={machineOperatorTableData} selectData={rowselectDailyShiftTable}/>

       </div>
            
            
        </div>
    );
}

export default DailyShiftTable;