import React, {useState} from 'react';
import Table from "react-bootstrap/Table";



function MachineOperatorTable(props) {
    console.log('PROPS FROM Machine Operators Table is ' , props.data)

    const [rowselectMachineOperator,setRowselectMachineOperator]=useState({})
    // const rowSelectFun=(item,index)=>{let list={...schedulelistdata,index:index}
    // // console.log("ScheduleNo",item.ScheduleNo)   
    // // setScheduleid(item.OrdSchNo);
    //  setRowselectMachineOperator(list);}

     console.log('rowselectMachineOperator' , rowselectMachineOperator);
    return (
        <div style={{height:"228px",overflowY:"scroll"}}>

<Table bordered style={{border:"1px",marginLeft:"5px",fontSize:"15px"}}>
       <thead style={{textAlign:"center",backgroundColor:"lightblue"}}>
         <tr>
           <th>Machine</th>
           <th>Operator</th>
           
         </tr>
       </thead>
       {props.data.map((rank, i, row) => {
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