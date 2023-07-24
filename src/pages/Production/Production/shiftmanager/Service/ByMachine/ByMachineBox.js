import axios from "axios";
import React,{useState , useEffect} from "react";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
// import ProgramCompletedData from "./ProgramCompletedData";
import Iframe from "./Iframe";
import { baseURL } from '../../../../../../api/baseUrl';

export default function ByMachineBox() {

  const [machineProcessData, setMachineProcessData] = useState([])
  const [machineProgramesCompleted, setMachineProgramesCompleted] = useState([])
  const [machineProgramesProcessing, setmachineProgramesProcessing] = useState([])
  const [selectedMachine, setSelectedMachine]= useState([])
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    setLoading(true); // Set loading state to true before fetching data
      axios.get(baseURL+'/shiftManagerService/serviceListMachinesTaskNo')
          .then((response) => {
              setMachineProcessData(response.data);
              setLoading(false); // Set loading state to false in case of error
          })
  }, [])

  const [selectLaser,setSelectLaser]=useState('');
    const LaserRowselect=(item,index)=>{
      let list={...item,index:index}
      // console.log("ScheduleNo",item.ScheduleNo)
      setSelectLaser(list);
    }

    const[selectProgramCompleted,setSelectProgramCompleted]=useState('');
     const programCompleted=(item,index)=>{
      let list={...item,index:index}
      setSelectProgramCompleted(list);
    }

  
  const taskNoOnClick = (Machine, TaskNo) => {
    console.log('Task No on Click is ' , TaskNo)
    axios.post(baseURL+'/shiftManagerProfile/taskNoProgramNoCompleted' , TaskNo)
          .then((response) => {
            console.log('Programs Compleated DATA' , response.data);
            for(let i = 0; i< response.data.length ; i++) {
              if(response.data[i].ActualTime < (0.5)*response.data[i].EstimatedTime){
                response.data[i].rowColor = "#339900"
              } else if (response.data[i].ActualTime < (0.75)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#82c2b4"
              } else if (response.data[i].ActualTime < (0.9)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
              }
              else if (response.data[i].ActualTime < (1.1)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
              } 
              else if (response.data[i].ActualTime < (1.25)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FF7F50"
              } 
              else if (response.data[i].ActualTime < (1.5)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FFA500"
              } else {
                response.data[i].rowColor = "#ff0000"
              }
            }
             console.log('AFTER ADDING COLOR' , response.data)                   
            setMachineProgramesCompleted(response.data)
          })

          axios.post(baseURL+'/shiftManagerProfile/taskNoProgramNoProcessing' , TaskNo)
          .then((response) => {
            console.log(response.data)
            for(let i = 0; i< response.data.length ; i++) {
              if(response.data[i].ActualTime < (0.5)*response.data[i].EstimatedTime){
                response.data[i].rowColor = "#339900"
              } else if (response.data[i].ActualTime < (0.75)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#82c2b4"
              } else if (response.data[i].ActualTime < (0.9)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
              }
              else if (response.data[i].ActualTime < (1.1)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
              } 
              else if (response.data[i].ActualTime < (1.25)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FF7F50"
              } 
              else if (response.data[i].ActualTime < (1.5)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FFA500"
              } else {
                response.data[i].rowColor = "#ff0000"
              }
            }
             console.log('AFTER ADDING COLOR' , response.data) 
            setmachineProgramesProcessing(response.data)
          })
  }

  console.log("Color code in data set",machineProgramesCompleted)
  

  const MachineOnClick = (Machine) => {
    console.log(' Machine Selected is ' , Machine)
    setSelectedMachine(Machine)
    axios.post(baseURL+'/shiftManagerProfile/profileListMachinesProgramesCompleted' , {MachineName : Machine})
          .then((response) => {
            console.log(response.data)
            console.log('Programs Compleated DATA 1' , response.data);
            
            for(let i = 0; i< response.data.length ; i++) {
              if(response.data[i].ActualTime < (0.5)*response.data[i].EstimatedTime){
                response.data[i].rowColor = "#339900"
              } else if (response.data[i].ActualTime < (0.75)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#82c2b4"
              } else if (response.data[i].ActualTime < (0.9)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
              }
              else if (response.data[i].ActualTime < (1.1)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
              } 
              else if (response.data[i].ActualTime < (1.25)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FF7F50"
              } 
              else if (response.data[i].ActualTime < (1.5)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FFA500"
              } else {
                response.data[i].rowColor = "#ff0000"
              }
            }
             console.log('AFTER ADDING COLOR' , response.data) 
            setMachineProgramesCompleted(response.data)
          })
          

          axios.post(baseURL+'/shiftManagerProfile/profileListMachinesProgramesProcessing' , {MachineName : Machine})
          .then((response) => {
            console.log(response.data)
            for(let i = 0; i< response.data.length ; i++) {
              if(response.data[i].ActualTime < (0.5)*response.data[i].EstimatedTime){
                response.data[i].rowColor = "#339900"
              } else if (response.data[i].ActualTime < (0.75)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#82c2b4"
              } else if (response.data[i].ActualTime < (0.9)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
              }
              else if (response.data[i].ActualTime < (1.1)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
              } 
              else if (response.data[i].ActualTime < (1.25)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FF7F50"
              } 
              else if (response.data[i].ActualTime < (1.5)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FFA500"
              } else {
                response.data[i].rowColor = "#ff0000"
              }
            }
             console.log('AFTER ADDING COLOR' , response.data) 
            setmachineProgramesProcessing(response.data);
          })
  }

console.log(machineProcessData);
  const dataSource = [
      {
          type: "Machines",
          collapsed: false,
          serverData: machineProcessData,
      },
  ];

const onClickMachineLabel=()=>{
  axios.get(baseURL+'/shiftManagerProfile/allCompleted')
          .then((response) => {
            for(let i = 0; i< response.data.length ; i++) {
              if(response.data[i].ActualTime < (0.5)*response.data[i].EstimatedTime){
                response.data[i].rowColor = "#339900"
              } else if (response.data[i].ActualTime < (0.75)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#82c2b4"
              } else if (response.data[i].ActualTime < (0.9)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
              }
              else if (response.data[i].ActualTime < (1.1)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
              } 
              else if (response.data[i].ActualTime < (1.25)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FF7F50"
              } 
              else if (response.data[i].ActualTime < (1.5)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FFA500"
              } else {
                response.data[i].rowColor = "#ff0000"
              }
            }
            console.log("response  machine list",response.data)
            setMachineProgramesCompleted(response.data)
          })
          axios.get(baseURL+'/shiftManagerProfile/allProcessing')
          .then((response) => {
            for(let i = 0; i< response.data.length ; i++) {
              if(response.data[i].ActualTime < (0.5)*response.data[i].EstimatedTime){
                response.data[i].rowColor = "#339900"
              } else if (response.data[i].ActualTime < (0.75)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#82c2b4"
              } else if (response.data[i].ActualTime < (0.9)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
              }
              else if (response.data[i].ActualTime < (1.1)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
              } 
              else if (response.data[i].ActualTime < (1.25)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FF7F50"
              } 
              else if (response.data[i].ActualTime < (1.5)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FFA500"
              } else {
                response.data[i].rowColor = "#ff0000"
              }
            }
            console.log("response  machine list",response.data)
            setmachineProgramesProcessing(response.data)
          })
}

  return (
    <div className="d-flex">
        <div className=""
          style={{
            height: "323px",
            overflowY: "scroll",
            overflowX: "scroll",
            width: "330px",
          }}>
        {loading ? (
        <b>Loading...</b>
      ) : (
            <div className="" style={{ height: "323px", overflowY: "scroll",overflowX:'scroll',width:'330px'}}>   
                {dataSource.map((node, i) => {
                    const type = node.type;
                    const label = <span className="node" onClick={onClickMachineLabel}>{type}</span>;
                    return (
                        <TreeView
                            key={type + "|" + i}
                           nodeLabel={label}
                            defaultCollapsed={false} >

                            {node.serverData.map((data,key) => {
                                const label2 = <span style={{fontSize:"14px",backgroundColor:'#C0C0C0'}}
                                 onClick={() => {MachineOnClick(data.MachineName)
                                    LaserRowselect(data,key)}}className={key===selectLaser?.index? 'selcted-row-clr':'' }>{data.MachineName}</span>;
                                
                                
                                return (
                                    <TreeView
                                        nodeLabel={label2}
                                        key={data.name }
                                        defaultCollapsed={true}
                                        onClick={()=>LaserRowselect(data,key)} className={key===selectLaser?.index? 'selcted-row-clr':'' }
                                        
                                    >
                                        <ui>
                                        {data.process.map((value,key) => {
                                            return (
                                                <>
                                              
                                                <div style={{fontSize:'10px'}} onClick={() => taskNoOnClick(data.MachineName, value)
}>
                                             
                                             {value.PStatus==="Completed" ? (
                                                <li className="completed" style={{backgroundColor:'#afbfa1'}}>{value.TaskNo} / {value.Mtrl_Code} / {value.NCProgramNo} / {value.PStatus}</li> 
                                             ):<li className="node">{value.TaskNo} / {value.Mtrl_Code} / {value.NCProgramNo} / {value.PStatus}</li> 
                                                   
                                             }
                                                </div>
                
                                                </>
                                            )
                                        })}  
                                        </ui>
                                     
                                    </TreeView>);
                            })}
                        </TreeView>
                    );
                })}



            </div>
                  )}

        </div>   
            <div>
            <Iframe machineProgramesCompleted = {machineProgramesCompleted} 
                    machineProgramesProcessing= {machineProgramesProcessing}
                    taskNoOnClick={taskNoOnClick}
                    MachineOnClick={MachineOnClick}
                    selectProgramCompleted={selectProgramCompleted}
                    programCompleted={programCompleted}
                    setmachineProgramesProcessing={setmachineProgramesProcessing}
                    //onClickCloseProgram={onClickCloseProgram}
                    setMachineProgramesCompleted={setMachineProgramesCompleted}
                    />
            </div>
        </div>
  );
}
