import { margin } from '@mui/system';
import React  ,{useEffect,useState}from 'react';

import { Table } from 'react-bootstrap';
import { useGlobalContext } from '../../../../../Context/Context';

export default function PriorityTable({rowSelectFun,rowselect,getprocessTabledata}) {

  const{schedulelistdata,getSchedulistdata}=useGlobalContext();

  useEffect(() => {
      getSchedulistdata();
   }, []);
  return (
    <>
    <div className='row' >

    <div className='col-md-6' style={{overflowY:'scroll',overflowX:'scroll', height:'380px'}}>
     <Table bordered>
       <thead style={{textAlign:"center"}}>
         <tr>
           <th>Select</th>
           <th>Program no No</th>
           <th>Task no</th>
           <th>Machine</th>
           <th>Operation</th>
           <th>Material</th>
           <th>Cust_Name</th>
           <th>Source</th>
           <th>Allotted</th>
           <th>Processed</th>
           <th>Status</th>
           <th>PlanTime</th>
           <th>Actual time</th>
           <th>Remarks</th>
         </tr>
       </thead>


    {schedulelistdata.map((item,key)=>{
      return(
        <>
        <tbody className='tablebody'>
         <tr onClick={()=>rowSelectFun(item,key)} className={key===rowselect?.index? 'selcted-row-clr':'' } >
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
           <td>{item.OrdSchNo}</td>
           <td>{item.Cust_name}</td>
           <td>{item.schTgtDate}</td>
           <td>{item.Delivery_Date}</td>
           <td>{item.Schedule_Status}</td>
           <td>{item.schTgtDate}</td>
           <td>{item.Delivery_Date}</td>
           <td>{item.Schedule_Status}</td>
         </tr>
   </tbody>
        </>
      )
    })}
 </Table>

     </div >


{/* priority print */}

      <div className='col-md-6 '  >
        <div className='' style={{backgroundColor:'#F2D7D5 '}}>
        <h4 className="form-title"  style={{backgroundColor:'#F2D7D5', padding:'6px'}}>Production Priority list</h4>
        
             <div>   
        <button className="button-style mt-3 mb-2 group-button"
            style={{ width: "100px", marginLeft:'150px'}}>
            Print
         </button>
          </div>
          </div>
      
      {/* Table2 */}


      <div className='' style={{height:"300px",overflowY: "scroll",overflowX: "scroll"}}>
     <Table bordered>
       <thead style={{textAlign:"center"}}>
         <tr>
           <th>Select</th>
           <th>Program no No</th>
           <th>Task no</th>
           <th>Machine</th>
           <th>Operation</th>
           <th>Material</th>
           <th>Cust_Name</th>
           <th>Source</th>
           <th>Allotted</th>
           <th>Processed</th>
           <th>Status</th>
           <th>PlanTime</th>
           <th>Actual time</th>
           <th>Remarks</th>
         </tr>
       </thead>


    {schedulelistdata.map((item,key)=>{
      return(
        <>
        <tbody className='tablebody'>
         <tr onClick={()=>rowSelectFun(item,key)} className={key===rowselect?.index? 'selcted-row-clr':'' } >
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
           <td>{item.OrdSchNo}</td>
           <td>{item.Cust_name}</td>
           <td>{item.schTgtDate}</td>
           <td>{item.Delivery_Date}</td>
           <td>{item.Schedule_Status}</td>
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
     
        
     </div>
</div>
</>
  );
}
