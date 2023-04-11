import React,{useState,useEffect} from 'react'; 
import { Table } from 'react-bootstrap';
import axios from "axios";
import { baseURL } from "../../../../../../api/baseUrl";
import '../Styles.css'

export default function PartsList({taskno}){
  // console.log(taskno);

  //Process Table(Right First table) data
  const[partlistdata,setPartlistdata]=useState([])
  const[newpartlistdata,setNewPartlistdata]=useState([])
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

const onChangeInput = (e, TaskNo, key) => {
  const { name, value } = e.target
  console.log('value', value)
  
  console.log('key', key)

  const NewEditData = partlistdata
  NewEditData[key].QtyCleared = value

  // const editData = partlistdata.map((item) =>
  //   item.TaskNo === TaskNo && name ? { ...item, QtyCleared: value } : item
  // )
  setPartlistdata(NewEditData)
  setNewPartlistdata(NewEditData)
}
console.log('Parts List Data is ' , partlistdata) 

 const clearAllonClick = () => {
  console.log("Clear All Button is Clicked" , "Parts List Data is " , partlistdata)
  const  constpartListData = partlistdata;
  console.log("Const part list data is " , constpartListData)

    for( let i = 0 ; i < constpartListData.length ; i++) {
      constpartListData[i].QtyCleared = constpartListData[i].QtyProduced
    }

    console.log("Updated constPartListData is " , constpartListData)
    setPartlistdata(constpartListData)
    setNewPartlistdata(constpartListData)
    //setPartlistdata([])
  
 }

 console.log('Parts List Data is ' , partlistdata)

 const onChangeCleared = (e, item, key) => {
   console.log("e is " , e.target.value, " item is " , item, " key is " , key)
   //item is not required , e.target.value contains the entered value in the input box, and key contains the index of the array 
   console.log(' PART LIST IS ' , partlistdata)
   const newConstPartList = partlistdata
   if(e.target.value <= newConstPartList[key].QtyProduced) {
    newConstPartList[key].QtyCleared = e.target.value
   }
  
   console.log('NEW CONST PART LIST IS ' , newConstPartList)
   setPartlistdata(newConstPartList)
 }

 const saveClearedonClick = () => {
  console.log('Save Cleared button is clicked' , " task parts table state is " , partlistdata)
  axios.post(
    baseURL +
    "/scheduleListProfile/scheduleListSaveCleared", partlistdata
     ).then((response) => {
      //setPartlistdata(response.data);
      console.log(response.boby)
   });
 }

 
  return (
    <div>
        <div className="row mt-2">
           <button className="button-style mt-2 group-button"
              style={{ width: "180px",marginLeft:"20px" }}>
              Update Task Parts
            </button>

            <button className="button-style mt-2 group-button"
              style={{ width: "150px" ,marginLeft:"20px"}} onClick = {clearAllonClick}>
              Clear All
            </button>

            <button className="button-style mt-2 group-button"
              style={{ width: "150px",marginLeft:"20px" }} onClick = {saveClearedonClick}>
              Save Cleared
            </button>
        </div>  
         
        <div  className='mt-4' style={{height:"200px",overflowY: "scroll"}}>
     <Table bordered>
       <thead style={{textAlign:"center"}}>
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

      
          <tbody className='tablebody'>
          {
       partlistdata.map((item,key)=>{
        return(
          <>
           <tr  key={item.TaskNo}>
           <td>{item.DwgName}</td>
           <td>{item.QtyToNest}</td>
           <td>{item.QtyProduced}</td>
           <td>

            <div key={item.QtyCleared}>
            <input className='table-cell-editor '
           name="cleared"
           defaultValue={item.QtyCleared}
           type="number"
           //onChange={(e)=>onChangeCleared(e,  item, key)}
           placeholder="Type Cleared"
         />
            </div>
           
         </td>
           <td>{item.Task_Part_ID}</td>
           <td>{item.NcTaskId}</td>
           <td>{item.TaskNo}</td>
           <td>{item.SchDetailsId}</td>
           <td>{item.PartID}</td>
           <td>{item.QtyToNest}</td>
           <td>{item.QtyCleared}</td>
           <td>{item.QtyProduced}</td>
           <td>{item.QtyNested}</td>
           <td>{item.Remarks}</td>
           <td>{item.LOC}</td>
           <td>{item.Pierces}</td>
           <td>{item.Part_Area}</td>
           <td>{item.Unit_Wt}</td>
           <td>
            <input className="form-check-input"
                 type="checkbox"
                 value=""
                 id="flexCheckDefault"/></td>
           <td></td>
         </tr>
         </>
        )
       })}
   </tbody> 
 </Table>
     </div>

    </div>
  )
}
