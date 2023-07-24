import React, {useState, useEffect} from 'react';
import axios from "axios";
import UpdateDayshiftModal from './Modals/UpdateDayshiftModal';
import DeleteDayShiftModal from './Modals/DeleteDayShiftModal';
import ModalPrintDailyShift from './PdfPrinter/DailyshiftTable/ModalPrintDailyShift';
import {baseURL} from '../../.././api/baseUrl';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


function SingleDayShiftEditor({getSingleDayShiftPlan4thTable,rowselectDailyShiftTable,getSecondTableData,
  rowselect,rowSelectFunForDailyShiftTable}) {

  console.log(rowselectDailyShiftTable.Shift_Ic)
  //PRINT DAILY SHIFT
  // let navigate=useNavigate();

  const[openPrintModal,setOpenPrintModal]=useState('');
  const openDailyShiftPrinter = () => {
    console.log(rowselect);
    if (rowselect.item === "" && rowselect.index === 0) {
      toast.error("Please select a Date", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setOpenPrintModal(true);
    }
  };
  

    const[dataShiftIncharge,setDataShiftIncharge]=useState([]);
    const[selectedShiftIncharge,setSelectedShiftIncharge]=useState([]);

    const getShiftInchargeData=async()=>{
        const { data } = await axios.get(baseURL+`/shiftEditor/shiftInchargeList`);
        setDataShiftIncharge(data);
    
      };

    const handleShiftIncharge=(e)=>{
        setSelectedShiftIncharge(e.target.value);
      }


      useEffect(() => {
        getShiftInchargeData();
      }, []);

      useEffect(() => {
        setSelectedShiftIncharge(rowselectDailyShiftTable.Shift_Ic);
      }, [rowselectDailyShiftTable]);

      const onClickUpdateDayShift = () => {
        axios.post(baseURL+'/shiftEditor/updateSingleDaySihiftIncharge', {...rowselectDailyShiftTable , newShift_Ic :selectedShiftIncharge})
        .then((response) => {
        getSingleDayShiftPlan4thTable();
        getSecondTableData();
        toast.success('Shift Instructor Updated',{
          position: toast.POSITION.TOP_CENTER
      })
      })
      }

      const onClickDeleteDayShiftPlan = () => {
        axios.post(baseURL+'/shiftEditor/deleteSingleDayShift', rowselectDailyShiftTable)
        .then((response) => {
        getSingleDayShiftPlan4thTable();
        getSecondTableData();
      })
      }

      //UPDATE DAYSHIFT MODAL
      const[updatedayshift,setUpdatedayshift]=useState('')
      const openUpdatedayshift=()=>{
        setUpdatedayshift(true);
      }

      //DELETEDAYSHIFTMODAL
      const[deletedayshift,setDeletedayshift]=useState('')
      const openDeletedayshift=()=>{
        setDeletedayshift(true);
      }

    return (
      <>
            <ToastContainer />
        <div style={{textAlign:"center",backgroundColor:"#d3d3d3",
        marginTop:"23px",marginLeft:"5px",fontSize:"14px",width:"210px"}}>
          <h6>Daily Shift Editor</h6>
          <div style={{color:"red"}}> <b>Shift Date :  {rowselectDailyShiftTable.ShiftDate}</b></div>
           <br></br>
           <div style={{color:"red"}}><b>Shift : {rowselectDailyShiftTable.Shift}</b></div>

            <div className="col-md-5"style={{textAlign:"center",marginLeft:"40px",width:"120px"}}>
                <label className="form-label">Shift InCharge</label>
                <select className="ip-select" onChange={handleShiftIncharge} value={selectedShiftIncharge}>
                 {dataShiftIncharge.map((dataShiftIncharge) => (
                   <option key={dataShiftIncharge} value={dataShiftIncharge}>
                                   {dataShiftIncharge}
                  </option>
                 ))}
               </select>

            </div>
            <br></br>
            <div>
                From Time 
            </div>
            <div style={{marginLeft:"30px",textAlign:'center',fontSize:"13px",backgroundColor:"white",width:"125px"}}>
              {rowselectDailyShiftTable.FromTime}</div>
            <div>
                To Time 
            </div>
            <div style={{marginLeft:"30px",textAlign:'center',fontSize:"13px",backgroundColor:"white",width:"125px"}}>
              {rowselectDailyShiftTable.ToTime}</div>
          <div style={{textAlign:"center"}}>
            <div>
            <button className="button-style mt-2 group-button mt-4"
              style={{ width: "140px",fontSize:"14px"}} onClick = {openUpdatedayshift}>
              Update Day Shift
            </button>
            </div>
            {/* <div>
            <button className="button-style mt-2 group-button mt-4"
              style={{ width: "140px",fontSize:"14px"}}>
              Save Day Changes 
            </button>
            </div> */}
            <div>
            <button className="button-style mt-2 group-button mt-4"
              style={{ width: "140px",fontSize:"14px"}} onClick = {()=>openDeletedayshift()}>
              Delete Day Shift Plan 
            </button>
            </div>
            <div>
            <button className="button-style mt-2 group-button mt-4"
              style={{ width: "140px",marginBottom:"10px",fontSize:"14px"}}
              onClick={openDailyShiftPrinter}>
               Print Day Shift Plan
            </button>
            </div>
            </div>
            
            
          <UpdateDayshiftModal
          updatedayshift={updatedayshift}
          setUpdatedayshift={setUpdatedayshift}
          onClickUpdateDayShift={onClickUpdateDayShift}
          rowselectDailyShiftTable={rowselectDailyShiftTable}
          selectedShiftIncharge={selectedShiftIncharge}
          />

          <DeleteDayShiftModal
          setDeletedayshift={setDeletedayshift}
          deletedayshift={deletedayshift}
          rowselectDailyShiftTable={rowselectDailyShiftTable}
          onClickDeleteDayShiftPlan={onClickDeleteDayShiftPlan}/>

          <ModalPrintDailyShift openPrintModal={openPrintModal}
          setOpenPrintModal={setOpenPrintModal}
          rowselect={rowselect}/>
   
        </div>
        </>
    );
}

export default SingleDayShiftEditor;