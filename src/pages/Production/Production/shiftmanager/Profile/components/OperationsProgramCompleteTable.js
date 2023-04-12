import React,{useState} from 'react'
import { Table } from 'react-bootstrap'
import ProgramCompletedModal from '../programpath/ProgramCompletedModal';
import axios from "axios";
import OperationsCompleteOpenProgram from '../programpath/OperationsCompletedOpenProgram';


export default function OperationsProgramCompleteTable({proramCompleted,onClickOperation,onClickProgram,onClickMachine}) {

    const [show, setShow] = useState(false);

    const handaleClick =()=>{
        setShow(true);
     }

    //  let difference = [];
    //  for (let i = 0; i < machineProgramesCompleted.length; i++) {
    //   difference[i] = machineProgramesCompleted[i].ActualTime - machineProgramesCompleted[i].EstimatedTime;
    //  }
     
    //  console.log(difference);
     
    
      
     const[selectProgramCompleted,setSelectProgramCompleted]=useState('');
     const programCompleted=(item,index)=>{
      let list={...item,index:index}
      setSelectProgramCompleted(list);
    }

    // const[programCompleteData,setProgramCompleteData]=useState([])
    // const SelectedRow=()=>{
    //   axios.post('http://172.16.20.61:5000/shiftManagerProfile/shiftManagerncProgramTaskList',
    //    {...selectProgramCompleted})
    //   .then((response) => {
    //     console.log(response.data);
    //     setProgramCompleteData(response.data)
    // })
    // }

    // let difference=machineProgramesCompleted.ActualTime-machineProgramesCompleted.EstimatedTime;

  return (
    <>
    <div>
    <div className="row mt-2">
       <button className="button-style mt-2 group-button"
          style={{ width: "150px",marginLeft:"20px" }} 
          onClick={
            handaleClick
          }>
          Open Programs
        </button>
    </div>

    <div className='row mt-3'>
    <div className='col-md-12 col-sm-12'>
     <div style={{height:"200px",overflowY: "scroll",overflowX:'scroll', width:'800px'}}>
     <Table striped className="table-data border">
       <thead className="tableHeaderBGColor">
         <tr>
           <th>Task No</th>
           <th>Machine</th>
           <th>Operation</th>
           <th>Program No</th>
           <th>Plan Time</th>
           <th>Actual Time</th>
           <th>QTY</th>
           <th>Allotted</th>
           <th>Processed</th>
         </tr>
       </thead>


    <tbody className='tablebody'>
    {proramCompleted && proramCompleted.map((item,key)=>{
  return(
    <>
          <tr  style={{backgroundColor:item.rowColor}}
          onClick={()=>programCompleted(item,key)} className={key===selectProgramCompleted?.index? 'selcted-row-clr':'' } >
             <td>{item.TaskNo}</td>
             <td>{item.Machine}</td>
             <td>{item.Operation}</td>
             <td>{item.NCProgramNo}</td>
             <td>{item.EstimatedTime}</td>
             <td>{item.ActualTime}</td>
             <td>{item.Qty}</td>
             <td>{item.QtyAllotted}</td>
             <td>{item.QtyCut}</td>
         </tr>
         </>
  )
})}
    </tbody>
 </Table>
     </div>
 </div>
</div>

</div>


    <OperationsCompleteOpenProgram
    show={show}
     setShow={setShow}
     selectProgramCompleted={selectProgramCompleted}
     onClickOperation={onClickOperation}
     onClickProgram={onClickProgram}
     onClickMachine={onClickMachine}
    //  programCompleteData={programCompleteData}
    //  setProgramCompleteData={setProgramCompleteData}
     />
  

</>
  )
}
