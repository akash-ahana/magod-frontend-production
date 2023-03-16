import React, {useState, useEffect} from 'react';
import axios from "axios";
import { height } from '@mui/system';


function DailyOperator(props) {

    const [selectedMachine , setSelectedMachine] = useState('');
    const [ dataMachineList, setGetShiftTypesData] = useState([]);
    const[dataOperatorList, setDataOperatorList] = useState([]);
    const[selectedOperator, setSelectedOperator] = useState('');

    const getMachineListData = async () => {
        const { data } = await axios.get(`http://172.16.20.61:5000/productionSetup/getallmachines`);
        //console.log('Machine List' , data)
        setGetShiftTypesData(data);
      };
    
      const getOperatorListData=async()=>{
        const { data } = await axios.get(`http://172.16.20.61:5000/shiftEditor/getMachineOperators`);
        //console.log('Operator List',data);
        setDataOperatorList(data);
         
      }

      const handleMachineChange = (e) =>  {
        //console.log("MachineSelected!!");
        //selectedShift = e.target.value;
        setSelectedMachine(e.target.value);
      };
      
      const handleOperatorList=(e)=>{
        //console.log("Operator List Selected");
        setSelectedOperator(e.target.value);
    
      }

      console.log('Selected Machine after setting in the daily set ' , selectedMachine)
      console.log('Selected Operator after Setting',selectedOperator);
      console.log('PROPS FROM Daily Week operator box is ', props.data)
      console.log('PROPS FROM Daily Week operator box is Machine Operator DATA', props.selectMachineOperatorData)

      useEffect(() => {
        getMachineListData(); 
        getOperatorListData();
        
      }, []);

      const [MachineOperatorDay, setMachineOperatorDay] = useState([])

      useEffect(() => {
        axios.post('http://172.16.20.61:5000/shiftEditor/setMachineOperatorDay', MachineOperatorDay)
        .then((response) => {console.log(response)
        //getSecondTableData()
        setMachineOperatorDay('')
      })
      },[MachineOperatorDay])

      const createDailyOperatorList = () => {
        console.log('createDailyOperatorList is clicked ' , ' Machine Selected is ' , selectedMachine , ' operator Selected is ' , selectedOperator, 'Shift is ' , props.data)
        setMachineOperatorDay({ShiftDate : props.data.ShiftDate , Shift : props.data.Shift , FromTime: props.data.FromTime , ToTime : props.data.ToTime , Machine : selectedMachine , Operator : selectedOperator , DayShiftID : props.data.ShiftId})
    }



    const onDeleteOperatorForDay = () => {
        console.log('Delete Operator For day is Clicked')
        axios.post('http://172.16.20.61:5000/shiftEditor/deleteMachineOperatorDay', props.selectMachineOperatorData)
        .then((response) => {console.log(response)
        //getSecondTableData()
        //setMachineOperatorDay('')
      })
    }


    return (

        <div style={{backgroundColor:"lightgrey",marginTop:"5px",marginLeft:"5px",fontSize:"14px",height:"250px"}}>
            <div style={{color:'red',marginLeft:"5px"}}>
              <b>  {props.data.Shift} Shift</b>
            </div>
            <div className="col-md-11"style={{display:"flex"}}> 
                 <div style={{marginLeft:"5px"}}>
                 <label className="form-label">Machine</label>
                 </div>
                 <div style={{marginLeft:"33px",marginTop:"6px"}}>
                 <select className="ip-select" onChange={handleMachineChange}>
                 {dataMachineList.map((dataMachineList) => (
                    <option value={dataMachineList.refName}>{dataMachineList.refName}</option>
                   ))}
                    
                 </select>
                 </div>
              </div>

              <div className="col-md-11" style={{display:"flex"}}>
                <div style={{marginLeft:"5px"}} >
                <label className="form-label">Operator</label>
                </div>
                <div style={{marginLeft:"30px",marginTop:"6px"}}>
                <select className="ip-select" onChange={handleOperatorList}>
                 {dataOperatorList.map((dataOperatorList)=>(
                  <option value={dataOperatorList.Name}>{dataOperatorList.Name}</option>
                  ))}
                 </select>
                </div>
              </div>

              <button className="button-style mt-2 group-button mt-4"
               style={{ width: "150px",fontSize:"14px",marginLeft:"30px"}} onClick = {createDailyOperatorList}>
               Add Operator for Day
            </button>


            {/* //need    \state from daily Shift Table and machine operator table      */}
            <button className="button-style mt-2 group-button mt-4"
               style={{ width: "160px",fontSize:"14px",marginBottom:"10px",marginLeft:"27px"}} onClick = {onDeleteOperatorForDay}>
               Delete Operator For Day
            </button>


            
        </div>
    );
}

export default DailyOperator;