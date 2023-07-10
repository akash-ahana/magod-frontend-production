import React, { useEffect, useMemo } from 'react'
import { Table } from 'react-bootstrap'
import MachineLogSideTable from './MachineLogSideTable'
import { baseURL } from '../../../../../../api/baseUrl'
import { useState } from 'react'
import axios from 'axios'

export default function MachineLogTable() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(today.getDate()).padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;
  console.log(currentDate);

  //SIDETABLE DATA
  const [machineList,setMachineList]=useState([])
  useEffect(() => {
    axios.get(baseURL+'/shiftManagerProfile/profileListMachinesTaskNo')
        .then((response) => {
          console.log("response  machine list",response.data)
          setMachineList(response.data);
        })
}, [])


  const[selectmachinelog,setSelectmachinelog]=useState({})
  const[machineLog,setMachineLog]=useState([])
  const selectMachineLogFun=(item,index)=>{
  let list={...item,index:index}
  setSelectmachinelog(list)
  axios.post(baseURL + '/shiftManagerProfile/machineLog', { Date:currentDate,
  Machine:list})
      .then((response) => {
        for(let i =0;i<response.data.length;i++) { 
          let dateSplit1 = response.data[i].FromTime.split(" ");
          let date1 =dateSplit1[0].split("-")
          let year1 = date1[0];
          let month1 = date1[1];
          let day1 = date1[2];
          let time=dateSplit1[1].split(":");
          let Time=time[0]+":"+time[1];
          let finalDay1 = day1+"/"+month1+"/"+year1+" "+ Time;
          response.data[i].FromTime = finalDay1;
        }
        for(let i =0;i<response.data.length;i++) { 
          let dateSplit2 = response.data[i].ToTime.split(" ");
          let date2 =dateSplit2[0].split("-")
          let year2 = date2[0];
          let month2 = date2[1];
          let day2 = date2[2];
          let time1=dateSplit2[1].split(":");
          let Time1=time1[0]+":"+time1[1];
          let finalDay2 = day2+"/"+month2+"/"+year2+" "+ Time1;
          response.data[i].ToTime = finalDay2;
        }
        console.log(' REQUIRED RESPONSE FOR MACHINE LOG IS ', response.data);
        setMachineLog(response.data)
      });
}
   

useMemo(()=>{
  setSelectmachinelog({...machineList[0],index:0})
},[machineList[0]])

  return (
    <>
    <div className="d-flex">
    <div className="box" style={{width:'205px'}}>
        <MachineLogSideTable
        selectMachineLogFun={selectMachineLogFun}
        selectmachinelog={selectmachinelog}
        setSelectmachinelog={setSelectmachinelog}
        machineList={machineList}
        />
    </div>

    <div className='row mt-1'>
    <div className='col-md-12 col-sm-12'>
     <div style={{height:"250px",overflowY: "scroll", overflowX:"scroll",maxWidth:'650px'}}>
     <Table striped className="table-data border" >
       <thead className="tableHeaderBGColor">
         <tr>
           <th>Processed</th>
           <th>FromTime</th>
           <th>ToTime</th>
           <th>RunningTime</th>
           <th>Program</th>
           <th>Operation</th>
           <th>Remarks</th>
           <th>Locked</th>
           <th>Operator</th>
           {/* <th>Abc</th>
           <th>Xyz</th> */}
         </tr>
       </thead>

{machineLog.map((item,key)=>{
  return(
    <>
    <tbody className='tablebody'>
          <tr>
             <td style={{whiteSpace:"nowrap"}}>{item.QtyProcessed}</td>
             <td style={{whiteSpace:"nowrap"}}>{item.FromTime}</td>
             <td style={{whiteSpace:"nowrap"}}>{item.ToTime}</td>
             <td style={{whiteSpace:"nowrap"}}>{item.MachineTime}</td>
             <td style={{whiteSpace:"nowrap"}}>{item.Program}</td>
             <td style={{whiteSpace:"nowrap"}}>{item.Operation}</td>
             <td style={{whiteSpace:"nowrap"}}>{item.Remarks}</td>
             <td style={{whiteSpace:"nowrap"}}>
              <input type="checkbox"
              checked={item.Locked==1 ? true:false}/>
             </td>
             <td style={{whiteSpace:"nowrap"}}>{item.Operator}</td>
         </tr>
    </tbody>
    </>
  )
})}
 </Table>
     </div>
 </div>
</div>
</div>
</>
  )
}
