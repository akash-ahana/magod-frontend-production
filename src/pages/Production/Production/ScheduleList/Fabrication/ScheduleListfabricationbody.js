import React, {useState} from 'react'
import FabricationProcessTable from './FabricationProcessTable'
import ScheduleListFabricationtable from './ScheduleListFabricationtable'
import NavTab from "../Profile/Components/NavTab";
import axios from "axios";
import { useGlobalContext } from '../../../../../Context/Context';
import { baseURL } from "../../../../../api/baseUrl";


export default function ScheduleListfabricationbody() {
  const{schedulelistfabricationdata}=useGlobalContext();
  
  //First Table Row Select
    const [rowselectfabrication,setRowselectfabrication]=useState({})
    const [scheduleid,setScheduleid]=useState('');
    const fabricationrowSelectFun=(item,index)=>{
      let list={...schedulelistfabricationdata,index:index}
      // console.log("ScheduleNo",item.ScheduleNo)
      setScheduleid(item.OrdSchNo);
      setRowselectfabrication(list);
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
    const [fabprocessrowselect,setFabprocessrowselect]=useState({})
    const [taskno,setTaskno]=useState('');
    const fabprocesstableSelectFun=(item,index)=>{
      let list={...processtable,index:index}
      console.log("TaskNo",item.TaskNo);
      setTaskno(item.TaskNo);
      setFabprocessrowselect(list);
    }

  return (
<div className='row mt-4'>
    <div className='col-md-6 col-sm-12 mt-3'>
        <ScheduleListFabricationtable
        fabricationrowSelectFun={fabricationrowSelectFun}
        rowselectfabrication={rowselectfabrication}
       />
    </div>

        <div className="col-md-6 col-sm-12">
   <div className="col-md-12 col-sm-12 mt-3">
      <FabricationProcessTable scheduleid={scheduleid}
      processtable={processtable}
      getprocessTabledata={getprocessTabledata}
      fabprocessrowselect={fabprocessrowselect}
      fabprocesstableSelectFun={fabprocesstableSelectFun}
      />
   </div>
    <div> <NavTab taskno={taskno}/></div>
 </div>
</div>
  )
}
