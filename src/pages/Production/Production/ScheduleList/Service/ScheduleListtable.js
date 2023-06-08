import React,{useEffect,useMemo,useState} from 'react';
import Table from "react-bootstrap/Table";
import { useGlobalContext } from '../../../../../Context/Context';


export default function ScheduleListtable({rowSelectFun,rowselect,getprocessTabledata,setRowselect}) {
  const{schedulelistservicedata,getSchedulistservicedata}=useGlobalContext();

  useEffect(() => {
    getSchedulistservicedata();
 }, []);

 
  return (
     <div style={{height:"500px",overflowY: "scroll",overflowX:"scroll"}}>
     <Table striped className="table-data border">
       <thead className="tableHeaderBGColor">
         <tr>
           {/* <th>Select</th> */}
           <th style={{whiteSpace:"nowrap"}}>Schedule No</th>
           <th>Customer</th>
           <th style={{whiteSpace:"nowrap"}}>TgtDelDate</th>
           <th style={{whiteSpace:"nowrap"}}>Delivery_date</th>
           <th>Status</th>
         </tr>
       </thead>


        <tbody className='tablebody'>
        {schedulelistservicedata.map((item,key)=>{
      return(
        <>
         <tr onClick={()=>rowSelectFun(item,key)} className={key===rowselect?.index? 'selcted-row-clr':'' } >
           {/* <td>
                <input className="form-check-input"
                 type="checkbox"
                 value=""
                 id="flexCheckDefault"/>
           </td> */}
           <td style={{whiteSpace:"nowrap"}}>{item.OrdSchNo}</td>
           <td style={{whiteSpace:"nowrap"}}>{item.Cust_name}</td>
           <td style={{whiteSpace:"nowrap"}}>{item.schTgtDate}</td>
           <td style={{whiteSpace:"nowrap"}}>{item.Delivery_Date}</td>
           <td style={{whiteSpace:"nowrap"}}>{item.Schedule_Status}</td>
         </tr>
         </>
      )
    })}
   </tbody>
 </Table>

     </div>
  )
}
