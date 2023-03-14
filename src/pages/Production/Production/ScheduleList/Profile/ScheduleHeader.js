import { PDFDownloadLink } from '@react-pdf/renderer';
import React,{useState} from 'react';
import { useGlobalContext } from '../../../../../Context/Context';
import TryPdf from './TryPdf'

export default function ScheduleHeader() {
  const{schedulelistdata,setSchedulelistdata,schedulelistdatas}=useGlobalContext();
// console.log(schedulelistdata)
const [show,setShow]=useState('');
const openpdfModal=()=>{
  setShow(true);
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
    <div className='row'>
       <div className='col-md-3 col-sm-12 mt-3'>
         <div>
           <h4 className="form-title">Production Schedule Information</h4>
           <div className="col-md-10">
              <label className="">Find Schedule</label>
              <input className="in-field"  type='search' onChange={(e) => searchText(e)}/>
           </div>
        </div>
       </div>

     {/* <PDFDownloadLink document={<TryPdf/>} fileName="FORM">
      {({loading})=>(loading ? <button>loading ..</button> : 
      <button>Download</button>)}
      </PDFDownloadLink>
      <TryPdf/> */}
      

    <div className="col-md-9 col-sm-12">
        <div className="ip-box form-bg mt-5 ">
          <div className='row'>
            <button className="button-style mt-2 group-button"
             style={{ width: "120px"}} onClick={openpdfModal}>
              Reset Status
            </button>

            <button className="button-style mt-2 group-button"
              style={{ width: "120px"}}>
              Show Status
            </button>

            <button className="button-style mt-2 group-button" 
               style={{ width: "120px"}}>
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

            <button className="button-style mt-2 group-button" 
              style={{ width: "120px" }}>
              Design
            </button>
          </div>
      </div>
    </div>
  </div>
  )
}
