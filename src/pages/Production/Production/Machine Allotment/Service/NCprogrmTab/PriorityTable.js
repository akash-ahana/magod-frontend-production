import { margin } from '@mui/system';
import axios from 'axios';
import React  ,{useEffect,useState}from 'react';
import { Table } from 'react-bootstrap';
import ModalPrintPriority from '../PrintPriortyTable/ModalPrintPriority';

export default function PriorityTable({machineSelect,ncProgramsTableData,selectNcProgram,setNcProgramsTableData,handleCheckboxChange}) {
  // console.log("Priority Table ",machineSelect.MachineName)

  // console.log(selectNcProgram)


  const [priorityTable , setPriorityTable] = useState([])
  let constspriorityTabel = []

  useEffect(() => {

  },[priorityTable])
  function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}
  const selectRowTable = (item) => {
    // console.log('The Selected Row is ' , item)

    

    if (priorityTable.includes(item)) {
       //setPriorityTable(priorityTable.filter(r => r !== item));
       console.log(item)
       } else {
       setPriorityTable([...priorityTable , item])
       }

       
    // console.log('console in priority table is ' , priorityTable)
  }

  const selectRowPriorityTable = (row) => {
    console.log('Priority Table Is double clicked' ,row , 'Priority Table is ' , priorityTable)
   
    var id = row.Ncid;
    let constPriorityTable  = priorityTable

//   for(var i = 0; i < constPriorityTable.length; i++) {
//     if(constPriorityTable[i].Ncid == id) {
//       constPriorityTable.splice(i, 1);
//         break;
//     }

 
// }
let filteredList=priorityTable.filter((item)=>{
  return item?.Ncid!=id
})



console.log( 'Const Priority Table Data is ' , filteredList)
setPriorityTable(filteredList)
// selectRowTable()

  }


// console.log('Current State of Priority Table is' , priorityTable)
  const[openPrint,setOpenPrint]=useState('');
  const openPrintPriority=()=>{
    setOpenPrint(true)
  }

  // console.log(' Priority Table ' , priorityTable);

  
  
  return (
    <>
    <ModalPrintPriority openPrint={openPrint}
    setOpenPrint={setOpenPrint}
    priorityTable={priorityTable}
    />
    {/* <h3>Prioriy Table</h3> */}
    <div className='row' >

    <div className='col-md-6'
     style={{overflowY:'scroll',overflowX:'scroll', height:'400px'}}>
     <Table striped className="table-data border">
       <thead className="tableHeaderBGColor">
         <tr>
          <th>Select</th>
           <th>Program No</th>
           <th>Task No</th>
           <th>Machine</th>
           <th>Operation</th>
           <th>Material</th>
           <th>Cust_Name</th>
           <th>Source</th>
           <th>Allotted</th>
           <th>Processed</th>
           <th>Status</th>
           <th>PlanTime</th>
           <th>Actual Time</th>
           <th>Remarks</th>
         </tr>
       </thead>


    
        <tbody className='tablebody'>
          {ncProgramsTableData.map((item,key)=>{
            return(
              <>
              <tr onDoubleClick={() =>selectRowTable(item)} className={key===priorityTable?.index? 'selcted-row-clr':'' }>
                <td>
                  <input className="form-check-input mt-2"
                   type="checkbox"
                   value={item}
                   onChange={() => handleCheckboxChange(item, key)}
                    //data-row-value={item}
                    checked={item.isChecked}
                   id="flexCheckDefault"/>
                   </td>
           <td>{item.NCProgramNo}</td>
           <td>{item.TaskNo}</td>
           <td>{item.Machine}</td>
           <td>{item.Operation}</td>
           <td>{item.Mtrl_Code}</td>
           <td>{item.Cust_name}</td>
           <td>{item.CustMtrl}</td>
           <td>{item.QtyAllotted}</td>
           <td>{item.QtyCut}</td>
           <td>{item.PStatus}</td>
           <td>{item.EstimatedTime}</td>
           <td>{item.ActualTime}</td>
           <td>{item.Remarks}</td>
         </tr>
              </>
            )
          })}
   </tbody>
 </Table>
</div >


{/* priority print */}

      <div className='col-md-6'>
         <div style={{backgroundColor:'#F2D7D5 '}}>
            <h4 className="form-title"
              style={{backgroundColor:'#F2D7D5', padding:'6px'}}>Production Priority list</h4>
            <div style={{textAlign:"center"}}>   
              <button className="button-style mt-3 mb-2  group-button"
               style={{width:"120px"}} onClick={openPrintPriority}>
               Print
              </button>
            </div>
          </div>
      
      {/* Table2 */}


      <div  style={{height:"300px",overflowY: "scroll",overflowX: "scroll"}}>
        <h3>Priority Table</h3>
     <Table striped className="table-data border">
       <thead className="tableHeaderBGColor">
         <tr>
           <th>Program No</th>
           <th>Task No</th>
           <th>Machine</th>
           <th>Operation</th>
           <th>Material</th>
           <th>Cust_Name</th>
           <th>Source</th>
           <th>Allotted</th>
           <th>Processed</th>
           <th>Status</th>
           <th>PlanTime</th>
           <th>Actual Time</th>
           <th>Remarks</th>
         </tr>
       </thead>


        <tbody className='tablebody'>
         {priorityTable.map((priorityTable) => 
           (
            
                <tr key = {priorityTable?.Ncid} onDoubleClick={() =>selectRowPriorityTable(priorityTable)}>
           <td>{priorityTable?.NCProgramNo}</td>
           <td>{priorityTable?.TaskNo}</td>
           <td>{priorityTable?.Machine}</td>
           <td>{priorityTable?.Operation}</td>
           <td>{priorityTable?.Mtrl_Code}</td>
           <td>{priorityTable?.Cust_name}</td>
           <td>{priorityTable?.CustMtrl}</td>
           <td>{priorityTable?.QtyAllotted}</td>
           <td>{priorityTable?.QtyCut}</td>
           <td>{priorityTable?.PStatus}</td>
           <td>{priorityTable?.EstimatedTime}</td>
           <td>{priorityTable?.ActualTime}</td>
           <td>{priorityTable?.Remarks}</td>
         </tr>
            
          )
         )}
         
   </tbody>
       
 </Table>
     </div>  
     </div>
</div>
</>
  );
}
