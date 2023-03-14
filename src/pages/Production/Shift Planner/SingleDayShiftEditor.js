import React, {useState, useEffect} from 'react';
import axios from "axios";


function SingleDayShiftEditor(props) {

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
       
        setSelectedShiftIncharge(props.data.Shift_Ic);
        
        
      }, [props.data]);
      console.log('PROPS FROM Single Day Shift Editor ' , props.data)
      const onClickUpdateDayShift = () => {
        console.log('Update Day Shift Button is Clicked' , ' New Shift Inchrge Selected is ' , selectedShiftIncharge)
        axios.post('http://172.16.20.61:5000/shiftEditor/updateSingleDaySihiftIncharge', {...props.data , newShift_Ic :selectedShiftIncharge})
        .then((response) => {console.log(response)
        //getSecondTableData()
        
      })
      }

      const onClickDeleteDayShiftPlan = () => {
        console.log('Delete Daily Shift Plan is Clicked ' , props.data)
        axios.post('http://172.16.20.61:5000/shiftEditor/deleteSingleDayShift', props.data)
        .then((response) => {console.log(response)
        //getSecondTableData()
        
      })
      }
    return (
        <div style={{textAlign:"center",backgroundColor:"lightblue",marginTop:"23px",marginLeft:"5px",fontSize:"14px",width:"210px"}}>

           Shift Date is :  {props.data.ShiftDate}
           <br></br>
           Shift is : {props.data.Shift}

            <div className="col-md-5"style={{textAlign:"center",marginLeft:"60px"}}>
                <label className="form-label">Shift InCharge</label>
                <select className="ip-select" onChange={handleShiftIncharge} value={selectedShiftIncharge}>
                    {dataShiftIncharge.map((dataShiftIncharge) => (
                        <option value={dataShiftIncharge}>{dataShiftIncharge}</option>
                    ))}
                </select>
            </div>
            <br></br>
            <div>
                From Time {props.data.FromTime}
            </div>
            <div>
                To Time {props.data.ToTime}
            </div>
          <div style={{textAlign:"center"}}>
            <div>
            <button className="button-style mt-2 group-button mt-4"
              style={{ width: "140px",fontSize:"14px"}} onClick = {onClickUpdateDayShift}>
              Update Day Shift
            </button>
            </div>
            <div>
            <button className="button-style mt-2 group-button mt-4"
              style={{ width: "140px",fontSize:"14px"}}>
              Save Day Changes 
            </button>
            </div>
            <div>
            <button className="button-style mt-2 group-button mt-4"
              style={{ width: "140px",fontSize:"14px"}} onClick = {onClickDeleteDayShiftPlan}>
              Delete Day Shift Plan 
            </button>
            </div>
            <div>
            <button className="button-style mt-2 group-button mt-4"
              style={{ width: "140px",marginBottom:"10px",fontSize:"14px"}}>
               Print Week Shift Plan
            </button>
            </div>
            </div>
            
            

            
        </div>
    );
}

export default SingleDayShiftEditor;