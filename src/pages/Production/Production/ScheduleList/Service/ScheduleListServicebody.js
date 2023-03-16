import React, {useState} from 'react'
import ServiceProcessTable from './ServiceProcessTable'
import ScheduleListServicetable from './ScheduleListServicetable';
import NavTab from "../Profile/Components/NavTab";
import axios from "axios";
import { useGlobalContext } from '../../../../../Context/Context';
import { baseURL } from "../../../../../api/baseUrl";


export default function ScheduleListbody() {
  const{schedulelistservicedata}=useGlobalContext();
  
  //First Table Row Select
    const [servicerowselect,setServicerowselect]=useState({})
    const [scheduleid,setScheduleid]=useState('');
    const servicerowSelectFun=(item,index)=>{
      let list={...item,index:index}
      // console.log("ScheduleNo",item.ScheduleNo)
      setScheduleid(item.OrdSchNo);
      setServicerowselect(list);
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
    const [serviceprocessrowselect,setServiceprocessrowselect]=useState({})
    const [taskno,setTaskno]=useState('');
    const serviceprocesstableSelectFun=(item,index)=>{
      let list={...item,index:index}
      console.log("TaskNo",item.TaskNo);
      setTaskno(item.TaskNo);
      setServiceprocessrowselect(list);
    }

  return (
<div className='row mt-4'>
    <div className='col-md-6 col-sm-12 mt-3'>
        <ScheduleListServicetable
        servicerowSelectFun={servicerowSelectFun}
        servicerowselect={servicerowselect}
       />
    </div>

        <div className="col-md-6 col-sm-12">
   <div className="col-md-12 col-sm-12 mt-3">
      <ServiceProcessTable scheduleid={scheduleid}
      processtable={processtable}
      getprocessTabledata={getprocessTabledata}
      serviceprocessrowselect={serviceprocessrowselect}
      serviceprocesstableSelectFun={serviceprocesstableSelectFun}
      />
   </div>
    <div> <NavTab taskno={taskno}/></div>
 </div>
</div>
  )
}
