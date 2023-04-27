import axios from 'axios';
import React,{useState, useEffect, useMemo} from 'react'
// import ChangeMachinePopUp from './NCprogrmTab/ChangeMachinePopup';
import NavTab from './NavTab';
import TreeView from 'react-treeview';
import ChangeMachineModal from './ChangeMachineModal';


export default function MachineAlltmntForm() {
    const [machineProcessData, setMachineProcessData] = useState([])
    const [machineList , setMachineList] = useState([])
    const [selectedMachine , setSelectedMachine] = useState("")
    const [machineSelect,setMachineSelect]=useState({})
    const selectedMachineFun=(item,index)=>{
        let list={...item,index:index}
        setMachineSelect(list);
      }

      const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

      //open Change Machine Popup
      const[openModal,setOpenModal]=useState('')
      const openChangeMachineModal=()=>{
        setOpenModal(true);
      }

      const handleClose=()=>{
        setOpenModal(false);
        setSelectedRows([])
      }
    

      const[selectNcProgram,setSelectProgram]=useState({})
      // const selectRowNcProgram=(item,index)=>{
      //   let list={...item,index:index}
      //   setSelectProgram(list);
      // }
      // console.log(selectNcProgram);
      
    const [ncProgramsTableData , setNcProgramsTableData] = useState([])
    const [selectedMachineTreeView , setSelectedMachineTreeView] = useState("")
    const [selectedRows, setSelectedRows] = useState([]);
    
    const onClickMachine = (Machine, key) => {
        setSelectedRows([])
       //console.log('Selected Rows are  ' , selectedRows)
        setSelectedMachineTreeView(Machine)
        axios.post('http://172.16.20.61:5000/machineAllotment/getNCprogramTabTableData',{MachineName : Machine})
        .then((response) => {
          
          //  console.log("data", response.data);
            setNcProgramsTableData(response.data)
            for(let i = 0; i< response.data.length ; i++){
              response.data[i].isChecked = false;
            }
        })
        setSelectedRows([])
    }
    console.log(' Selected Rows Current State ' , selectedRows)
   
  //SELECTED ROWS IS THE STATE TO CHANGE THE MACHINES 
  const handleCheckboxChange = (item, key) => {
   // console.log(item)
   // console.log('ncProgramsTableData', ncProgramsTableData)

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
    axios.post('http://172.16.20.61:5000/machineAllotment/machineAllotmentScheduleTableFormMachines', item)
        .then((response) => {
           // console.log("data of machinnes", response.data);
            //setNcProgramsTableData(response.data)
            setMachineList(response.data)
           
        })
    setSelectedRows([item])
  } else {
  //  console.log()
    if(item.Operation === selectedRows[0].Operation){
      if (selectedRows.includes(item)) {
        setSelectedRows(selectedRows.filter(r => r !== item));
        } else {
          setSelectedRows([...selectedRows , item])
        }
    } else {
      alert('Please select a program with the same operation')
    //  console.log('Item is ' , item , ' key is ' , key)
    //  console.log('ncProgramsTableData' , ncProgramsTableData)
      const constNCProgramsTableData = ncProgramsTableData
      constNCProgramsTableData[key].isChecked = false
      setNcProgramsTableData(constNCProgramsTableData)
    }
  }
  };


  const treeViewData=()=>{
    axios.get('http://172.16.20.61:5000/machineAllotment/profileListMachineswithLoad')
            .then((response) => {
                // console.log("data", response.data)
                setMachineProcessData(response.data)
            })
  }
    useEffect(() => {
      treeViewData();
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

   const clickChangeMachine=async ()=>{
   // console.log("Change Machine Button Clicked" , selectedRows , " Selected Machine is " , selectedMachine)
    axios.post('http://172.16.20.61:5000/machineAllotment/changeMachineHeaderButton' , {programs : selectedRows , newMachine : selectedMachine })
    .then((response) => {
         console.log("data", response.data)
       onClickMachine();
       handleClose();
       //setSelectedRows([])
    })

    await delay(200);
    
    axios.post('http://172.16.20.61:5000/machineAllotment/getNCprogramTabTableData',{MachineName : selectedMachineTreeView})
        .then((response) => {
          //  console.log("data", response.data);
            setNcProgramsTableData(response.data)
            for(let i = 0; i< response.data.length ; i++){
              response.data[i].isChecked = false;
            }
        })
        treeViewData();
        setSelectedRows([])
   }

  
   useMemo(()=>{
    setMachineSelect({...machineProcessData[0],index:0})
    console.log(machineProcessData[0]?.MachineName)
    setSelectedMachineTreeView(machineProcessData[0]?.MachineName)
  },[machineProcessData[0]])

  console.log(machineSelect)

  useEffect(() => {
    console.log('USE EFFECT RAN' , selectedMachineTreeView)
    //console.log(selectedMachineTreeView)
    axios.post('http://172.16.20.61:5000/machineAllotment/getNCprogramTabTableDatauseEffect',{MachineName : selectedMachineTreeView})
        .then((response) => {
           console.log("data", response.data);
            setNcProgramsTableData(response.data)
            for(let i = 0; i< response.data.length ; i++){
              response.data[i].isChecked = false;
            }
        })
  },[selectedMachineTreeView])
  
   const onMachineChange = (e) => {
   // console.log('On Machine Change' , e.target.value)
    setSelectedMachine(e.target.value)
   }
   console.log(' Selected Rows Current State ' , selectedRows)
  return (
    <>
       <div className='row '>
           <div className='row mb-3'>
                  <div className='col-md-12'>    
                     <h4 className="title">Machine  Allotment Form</h4>
                  </div>
            </div>
    
    <div className="col-md-12 col-sm-12 ms-5">
     <div className="ip-box mt-2 ms-5">
       <div className='row ms-5'>
         <button className="button-style mt-2 group-button ms-5" 
            style={{width:"140px"}}>
            Save
         </button>

         <button className="button-style mt-2 group-button" 
          style={{ width: "150px" }} onClick={()=>
            openChangeMachineModal()}>
          Change Machine
         </button>

         <div className="col-md-4">
                
         <select className="ip-select dropdown-field" onChange={(e) => onMachineChange(e)}>
          <option>Select Machine</option>
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
{/* <hr className="horizontal-line mt-2" /> */}


<div className='row mt-3'>
  <div className='col-md-3'> 
  <div style={{overflowY:"scroll",fontSize:"12px",marginLeft:"-20px",height:"380px"}}>
{dataSource.map((node, i) => {
                    const type = node.type;
                    const label = <span className="node">{type}</span>;
                    return (
                        <TreeView
                            key={type + "|" + i}
                           nodeLabel={label}
                            defaultCollapsed={false} >

                            {node.serverData.map((data,key) => {
                                const label2 = <span 
                                onClick={()=>{
                                    selectedMachineFun(data,key)
                                    onClickMachine(data,key)
                                }} 
                                className={key===machineSelect?.index? 'selcted-row-clr':'' }>{data.MachineName} &nbsp;{data.formattedLoad}</span>;
                                
                                return (
                                    <TreeView
                                        nodeLabel={label2}
                                        key={data.name }
                                        defaultCollapsed={false}
                                    >
                                        
                                        {data.process.map((value) => {
                                            return (
                                                <>
                                              
                                                <div>
                                             <span className="node">{value.RefProcess} &nbsp; {value.formattedLoad}</span>
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
    selectNcProgram={selectNcProgram}
    setNcProgramsTableData={setNcProgramsTableData}
    handleCheckboxChange={handleCheckboxChange}
    />
  </div>
</div>
</div>

  <ChangeMachineModal
  openModal={openModal}
  setOpenModal={setOpenModal}
  selectedRows={selectedRows}
  selectedMachine={selectedMachine}
  clickChangeMachine={clickChangeMachine}
  handleClose={handleClose}/>

  </>

  );
}
