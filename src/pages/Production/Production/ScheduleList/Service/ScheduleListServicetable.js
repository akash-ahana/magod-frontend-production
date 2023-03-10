import React,{useEffect,useState} from 'react';
import Table from "react-bootstrap/Table";
import { useGlobalContext } from '../../../../../Context/Context';


export default function ScheduleListServicetable({servicerowSelectFun,servicerowselect}) {
  const{schedulelistservicedata,getSchedulistservicedata}=useGlobalContext();

  useEffect(() => {
    getSchedulistservicedata();
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


    {schedulelistservicedata.map((item,key)=>{
      return(
        <>
        <tbody className='tablebody'>
         <tr onClick={()=>servicerowSelectFun(item,key)} className={key===servicerowselect?.index? 'selcted-row-clr':'' } >
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
