import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Table } from 'react-bootstrap';

export default function AllotmentTables() {
  const [newSelectedMchine, setNewSelectedMachine] = useState("")

  const[allotmentTable,setAllotmentTable]=useState([]);
  useEffect(()=>{
    axios.get('http://172.16.20.61:5000/machineAllotmentService/machineAllotmentServiceSchedule')
    .then((response) => {
        console.log("data", response.data)
        for(let i =0;i<response.data.length;i++) { 
          let dateSplit = response.data[i].Delivery_Date.split("-");
        let year = dateSplit[0];
        let month = dateSplit[1];
        let day = dateSplit[2];

        let newDay = day.split(" ")
        let onlyDay = newDay[0]
        console.log(onlyDay +  "-" + month + "-" + year)

        response.data[i].Delivery_Date = onlyDay +  "-" + month + "-" + year
       }

        setAllotmentTable(response.data);
    })
  },[])

  const[scheduleListData,setScheduleList]=useState([])
  const[rowSelect,setRowSelect]=useState({})
  const RowSelectAllotmentTable=(item,index)=>{
    console.log(item ,  'item is ')
    axios.post('http://172.16.20.61:5000/machineAllotment/machineAllotmentScheduleTableForm',item)
    .then((response) => {
        setScheduleList(response.data)
    })
    let list={...item,index:index}
    setRowSelect(list);
  }

  const[tableRowSelect,setTableRowSelect]=useState({})
  const[rowselect,setRowselect]=useState({})
  const[machineList,setMachineList]=useState([])
  const RowSelect=(item,index)=>{
    console.log('right table select is ' , item)
    axios.post('http://172.16.20.61:5000/machineAllotmentService/machineAllotmentScheduleTableFormMachinesService',item)
    .then((response) => {
        console.log("OnClick Post response", response.data)

        setMachineList(response.data)
    })
    let list={...item,index:index}
    setTableRowSelect(item);
    setRowselect(list)
  }


  //Search
  const searchText = (e) => {
    let number = e.target.value;
    let filteredData = allotmentTable.filter((data) => {
     return data.OrdSchNo.startsWith(number);
   });
   if (filteredData.length > 0) {
    setAllotmentTable(filteredData);
   }
   if (e.target.value.length === 0) {
    setAllotmentTable(allotmentTable);
   }
 };

  useMemo(()=>{
    setTableRowSelect({...scheduleListData[0],index:0})
  },[scheduleListData[0]])


  const onChangeMachine = (e) => {
    console.log('Machine is Changed' , e.target.value)
    setNewSelectedMachine(e.target.value)
  }

  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  const onClickChangeMachine = async (e) => {
    e.preventDefault();
    console.log('On Click Change Machine ' , tableRowSelect , 'new Machine is ' , newSelectedMchine)

    axios.post('http://172.16.20.61:5000/machineAllotment/changeMachineInForm',{...tableRowSelect ,  newMachine : newSelectedMchine})
    .then((response) => {
        //console.log("OnClick Post response",response.data)
    })
    await delay(200);
    console.log('Selected Row from right table is ' , tableRowSelect)
    axios.post('http://172.16.20.61:5000/machineAllotment/formRefresh',tableRowSelect)
    .then((response) => {
        console.log("OnClick Post response change machine", response.data[0])
        //setMachineList(response.data)
        setTableRowSelect(response.data[0])
    })
  }

  console.log('Current State of Table Row Select' , tableRowSelect)

  

  const onClickReleaseForProgramming = async (e) => {
    e.preventDefault();
    console.log(' Release For Programming Button Is Clicked ' , tableRowSelect)
    axios.post('http://172.16.20.61:5000/machineAllotment/releaseForProgramming',tableRowSelect)
    .then((response) => {
        console.log("OnClick Post response", response.data)
   })
   await delay(200);

   
   axios.post('http://172.16.20.61:5000/machineAllotment/formRefresh',tableRowSelect)
    .then((response) => {
        console.log("OnClick Post response", response.data)
        //setMachineList(response.data)
        setTableRowSelect(response.data[0])
    })
  }

  return (
    <>
    <div className='col-md-12'>
      <div className="col-md-3 mb-2 ms-3">
              <label >Find Schedule</label>
              <input className="in-field" style={{marginTop:"-6px"}}  type='search' onChange={(e) => searchText(e)}/>
      </div>

      <div className='row mt-3' >
        <div className='col-md-6' style={{ overflowY: 'scroll', overflowX: 'scroll',height:"750px" }}>
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor">
              <tr>
                <th style={{whiteSpace:"nowrap"}}>Shedule No</th>
                <th style={{whiteSpace:"nowrap"}}>Delivery Date</th>
                <th>Customer</th>
                <th>Status</th>
                <th style={{whiteSpace:"nowrap"}}>Special_instruction</th>

              </tr>
            </thead>

                  <tbody className='tablebody'>
                    {allotmentTable.map((item,key)=>{
                      return(
                        <>
                           <tr onClick={()=>{RowSelectAllotmentTable(item,key)}} 
                               className={key===rowSelect?.index? 'selcted-row-clr':'' } >
                            <td>{item.OrdSchNo}</td>
                            <td>{item.Delivery_Date}</td>
                            <td>{item.Cust_name}</td>
                            <td>{item.Schedule_Status}</td>
                            <td>{item.Special_Instructions}</td>
                          </tr>
                        </>
                      )
                    })}
                  </tbody>
          </Table>
        </div >

        {/* Form */}
        <div className='col-md-6'  >
          
            <form className="form"  >
              <div className="ip-box form-bg">
                  <div className="row">
                    <div className="col-md-12 ">
                      <label className="">Customer</label>
                      <input className="in-field"
                        value={tableRowSelect.Cust_name}/>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 ">
                      <label className="">Task no</label>
                      <input className="in-field"
                        value={tableRowSelect.TaskNo} />
                    </div>
                    <div className="col-md-6 ">
                      <label className="">Status</label>
                      <input className="in-field"
                      value={tableRowSelect.TStatus} />
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-md-12 ">
                      <label className="">Material</label>
                      <input className="in-field"
                        value={tableRowSelect.Mtrl_Code}/>
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-md-6">
                        <label className="">Process</label>
                        <input className="in-field mt-2" 
                          value={tableRowSelect.MProcess} />
                    </div>
                    <div className="col-md-6">
                        <label className="">Select machine</label>
                        <select className="ip-select dropdown-field mt-2"  onChange = {(e) => onChangeMachine(e)}>
                          <option value={tableRowSelect.Machine} selected>{tableRowSelect.Machine}</option>
                    {machineList.map((value,key)=>{
                      return(
                        <>
                          <option value={value.refName}>{value.refName}</option>
                        </>
                      )
                    })}
                  </select>
                    </div>
                  </div>


                  <div className="row">
                    <div className="col-md-6">
                      <label className="">Priority</label>
                      <input className="in-field"
                        value={tableRowSelect.Priority} />
                    </div>

                    <div className="col-md-6 mt-3">
                          <button onClick={onClickChangeMachine} style={{width:"160px"}} className="button-style mt-3 group-button"
                          disabled={rowSelect.Schedule_Status=='Completed' ? true : false}>
                            Change Machine
                          </button>
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-md-6">
                      <label className="">Machine</label>
                      <input className="in-field" value={tableRowSelect.Machine}/>
                    </div>
                    <div className="col-md-6">
                          <button onClick={onClickReleaseForProgramming} style={{width:"160px",height:"55px"}}
                          className="button-style group-button ">
                            Release For <br/>
                            Programming
                          </button>
                    </div>
                  </div>

              </div>
            </form>


            {/* //TABLE3 */}

            <div className='mt-2' style={{ height: "300px", overflowY: "scroll", overflowX: "scroll" }}>
              <Table striped className="table-data border">
                <thead className="tableHeaderBGColor">
                  <tr>

                    <th style={{whiteSpace:"nowrap"}}>Task No</th>
                    <th>Machine</th>
                    <th>Operation</th>
                    <th>Mtrl_code</th>
                    <th>Priority</th>
                    <th style={{whiteSpace:"nowrap"}}>Estimated time</th>


                  </tr>
                </thead>


                      <tbody className='tablebody'>
                        {scheduleListData.map((value,key)=>{
                          return(
                            <>
                            <tr onClick={()=>{RowSelect(value,key)}} 
                               className={key===rowselect?.index? 'selcted-row-clr':'' } >
                               <td>{value.TaskNo}</td>
                               <td>{value.Machine}</td>
                               <td>{value.Operation}</td>
                               <td>{value.Mtrl_Code}</td>
                               <td>{value.Priority}</td>
                               <td>{value.EstimatedTime}</td>
                          </tr>
                            </>
                          )
                        })}
                      </tbody>
              </Table>
            </div>
          </div>
      </div>
      </div>
    </>
  );
}
