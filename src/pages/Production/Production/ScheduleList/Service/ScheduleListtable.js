import React,{useEffect,useMemo,useState} from 'react';
import Table from "react-bootstrap/Table";
import { useGlobalContext } from '../../../../../Context/Context';


export default function ScheduleListtable({rowSelectFun,rowselect,getprocessTabledata,setRowselect}) {
  const{schedulelistservicedata,getSchedulistservicedata,selectedRowsService, setSelectedRowsService,handleCheckboxChangeService}=useGlobalContext();

  useEffect(() => {
    getSchedulistservicedata();
 }, []);

 const [initialLoad, setInitialLoad] = useState(true);

 useEffect(() => {
  if (schedulelistservicedata.length > 0 && initialLoad) {
    rowSelectFun(schedulelistservicedata[0], 0); // Select the first row on initial load
    setInitialLoad(false); // Set initialLoad to false so this effect doesn't run again
  }
}, [schedulelistservicedata, initialLoad, rowSelectFun]);

 
  return (
     <div style={{height:"500px",overflowY: "scroll",overflowX:"scroll"}}>
     <Table striped className="table-data border">
       <thead className="tableHeaderBGColor">
         <tr>
           <th>Select</th>
           <th style={{whiteSpace:"nowrap"}}>Schedule No</th>
           <th>Customer</th>
           <th style={{whiteSpace:"nowrap"}}>TgtDelDate</th>
           <th style={{whiteSpace:"nowrap"}}>Delivery_date</th>
           <th>Status</th>
         </tr>
       </thead>


        <tbody className='tablebody'>
        {schedulelistservicedata.map((item,key)=>{
                      const isChecked = selectedRowsService.some(row => row === item);

      return(
        <>
         <tr onClick={()=>rowSelectFun(item,key)} className={key===rowselect?.index? 'selcted-row-clr':'' } >
         <td>
         <input
  className="form-check-input"
  type="checkbox"
  checked={isChecked}
  onChange={() => handleCheckboxChangeService(item)}
/>

                </td>
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
