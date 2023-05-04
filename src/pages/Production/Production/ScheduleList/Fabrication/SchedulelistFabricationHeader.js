import React from 'react';
import { useGlobalContext } from '../../../../../Context/Context';
import { useNavigate, } from 'react-router-dom'
import { useState } from 'react';
import ShowStatusPdfModal from './PrintPdF/ShowStatus/ShowStatusPdfModal';
import ShowPartsPdfModal from './PrintPdF/ShowParts/ShowPartsPdfModal';


export default function ScheduleFabricationHeader() {
  const{schedulelistdata,setSchedulelistdata,schedulelistdatas}=useGlobalContext();
// console.log(schedulelistdata)

// const navigate=useNavigate()
const[openShowStatus,setOpenShowStatus]=useState('')
  const openShowStatusPdf = () => {
    setOpenShowStatus(true)
  }

  const[openShowparts,setOpenShowParts]=useState('')
  const openShowPartsPdf = () => {
    setOpenShowParts(true)
  }

   const searchText = (e) => {
   let number = e.target.value;
   let filteredData = schedulelistdata.filter((data) => {
    return data.OrdSchNo.startsWith(number);
  });
  if (filteredData.length > 0) {
    setSchedulelistdata(filteredData);
  }
  if (e.target.value.length === 0) {
    setSchedulelistdata(schedulelistdatas);
  }
};

  return (
    <div>
       <div className='col-md-12 col-sm-12'>
         <div>
           <h4 className="title">Production Schedule Information</h4>
        </div>
       </div>

    <div className="col-md-12 col-sm-12">
        <div className="mt-2">
          <div className='row'>
          <div className="col-md-3 mt-2">
              <label className="mt-2">Find Schedule</label>
              <input className="in-field my-0"  type='search' onChange={(e) => searchText(e)}/>
           </div>
            <button className="button-style mt-5 ms-5 group-button"
             style={{ width: "120px"}}>
              Reset Status
            </button>

            <button className="button-style mt-5 group-button"
              style={{ width: "120px"}} onClick={openShowStatusPdf}>
              Show Status
            </button>

            <button className="button-style mt-5 group-button" 
               style={{ width: "120px"}} onClick={openShowPartsPdf} >
               Show Parts
            </button>

            <button className="button-style mt-5 group-button"
               style={{ width: "140px"}}>
               Show Programs
            </button>

            <button className="button-style mt-5 group-button" 
             style={{ width: "140px" }}>
             Production list
            </button>
          </div>
      </div>
    </div>
    <ShowStatusPdfModal
      openShowStatus={openShowStatus}
      setOpenShowStatus={setOpenShowStatus}/>

      <ShowPartsPdfModal
      openShowparts={openShowparts}
      setOpenShowParts={setOpenShowParts}/>
  </div>
  )
}
