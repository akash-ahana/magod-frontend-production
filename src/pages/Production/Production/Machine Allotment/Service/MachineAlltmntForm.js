import axios from 'axios';
import React,{useState, useEffect} from 'react'
import ChangeMachinePopUp from './NCprogrmTab/ChangeMachinePopup';
import NavTab from './NavTab';
import TreeView from 'react-treeview';


export default function MachineAlltmntForm() {
    const [machineProcessData, setMachineProcessData] = useState([])
    const [machineList , setMachineList] = useState([])
    const [selectedMachine , setSelectedMachine] = useState("")
    const [machineSelect,setMachineSelect]=useState({})
    const selectedMachineFun=(item,index)=>{
        let list={...item,index:index}
        setMachineSelect(list);
      }

      const[selectNcProgram,setSelectProgram]=useState({})
      // const selectRowNcProgram=(item,index)=>{
      //   let list={...item,index:index}
      //   setSelectProgram(list);
      // }
      // console.log(selectNcProgram);
      
    const [ncProgramsTableData , setNcProgramsTableData] = useState([])
    const onClickMachine = (Machine, key) => {
        console.log('Selected Machine is ' , Machine)
        axios.post('http://172.16.20.61:5000/machineAllotmentService/getNCprogramTabTableData',{MachineName : Machine})
        .then((response) => {
            console.log("data", response.data);
            setNcProgramsTableData(response.data)
            for(let i = 0; i< response.data.length ; i++){
              response.data[i].isChecked = false;
            }
        })
    }

    const [selectedRows, setSelectedRows] = useState([]);
  //SELECTED ROWS IS THE STATE TO CHANGE THE MACHINES 
  const handleCheckboxChange = (item, key) => {
    console.log(item)
    console.log('ncProgramsTableData', ncProgramsTableData)

     const constncProgramsTableData = ncProgramsTableData
    if(ncProgramsTableData[key].isChecked === true) {
      constncProgramsTableData[key].isChecked = false
    } 
    else {
      constncProgramsTableData[key].isChecked = true
    }
     setNcProgramsTableData(constncProgramsTableData)
  if(selectedRows.length === 0){
    console.log('First ITem is SET')
    axios.post('http://172.16.20.61:5000/machineAllotmentService/machineAllotmentScheduleTableFormMachinesService', item)
        .then((response) => {
            console.log("data of machinnes", response.data);
            //setNcProgramsTableData(response.data)
            setMachineList(response.data)
           
        })
    setSelectedRows([item])
  } else {
    console.log()
    if(item.Operation === selectedRows[0].Operation){
      if (selectedRows.includes(item)) {
        setSelectedRows(selectedRows.filter(r => r !== item));
        } else {
          setSelectedRows([...selectedRows , item])
        }
    } else {
      alert('Please select a program with the same operation')
      console.log('Item is ' , item , ' key is ' , key)
      console.log('ncProgramsTableData' , ncProgramsTableData)
      const constNCProgramsTableData = ncProgramsTableData
      constNCProgramsTableData[key].isChecked = false
      setNcProgramsTableData(constNCProgramsTableData)
    }
  }
  };


    useEffect(() => {
        axios.get('http://172.16.20.61:5000/machineAllotmentService/serviceListMachines')
            .then((response) => {
                // console.log("data", response.data)
                setMachineProcessData(response.data)
            })
    }, [])

    const dataSource = [
        {
            type: "Machines",
            collapsed: false,
            serverData: machineProcessData,
        },
    ];
   
    // \\\\\\\\\\\\\\\\\/////////////////////

    const [open, setOpen]=useState("");

    const showPopup=()=>{
      setOpen(true);
    }

   // console.log('API DATA IS ' , machineProcessData)

   const clickChangeMachine=()=>{
    console.log("Change Machine Button Clicked" , selectedRows , " Selected Machine is " , selectedMachine)
    // for( let i  = 0 ; i<selectedRows.length ; i++) {
    //   selectedRows[i].newMachine = selectedMachine
    // }
    axios.post('http://172.16.20.61:5000/machineAllotment/changeMachineHeaderButton' , {programs : selectedRows , newMachine : selectedMachine })
    .then((response) => {
         console.log("data", response.data)
       // setMachineProcessData(response.data)
    })
   }

   const onMachineChange = (e) => {
    console.log('On Machine Change' , e.target.value)
    setSelectedMachine(e.target.value)
   }

  return (
    <>
       <div className='row '>
           <div className='row mb-3'>
                  <div className='col-md-4 mt-3'  >    
                     <h4 className="form-title">Machine  Allotment Form</h4>
                  </div>
  
    

 <div className="col-md-8 col-sm-12"   >
     <div className="ip-box  mt-2" >
       <div className='row' >
         <button className="button-style mt-2 group-button" 
            style={{ width: "140px"}}>
            Save
         </button>

         <button className="button-style mt-2 group-button" 
          style={{ width: "150px" }} onClick={clickChangeMachine}>
          Change Machine
         </button>

         <div className="col-md-4">
         <select className="ip-select dropdown-field" onChange={(e) => onMachineChange(e)}>
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
   </div>
 </div>
</div>
<hr className="horizontal-line" />


<div className='row'>
  <div className='col-md-3'> 
  <div style={{overflowY:"scroll"}}>
{dataSource.map((node, i) => {
                    const type = node.type;
                    const label = <span className="node">{type}</span>;
                    return (
                        <TreeView
                            key={type + "|" + i}
                           nodeLabel={label}
                            defaultCollapsed={true} >

                            {node.serverData.map((data,key) => {
                                const label2 = <span 
                                onClick={()=>{
                                    selectedMachineFun(data,key)
                                    onClickMachine(data,key)
                                }} 
                                className={key===machineSelect?.index? 'selcted-row-clr':'' }>{data.MachineName}</span>;
                                
                                return (
                                    <TreeView
                                        nodeLabel={label2}
                                        key={data.name }
                                        defaultCollapsed={true}
                                    >
                                        
                                        {data.process.map((value) => {
                                            return (
                                                <>
                                              
                                                <div>
                                             <span className="node">{value.RefProcess}</span>
                                                </div>
                                               
                                                </>
                                            )
                                        })}  
                                     
                                    </TreeView>);
                            })}
                        </TreeView>
                    );
                })}
            
           
            </div>
  </div>
  <div className='col-md-9'>
    <NavTab machineSelect={machineSelect}
    ncProgramsTableData={ncProgramsTableData}
    //selectRowNcProgram={selectRowNcProgram}
    selectNcProgram={selectNcProgram}
    setNcProgramsTableData={setNcProgramsTableData}
    handleCheckboxChange={handleCheckboxChange}
    />
  </div>
</div>



   
</div>

  
  {
    open &&(
     < ChangeMachinePopUp open={open} setOpen={setOpen} />
    )
  }

  </>

  );
}
