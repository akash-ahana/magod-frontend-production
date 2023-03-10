import React,{useEffect,useState} from 'react';
import Table from "react-bootstrap/Table";
import { useGlobalContext } from '../../../../../Context/Context';


export default function ScheduleListFabricationtable({fabricationrowSelectFun,rowselectfabrication}) {
  const{getSchedulistfabricationdata,schedulelistfabricationdata}=useGlobalContext();

  useEffect(() => {
    getSchedulistfabricationdata();
 }, []);


  
  return (
     <div style={{height:"500px",overflowY: "scroll"}}>
     <Table bordered>
       <thead style={{textAlign:"center"}}>
         <tr>
           <th>Select</th>
           <th>Schedule No</th>
           <th>Customer</th>
           <th>TgtDelDate</th>
           <th>Delivery_date</th>
           <th>Status</th>
         </tr>
       </thead>


    {schedulelistfabricationdata.map((item,key)=>{
      return(
        <>
        <tbody className='tablebody'>
         <tr onClick={()=>fabricationrowSelectFun(item,key)} className={key===rowselectfabrication?.index? 'selcted-row-clr':'' } >
           <td>
                <input className="form-check-input"
                 type="checkbox"
                 value=""
                 id="flexCheckDefault"/>
           </td>
           <td>{item.OrdSchNo}</td>
           <td>{item.Cust_name}</td>
           <td>{item.schTgtDate}</td>
           <td>{item.Delivery_Date}</td>
           <td>{item.Schedule_Status}</td>
         </tr>
   </tbody>
        </>
      )
    })}
 </Table>

     </div>
  )
}
