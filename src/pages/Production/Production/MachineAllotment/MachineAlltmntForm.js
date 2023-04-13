import axios from 'axios';
import React,{useState, useEffect} from 'react';
import TreeView from 'react-treeview';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";


import PriorityTable from './NCprogrmTab/PriorityTable';
import AllotmentTables from './MachineAlltmntTab/AllotmentTables';
import ChangeMachinePopUp from './NCprogrmTab/ChangeMachinePopup';


export default function MachineAlltmntForm() {
    const [machineProcessData, setMachineProcessData] = useState([])

    const [key, setKey] = useState("ncprogram");

    useEffect(() => {
        axios.get('http://172.16.20.61:5000/shiftManagerProfile/profileListMachines')
            .then((response) => {
                console.log("data", response.data)
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

  return (
    <>
    
       <div className='row'>
        
    <div className='col-md-4  mt-3'  >    
        <h4 className="form-title"  >Machine  Allotment Form</h4>
    </div>
  
    

 <div className="col-md-6 col-sm-12"   >
     <div className="ip-box form-bg mt-2 " >
       <div className='row' >

         <button className="button-style mt-2 group-button" 
            style={{ width: "140px"}}>
            Save
         </button>

         <button className="button-style mt-2 group-button" 
          style={{ width: "140px" }} onClick={showPopup}>
          change machine
         </button>

         <div className="col-md-4 mt-2">
                
                 <select className="ip-select">
                    <option value="option 1"> Name</option>
                    <option value="option 1">Name</option>
                    <option value="option 1">Name</option>
                 </select>
              </div>
       </div>
   </div>
 </div>
 
</div>
   


{/* ///////////////////// */}
  <div className='row'>
<div className="col-md-3 mt-4" style={{ height: "205px", overflowY: "scroll" }}>
 
{dataSource.map((node, i) => {
                    const type = node.type;
                    const label = <span className="node">{type}</span>;
                    return (
                        <TreeView
                            key={type + "|" + i}
                           nodeLabel={label}
                            defaultCollapsed={true} >

                            {node.serverData.map((data) => {
                                const label2 = <span className="node">{data.MachineName}</span>;
                                
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



        {/* \\\\\\\\\ ///////*/}

    <div className='col-md-9' >
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 mt-3 tab_font "
    >
      <Tab eventKey="ncprogram" title="Nc program">
       <PriorityTable/>
      </Tab>

      <Tab eventKey="machineAllotment" title="Machine Allotment">
        <AllotmentTables/>
      </Tab>
    </Tabs>
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
