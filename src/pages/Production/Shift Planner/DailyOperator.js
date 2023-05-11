import React, {useState, useEffect} from 'react';
import axios from "axios";
import AddOperatorModal from './Modals/AddOperatorModal';
import DeleteOperatorForDay from './Modals/DeleteOperatorfordayModal';
import { baseURL } from '../../../api/baseUrl';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function DailyOperator(props) {
  console.log(props.data);

    const [selectedMachine , setSelectedMachine] = useState('');
    const [ dataMachineList, setDataMachineList] = useState([]);
    const [dataOperatorList, setDataOperatorList] = useState([]);
    const [selectedOperator, setSelectedOperator] = useState('');

    const getMachineListData = async () => {
        const { data } = await axios.get(baseURL+`/productionSetup/getallmachines`);
        //console.log('Machine List' , data)
        setDataMachineList(data);
      };
    
      const getOperatorListData=async()=>{
        const { data } = await axios.get(baseURL+`/shiftEditor/getMachineOperators`);
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

      // console.log('Selected Machine after setting in the daily set ' , selectedMachine)
      // console.log('Selected Operator after Setting',selectedOperator);
      // console.log('PROPS FROM Daily Week operator box is ', props.data)
      // console.log('MAIN PROPS', props.selectMachineOperatorData)

      useEffect(() => {
        getMachineListData(); 
        getOperatorListData();
      }, []);

      const [MachineOperatorDay, setMachineOperatorDay] = useState([])


      const createDailyOperatorList = () => {
         console.log('createDailyOperatorList is clicked ' , ' Machine Selected is ' , selectedMachine , ' operator Selected is ' , selectedOperator, 'Shift is ' , props.data)
        //setMachineOperatorDay({ShiftDate : props.data.ShiftDate , Shift : props.data.Shift , FromTime: props.data.FromTime , ToTime : props.data.ToTime , Machine : selectedMachine , Operator : selectedOperator , DayShiftID : props.data.DayShiftId})
        axios.post(baseURL+'/shiftEditor/setMachineOperatorDay' , {ShiftDate : props.data.ShiftDate , Shift : props.data.Shift, FromTime: props.data.FromTime , ToTime : props.data.ToTime, 
        Machine : selectedMachine , Operator : selectedOperator , DayShiftID : props.data.DayShiftId }
    ).then((response) => {console.log(response)
        props.getMachineOperatorTableData();
        toast.success('Machine Operator Added',{
          position: toast.POSITION.TOP_CENTER
      })
    })
}


    const onDeleteOperatorForDay = () => {
        // console.log('Delete Operator For day is Clicked',props.rowselectMachineOperator);
        axios.post(baseURL+'/shiftEditor/deleteMachineOperatorDay',
         props.rowselectMachineOperator)
        .then((response) => {console.log(response)
          props.getMachineOperatorTableData();
          toast.success('Machine Opearator Deleted',{
            position: toast.POSITION.TOP_CENTER
        })
        //getSecondTableData()
        //setMachineOperatorDay('')
      })
    }

    //AddOperator
    const[addoperator,setAddoperator]=useState('');
    const openAddoperator=()=>{
      setAddoperator(true);
    }


    //DeleteOperator
    const[deleteoperator,setDeleteoperator]=useState('');
    const openDeleteoperator=()=>{
      setDeleteoperator(true);
    }
    return (
        <div style={{textAlign:"center",backgroundColor:"lightgrey",marginTop:"5px",marginLeft:"5px",fontSize:"14px"}}>
              <ToastContainer/>
            <div>
                <div style={{color:"red"}}><b>{props.data.Shift} Shift</b></div>
            </div>
            <div className="col-md-11"style={{display:"flex"}}> 
                 <div style={{marginLeft:"5px"}}>
                 <label className="form-label">Machine</label>
                 </div>
                 <div style={{marginLeft:"33px",marginTop:"6px"}}>
                 <select className="ip-select" onChange={handleMachineChange}>
                  <option selected>{props.rowselectMachineOperator.Machine}</option>
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
                  <option selected>{props.rowselectMachineOperator.Operator}</option>
                 {dataOperatorList.map((dataOperatorList)=>(
                  <option value={dataOperatorList.Name}>{dataOperatorList.Name}</option>
                  ))}
                 </select>
                </div>
              </div>

              <button className="button-style mt-2 group-button mt-4"
               style={{ width: "150px",fontSize:"14px"}}  onClick={()=>createDailyOperatorList()}>
               Add Operator for Day
            </button>


            {/* //need    \state from daily Shift Table and machine operator table      */}
            <button className="button-style mt-2 group-button mt-4"
               style={{ width: "160px",fontSize:"14px",marginBottom:"10px"}} 
               onClick = {()=>onDeleteOperatorForDay()}>
               Delete Operator For Day
            </button>

        <AddOperatorModal  
        addoperator={addoperator}
        setAddoperator={setAddoperator}
        />

        <DeleteOperatorForDay
        deleteoperator={deleteoperator}
        setDeleteoperator={setDeleteoperator}/>   
        </div>
    );
}

export default DailyOperator;