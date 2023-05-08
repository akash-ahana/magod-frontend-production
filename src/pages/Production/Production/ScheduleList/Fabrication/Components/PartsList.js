import React,{useState,useEffect} from 'react';
import { Table } from 'react-bootstrap';
import axios from "axios";
import { baseURL } from "../../../../../../api/baseUrl";


export default function PartsList({taskno}){
  // console.log(taskno);

  //Process Table(Right First table) data
  const[partlistdata,setPartlistdata]=useState([])
  const getpartslistdata=()=>{
   axios.post(
    baseURL +
    "/scheduleListProfile/schedulesListPartsList",
     {
      TaskId :taskno
     }).then((response) => {
      setPartlistdata(response.data);
   });
  } 

  useEffect(() => {
    getpartslistdata();
 }, [taskno]);

//  console.log(partlistdata);
 
  return (
    <div>
        <div className="row mt-2">
           {/* <button className="button-style mt-2 group-button"
              style={{ width: "150px",marginLeft:"20px" }}>
              UpDate Task Parts
            </button> */}

            <button className="button-style mt-2 group-button"
              style={{ width: "150px" ,marginLeft:"20px"}}>
              Clear All
            </button>

            <button className="button-style mt-2 group-button"
              style={{ width: "150px",marginLeft:"20px" }}>
              Save Cleared
            </button>
        </div>    
        <div  className='mt-4' style={{height:"200px",overflowY: "scroll"}}>
     <Table borderedstriped className="table-data border">
       <thead className="tableHeaderBGColor">
         <tr>
           <th>DwgName</th>
           <th>Programed</th>
           <th>Produced</th>
           <th>Cleared</th>
           <th>Task_Part_ID</th>
           <th>NcTaskId</th>
           <th>TaskNo</th>
           <th>SchDetailsId</th>
           <th>PartId</th>  
           <th>QtyToNest</th>
           <th>QtyCleared</th>
           <th>QtyProduced</th>
           <th>QtyNested</th>
           <th>Remarks</th>
           <th>LOC</th>
           <th>Pierces</th>
           <th>Part_Area</th>
           <th>Unit_Wt</th>
           <th>HasBOM</th>
           <th>QtnDetailId</th>
         </tr>
       </thead>

       {partlistdata.map((item,key)=>{
        return(
          <>
          <tbody className='tablebody'>
         <tr>
           <td style={{whiteSpace:"nowrap"}}>{item.DwgName}</td>
           <td>{item.QtyProgrammed}</td>
           <td>{item.QtyProduced}</td>
           <td>{item.QtyCleared}</td>
           <td>{item.Task_Part_ID}</td>
           <td>{item.NcTaskId}</td>
           <td style={{whiteSpace:"nowrap"}}>{item.TaskNo}</td>
           <td style={{whiteSpace:"nowrap"}}>{item.SchDetailsId}</td>
           <td>{item.PartID}</td>
           <td>{item.QtyToNest}</td>
           <td>{item.QtyCleared}</td>
           <td>{item.QtyProduced}</td>
           <td>{item.QtyNested}</td>
           <td>{item.Remarks}</td>
           <td>{item.LOC}</td>
           <td>{item.Pierces}</td>
           <td>{item.Part_Area}</td>
           <td>{item.UnitWt}</td>
           <td><input className="form-check-input"
                 type="checkbox"
                 value=""
                 id="flexCheckDefault"/></td>
           <td></td>
         </tr>
   </tbody>
          </>
        )
       })}
 </Table>
     </div>
    </div>
  )
}
