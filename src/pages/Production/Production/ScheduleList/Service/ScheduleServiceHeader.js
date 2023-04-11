import React from 'react';
import { useGlobalContext } from '../../../../../Context/Context';
import { useNavigate, } from 'react-router-dom'



export default function ScheduleServiceHeader() {
  const{schedulelistservicedata,setSchedulelistservicedata,
    schedulelistservicedatas}=useGlobalContext();

    const navigate=useNavigate()
  const openShowStatusPdfService= () => {
    navigate('PrintServiceShowStatus')
  }

  const openShowPartsPdfService = () => {
    console.log("Function called")
    navigate('PrintServiceShowParts');
  }

   const searchText = (e) => {
   let number = e.target.value;
   let filteredData = schedulelistservicedata.filter((data) => {
    return data.OrdSchNo.startsWith(number);
  });
  console.log(schedulelistservicedata.OrdSchNo)
  if (filteredData.length > 0) {
    setSchedulelistservicedata(filteredData);
  }
  if (e.target.value.length === 0) {
    setSchedulelistservicedata(schedulelistservicedatas);
  }
};

  return (
    <div className='row'>
       <div className='col-md-3 col-sm-12 mt-3'>
         <div>
           <h4 className="form-title">Production Schedule Information</h4>
           <div className="col-md-10">
              <label className="">Find Schedule</label>
              <input className="in-field"  type='search'
               onChange={(e) => searchText(e)}/>
           </div>
        </div>
       </div>

    <div className="col-md-9 col-sm-12">
        <div className="mt-5 ">
          <div className='row'>
            <button className="button-style mt-2 group-button"
             style={{ width: "120px"}}>
              Reset Status
            </button>

            <button className="button-style mt-2 group-button"
              style={{ width: "120px"}} onClick={openShowStatusPdfService}>
              Show Status
            </button>

            <button className="button-style mt-2 group-button" 
               style={{ width: "120px"}} onClick={openShowPartsPdfService}>
               Show Parts
            </button>

            <button className="button-style mt-2 group-button"
               style={{ width: "140px"}}>
               Show Programs
            </button>

            <button className="button-style mt-2 group-button" 
             style={{ width: "140px" }}>
             Production list
            </button>

          </div>
      </div>
    </div>
  </div>
  )
}
