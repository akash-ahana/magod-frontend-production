import React from 'react';
import ScheduleHeader from './ScheduleHeader';
import ScheduleListbody from './ScheduleListbody';
import { useGlobalContext } from '../../../../../Context/Context';
import { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../../../../api/baseUrl';

export default function ScheduleList() {
  const{schedulelistdata}=useGlobalContext();
    const [rowselect,setRowselect]=useState({})
    const [scheduleid,setScheduleid]=useState('');
    const rowSelectFun=(item,index)=>{
      let list={...item,index:index}
      // console.log("ScheduleNo",item.ScheduleNo)
      setRowselect(list);
      setScheduleid(item.OrdSchNo);
    }
console.log(rowselect)
    
//Processtable Row select
const [processrowselect,setProcessrowselect]=useState({})
const [taskno,setTaskno]=useState('');
const processtableSelectFun=(item,index)=>{
  let list={...item,index:index}
  console.log("TaskNo",item.TaskNo);
  setTaskno(item.TaskNo);
  setProcessrowselect(list);
}

let TaskNo=processrowselect.TaskNo
const[partlistdata,setPartlistdata]=useState([])
const getpartslistdata=()=>{
  axios.post(
   baseURL +
   "/scheduleListProfile/schedulesListPartsList",
    {
     TaskId :TaskNo
    }).then((response) => {
     setPartlistdata(response.data);
  });
 } 

 const[programlistdata,setProgramlistdata]=useState([])
   const getProgramlistdata=()=>{
    axios.post(
      baseURL + "/scheduleListProfile/schedulesListProgramList",
      {
       TaskId :TaskNo
      }).then((response) => {
        setProgramlistdata(response.data);
    });
   } 


   
  return (
    <div>
        <ScheduleHeader
        rowselect={rowselect}
        processrowselect={processrowselect}
        partlistdata={partlistdata}
        programlistdata={programlistdata}
        />

       <ScheduleListbody rowselect={rowselect}
       setRowselect={setRowselect}
       rowSelectFun={rowSelectFun}
       scheduleid={scheduleid}
       processrowselect={processrowselect}
       setProcessrowselect={setProcessrowselect}
       processtableSelectFun={processtableSelectFun}
       taskno={taskno}
       getpartslistdata={getpartslistdata}
       partlistdata={partlistdata}
       setPartlistdata={setPartlistdata}
       getProgramlistdata={getProgramlistdata}
       programlistdata={programlistdata}
       setProgramlistdata={setProgramlistdata}
       TaskNo={TaskNo}
       />
    </div>
  )
}
