import React from 'react';
import ScheduleHeader from './ScheduleHeader';
import ScheduleListbody from './ScheduleListbody';
import { useGlobalContext } from '../../../../../Context/Context';
import { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../../../../api/baseUrl';
import { useEffect } from 'react';

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

   //////////////////////////////////
   const [custdata, setCustData] = useState("");
   let [custcode, setCustCode] = useState("");

   const postRequest = async (url, body, callback) => {
     let response = await fetch(url, {
       method: "POST",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
       },
       body: JSON.stringify(body),
     });
     let content = await response.json();
     callback(content);
   };
 
   useEffect(() => {
     async function fetchData() {
       postRequest(
         baseURL + "/scheduleListProfile/allcustomersData",
         {},
         (custdetdata) => {
           for (let i = 0; i < custdetdata.length; i++) {
             custdetdata[i].label = custdetdata[i].Cust_name;
           }
           setCustData(custdetdata);
           console.log("custdetdata", custdetdata);
         }
       );
     }
     fetchData();
   }, []);

   const[scheduleList,setScheduleList]=useState([])
   const [selectedCustomerCode, setSelectedCustomerCode] = useState("");
   let selectCust = async (e) => {
     console.log("cust data = ", e);
     console.log("cust code = ", e[0].Cust_Code);
     //setSelectedCustomerCode(e[0].Cust_Code)
 
     axios
       .post(baseURL + "/scheduleListProfile/getSchedulesByCustomer", {
         Cust_Code: e[0].Cust_Code,
       })
       .then((response) => {
        //  console.log(response.data);
         setScheduleList(response.data)
       });
 
     console.log("table customer = ", custdata);
     let cust;
     for (let i = 0; i < custdata.length; i++) {
       if (custdata[i]["Cust_Code"] === e[0].Cust_Code) {
         cust = custdata[i];
         break;
       }
     }
     setCustCode(cust.Cust_Code);
 
     postRequest(
       baseURL + "/scheduleListProfile/getcustomerdetailsData",
       {
         custcode: cust.Cust_Code,
       },
       (resp) => {
         console.log(resp);
         let excustdata = resp[0];
       }
     );
   };
 
   useEffect(() => {
     axios
       .post(baseURL + "/scheduleListProfile/getSchedulesByCustomer", {
         Cust_Code: selectedCustomerCode,
       })
       .then((response) => {
         console.log(response.data);
       });
   }, [selectedCustomerCode]);

   console.log("Selected customer data",scheduleList)
   
  return (
    <div>
        <ScheduleHeader
        rowselect={rowselect}
        processrowselect={processrowselect}
        partlistdata={partlistdata}
        programlistdata={programlistdata}
        custdata={custdata}
        selectCust={selectCust}
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
       scheduleList={scheduleList}
       custcode={custcode}
       />
    </div>
  )
}
