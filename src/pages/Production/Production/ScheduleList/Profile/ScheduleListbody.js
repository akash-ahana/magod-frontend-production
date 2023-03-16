import React, {useState} from 'react'
import ProcessTable from './ProcessTable'
import ScheduleListtable from './ScheduleListtable';
import NavTab from "../Profile/Components/NavTab";
import axios from "axios";
import { useGlobalContext } from '../../../../../Context/Context';
import { baseURL } from "../../../../../api/baseUrl";


export default function ScheduleListbody() {
  const{schedulelistdata}=useGlobalContext();
  
  //First Table Row Select
    const [rowselect,setRowselect]=useState({})
    const [scheduleid,setScheduleid]=useState('');
    const rowSelectFun=(item,index)=>{
      let list={...item,index:index}
      // console.log("ScheduleNo",item.ScheduleNo)
      setScheduleid(item.OrdSchNo);
      setRowselect(list);
    }

//Process Table(Right First table) data
    const[processtable,setProcesstable]=useState([])
    const getprocessTabledata=()=>{
     axios.post(
      baseURL + "/scheduleListProfile/schedulesListSecondTable",
       {
         ScheduleID:scheduleid
       }).then((response) => {
         setProcesstable(response.data);
        //  console.log(response)
     });
    } 

//Processtable Row select
    const [processrowselect,setProcessrowselect]=useState({})
    const [taskno,setTaskno]=useState('');
    const processtableSelectFun=(item,index)=>{
      let list={...item,index:index}
      console.log("TaskNo",item.TaskNo);
      setTaskno(item.TaskNo);
      setProcessrowselect(list);
    }

  return (
<div className='row mt-4'>
    <div className='col-md-6 col-sm-12 mt-3'>
        <ScheduleListtable
        rowSelectFun={rowSelectFun}
        rowselect={rowselect}
       />
    </div>

        <div className="col-md-6 col-sm-12">
   <div className="col-md-12 col-sm-12 mt-3">
      <ProcessTable scheduleid={scheduleid}
      processtable={processtable}
      getprocessTabledata={getprocessTabledata}
      processrowselect={processrowselect}
      processtableSelectFun={processtableSelectFun}
      />
   </div>
    <div> <NavTab taskno={taskno}/></div>
 </div>
</div>
  )
}
