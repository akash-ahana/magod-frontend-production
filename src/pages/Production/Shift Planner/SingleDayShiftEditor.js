import React, {useState, useEffect} from 'react';
import axios from "axios";
import UpdateDayshiftModal from './UpdateDayshiftModal';
import DeleteDayShiftModal from './DeleteDayShiftModal';
import { useNavigate} from 'react-router-dom'


function SingleDayShiftEditor({getSingleDayShiftPlan4thTable,rowselectDailyShiftTable,getSecondTableData,
  rowselect}) {

  console.log(rowselectDailyShiftTable)
  //PRINT DAILY SHIFT
  let navigate=useNavigate();
  const openDailyShiftPrinter=()=>{
    navigate("PrintDailyplan",{state:{rowselect:rowselect}});
  }

    const[dataShiftIncharge,setDataShiftIncharge]=useState([]);
    const[selectedShiftIncharge,setSelectedShiftIncharge]=useState([]);

    const getShiftInchargeData=async()=>{
        const { data } = await axios.get(`http://172.16.20.61:5000/shiftEditor/shiftInchargeList`);
        //console.log('Shift In Charge',data);
        setDataShiftIncharge(data);
    
      };

    const handleShiftIncharge=(e)=>{
        //console.log("Shift in charge selected");
        setSelectedShiftIncharge(e.target.value);
      }

      useEffect(() => {
        getShiftInchargeData();
      }, []);

      useEffect(() => {
        setSelectedShiftIncharge(rowselectDailyShiftTable.Shift_Ic);
      }, [rowselectDailyShiftTable]);
      // console.log('PROPS FROM Single Day Shift Editor ' , rowselectDailyShiftTable)
      const onClickUpdateDayShift = () => {
        // console.log('Update Day Shift Button is Clicked' , ' New Shift Inchrge Selected is ' , selectedShiftIncharge)
        axios.post('http://172.16.20.61:5000/shiftEditor/updateSingleDaySihiftIncharge', {...rowselectDailyShiftTable , newShift_Ic :selectedShiftIncharge})
        .then((response) => {console.log(response)
        //getSecondTableData()
        getSingleDayShiftPlan4thTable();
        getSecondTableData();
      })
      }

      const onClickDeleteDayShiftPlan = () => {
        // console.log('Delete Daily Shift Plan is Clicked ' , rowselectDailyShiftTable)
        axios.post('http://172.16.20.61:5000/shiftEditor/deleteSingleDayShift', rowselectDailyShiftTable)
        .then((response) => {console.log(response)
        //getSecondTableData()
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
        <div style={{textAlign:"center",backgroundColor:"lightblue",
        marginTop:"23px",marginLeft:"5px",fontSize:"14px",width:"210px"}}>

          <div style={{color:"red"}}> <b>Shift Date :  {rowselectDailyShiftTable.ShiftDate}</b></div>
           <br></br>
           <div style={{color:"red"}}><b>Shift : {rowselectDailyShiftTable.Shift}</b></div>

            <div className="col-md-5"style={{textAlign:"center",marginLeft:"40px",width:"120px"}}>
                <label className="form-label">Shift InCharge</label>
                <select className="ip-select" onChange={handleShiftIncharge}>
                  <option selected>{rowselectDailyShiftTable.Shift_Ic}</option>
                    {dataShiftIncharge.map((dataShiftIncharge) => (
                        <option value={dataShiftIncharge}>{dataShiftIncharge}</option>
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
              style={{ width: "140px",fontSize:"14px"}} onClick = {()=>{openUpdatedayshift()
                onClickUpdateDayShift()}}>
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
          rowselectDailyShiftTable={rowselectDailyShiftTable}/>

          <DeleteDayShiftModal
          setDeletedayshift={setDeletedayshift}
          deletedayshift={deletedayshift}
          rowselectDailyShiftTable={rowselectDailyShiftTable}
          onClickDeleteDayShiftPlan={onClickDeleteDayShiftPlan}/>
   
        </div>
    );
}

export default SingleDayShiftEditor;