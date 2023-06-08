import React,{useState,useEffect} from 'react'; 
import { Table } from 'react-bootstrap';
import axios from "axios";
import { baseURL } from "../../../../../../api/baseUrl";
import '../Styles.css'

export default function PartsList({TaskNo,getpartslistdata,partlistdata,setPartlistdata}){
  const blockInvalidChar = e => ['e', 'E', '+', '-','.'].includes(e.key) && e.preventDefault();

  // console.log(taskno);

  //Process Table(Right First table) data
  const[newpartlistdata,setNewPartlistdata]=useState([])
  

  useEffect(() => {
    getpartslistdata();
 }, [TaskNo]);


 

const onChangeInput = (e, TaskNo, key) => {
  const { name, value } = e.target
  // console.log('value', value)
  // console.log('key', key)
  const NewEditData = partlistdata
  NewEditData[key].QtyCleared = value
  setPartlistdata(NewEditData)
  setNewPartlistdata(NewEditData)
}

 const clearAllonClick = () => {
  // console.log("Clear All Button is Clicked" , "Parts List Data is " , partlistdata)
  const  constpartListData = partlistdata;
  // console.log("Const part list data is " , constpartListData)
    for( let i = 0 ; i < constpartListData.length ; i++) {
      constpartListData[i].QtyCleared = constpartListData[i].QtyProduced
    }
    // console.log("Updated constPartListData is " , constpartListData)
    setPartlistdata(constpartListData)
    setNewPartlistdata(constpartListData)
    //setPartlistdata([])
  
 }

//  console.log('Parts List Data is ' , partlistdata)

 const onChangeCleared = (e, item, key) => {
  //  console.log("e is " , e.target.value, " item is " , item, " key is " , key)
   //item is not required , e.target.value contains the entered value in the input box, and key contains the index of the array 
  //  console.log(' PART LIST IS ' , partlistdata)
   const newConstPartList = partlistdata
   if(e.target.value <= newConstPartList[key].QtyProduced) {
    newConstPartList[key].QtyCleared = e.target.value
   }
  
  //  console.log('NEW CONST PART LIST IS ' , newConstPartList)
   setPartlistdata(newConstPartList)
 }

 const saveClearedonClick = () => {
  // console.log('Save Cleared button is clicked' , " task parts table state is " , partlistdata)
  axios.post(
    baseURL +
    "/scheduleListProfile/scheduleListSaveCleared", partlistdata
     ).then((response) => {
      //setPartlistdata(response.data);
      // console.log(response.boby)
   });
 }

//  //SelectedRow
//  const [selectedRows, setSelectedRows] = useState([]);

//  const handleRowClick = (index) => {
//    if (selectedRows.includes(index)) {
//      setSelectedRows(selectedRows.filter((row) => row !== index));
//    } else {
//      setSelectedRows([...selectedRows, index]);
//    }
//  };

//  console.log(selectedRows)

//  const[inputValue,setInputValue]=useState('');
 
//  const inputCleared=(e)=>{
//   setInputValue(e.target.value);
//  }
 
 const [selectedRows, setSelectedRows] = useState([]);

 const handleCheckboxChange = (event, row) => {
  if (event.target.checked) {
    // Add the selected row object to the array
    setSelectedRows([...selectedRows, row]);
  } else {
    // Remove the selected row object from the array
    setSelectedRows(selectedRows.filter((selectedRow) => selectedRow.id !== row.id));
  }
};

const handleSelectAll = (event) => {
  if (event.target.checked) {
    // Select all rows
    setSelectedRows(partlistdata);
  } else {
    // Deselect all rows
    setSelectedRows([]);
  }
};


  console.log(selectedRows)

  return (
    <div>
        <div className="row mt-2">
           {/* <button className="button-style mt-2 group-button"
              style={{ width: "180px",marginLeft:"20px" }}>
              Update Task Parts
            </button> */}

            <button className="button-style mt-2 group-button"
              style={{ width: "150px" ,marginLeft:"20px"}} onClick = {clearAllonClick}>
              Clear All
            </button>

            <button className="button-style mt-2 group-button"
              style={{ width: "150px",marginLeft:"20px" }} onClick = {saveClearedonClick}>
              Save Cleared
            </button>

            <button className="button-style mt-2 group-button"
              style={{ width: "150px",marginLeft:"20px" }} >
              Clear Selected
            </button>
        </div>  
         
        <div  className='mt-4' style={{height:"160px",overflowY: "scroll"}}>
     <Table striped className="table-data border">
       <thead className="tableHeaderBGColor">
         <tr>
          <th></th>
           <th>DwgName</th>
           <th>Programmed</th>
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
       partlistdata.map((row,index)=>{
        return(
          <>
           <tr         

       index={row.TaskNo}>
        <td className='mt-2'>
        <td>
            <input style={{marginLeft:"20px"}} className="form-check-input"
                                 type="checkbox"
                 /></td>

        </td>
           <td style={{whiteSpace:"nowrap"}}>{row.DwgName}</td>
           <td style={{textAlign:"center"}}>{row.QtyToNest}</td>
           <td style={{textAlign:"center"}}>{row.QtyProduced}</td>
           <td>
            <div   key={row.QtyCleared}>
            <input className='table-cell-editor '
            style={{textAlign:"center"}}
           name="cleared"
           defaultValue={row.QtyCleared}
           type="number"
           placeholder="Type Cleared"
           onKeyDown={blockInvalidChar}
         />
            </div>
           
         </td>
           <td>{row.Task_Part_ID}</td>
           <td style={{textAlign:"center"}}>{row.NcTaskId}</td>
           <td style={{whiteSpace:"nowrap",textAlign:"center"}}>{row.TaskNo}</td>
           <td style={{whiteSpace:"nowrap",textAlign:"center"}}>{row.SchDetailsId}</td>
           <td style={{textAlign:"center"}}>{row.PartID}</td>
           <td style={{textAlign:"center"}}>{row.QtyToNest}</td>
           <td style={{textAlign:"center"}}>{row.QtyCleared}</td>
           <td style={{textAlign:"center"}}>{row.QtyProduced}</td>
           <td style={{textAlign:"center"}}>{row.QtyNested}</td>
           <td style={{whiteSpace:"nowrap"}}>{row.Remarks}</td>
           <td style={{textAlign:"center"}}>{row.LOC}</td>
           <td style={{textAlign:"center"}}>{row.Pierces}</td>
           <td style={{textAlign:"center"}}>{row.Part_Area}</td>
           <td style={{textAlign:"center"}}>{row.Unit_Wt}</td>
           <td>
            <input style={{marginLeft:"20px"}} className="form-check-input"
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
