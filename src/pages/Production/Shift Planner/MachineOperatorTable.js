import React, {useState, useEffect} from 'react';
import Table from "react-bootstrap/Table";
import axios from 'axios';



function MachineOperatorTable(props) {
    console.log('PROPS FROM Machine Operators Table is ' , props.data)

    const [machineOperatorTableData, setMachineOperatorTableData] = useState([])
    const getMachineOperatorTableData = () => {

        const res =  axios.post('http://172.16.20.61:5000/shiftEditor/getMachineOperatorsShift', props.selectData ).then((response) => {console.log('Api response is ' , response)
        if(response.data === '') {
            console.log('response data is null')
        } else {
            setMachineOperatorTableData(response.data)
        }
      
    })
    
       }

       useEffect(() => {
        getMachineOperatorTableData()
       },[props.selectData])

    const [rowselectMachineOperator,setRowselectMachineOperator]=useState({})
    // const rowSelectFun=(item,index)=>{let list={...schedulelistdata,index:index}
    // // console.log("ScheduleNo",item.ScheduleNo)   
    // // setScheduleid(item.OrdSchNo);
    //  setRowselectMachineOperator(list);}

     console.log('rowselectMachineOperator' , rowselectMachineOperator);
     console.log('props.selectdata from MachineOperatorTable' , props.selectData)
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
              <tr onClick={()=>setRowselectMachineOperator(rank,i)}  >
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