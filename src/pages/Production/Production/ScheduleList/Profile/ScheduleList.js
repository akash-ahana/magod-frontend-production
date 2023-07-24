import React from 'react';
import ScheduleHeader from './ScheduleHeader';
import ScheduleListbody from './ScheduleListbody';
import { useGlobalContext } from '../../../../../Context/Context';
import { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../../../../api/baseUrl';
import { useEffect } from 'react';

export default function ScheduleList() {
  const{schedulelistdata,setSchedulelistdata,getSchedulistdata}=useGlobalContext();

  //ScheduleList Table row select
    const [rowselect,setRowselect]=useState({})
    const [scheduleid,setScheduleid]=useState('');
    const rowSelectFun=(item,index)=>{
      let list={...item,index:index}
      // console.log("ScheduleNo",item.ScheduleNo)
      setRowselect(list);
      setScheduleid(item.OrdSchNo);
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

let TaskNo=processrowselect.TaskNo
const[partlistdata,setPartlistdata]=useState([])
console.log("TaskId",TaskNo)
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

   const [selectedCustomerCode, setSelectedCustomerCode] = useState("");

  let selectCust = async (e) => {
  if (e.length === 0) {
    // If input field is empty, make a GET request
    axios.get(baseURL + "/scheduleListProfile/schedulesList").then((response) => {
      console.log(response.data)
for(let i =0;i<response.data.length;i++) { 
// FOR TgtDelDate
let dateSplit = response.data[i].schTgtDate.split(" ");
let date =dateSplit[0].split("-")
let year = date[0];
let month = date[1];
let day = date[2];
let finalDay = day+"-"+month+"-"+year
response.data[i].schTgtDate = finalDay;
}
for(let i =0;i<response.data.length;i++) { 
// Delivery_date
let dateSplit1 = response.data[i].Delivery_Date.split(" ");
let date1 =dateSplit1[0].split("-")
let year1 = date1[0];
let month1 = date1[1];
let day1 = date1[2];
let finalDay1 = day1+"-"+month1+"-"+year1
response.data[i].Delivery_Date = finalDay1;
}
//  console.log(response.data)
setSchedulelistdata(response.data); 
});
  } else {
    // If input field has a value, make a POST request with the Cust_Code
    const custCode = e[0].Cust_Code;
    axios.post(baseURL + "/scheduleListProfile/getSchedulesByCustomer", {
      Cust_Code: custCode,
    })
      .then((response) => {
        for(let i =0;i<response.data.length;i++) { 
          // FOR TgtDelDate
          let dateSplit = response.data[i].schTgtDate.split(" ");
          let date =dateSplit[0].split("-")
          let year = date[0];
          let month = date[1];
          let day = date[2];
          let finalDay = day+"-"+month+"-"+year
          response.data[i].schTgtDate = finalDay;
          }
          for(let i =0;i<response.data.length;i++) { 
          // Delivery_date
          let dateSplit1 = response.data[i].Delivery_Date.split(" ");
          let date1 =dateSplit1[0].split("-")
          let year1 = date1[0];
          let month1 = date1[1];
          let day1 = date1[2];
          let finalDay1 = day1+"-"+month1+"-"+year1
          response.data[i].Delivery_Date = finalDay1;
          }
        setSchedulelistdata(response.data);
      })
      .catch((error) => {
        // Handle error, if any
        console.error("Error fetching data:", error);
      });
  }
};

// ...

// The useEffect hook to fetch initial data
useEffect(() => {
  getSchedulistdata(); // Assuming you have this function defined somewhere else
}, []);


 
   useEffect(() => {
     axios
       .post(baseURL + "/scheduleListProfile/getSchedulesByCustomer", {
         Cust_Code: selectedCustomerCode,
       })
       .then((response) => {
         console.log(response.data);
       });
   }, [selectedCustomerCode]);

   
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
       custcode={custcode}
       />
    </div>
  )
}
