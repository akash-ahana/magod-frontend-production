import React,{useEffect,useMemo,useState} from 'react';
import Table from "react-bootstrap/Table";
import { useGlobalContext } from '../../../../../Context/Context';


export default function ScheduleListtable({rowSelectFun,rowselect,getprocessTabledata,setRowselect}) {
  const{schedulelistfabricationdata,getSchedulistfabricationdata,selectedRowsFabrication, setSelectedRowsFabrication,handleCheckboxChangeFabrication}=useGlobalContext();

  const [initialLoad, setInitialLoad] = useState(true);

 useEffect(() => {
  if (schedulelistfabricationdata.length > 0 && initialLoad) {
    rowSelectFun(schedulelistfabricationdata[0], 0); // Select the first row on initial load
    setInitialLoad(false); // Set initialLoad to false so this effect doesn't run again
  }
}, [schedulelistfabricationdata, initialLoad, rowSelectFun]);

 console.log("selected data in fabrication",selectedRowsFabrication)
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
        {schedulelistfabricationdata.map((item,key)=>{
                      const isChecked = selectedRowsFabrication.some(row => row === item);

      return(
        <>
         <tr onClick={()=>rowSelectFun(item,key)} className={key===rowselect?.index? 'selcted-row-clr':'' } >
         <td>
         <input
  className="form-check-input"
  type="checkbox"
  checked={isChecked}
  onChange={() => handleCheckboxChangeFabrication(item)}
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
