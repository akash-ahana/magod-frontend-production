import React from "react"; 
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
import { useState,useEffect } from "react";
import axios from "axios";
import ByOperationNavTab from "./ByOperationNavTab";

export default function ByOperations() {

 const[OperationData,setOperationData]=useState([])
  useEffect(() => {
    axios.get('http://172.16.20.61:5000/shiftManagerProfile/orderByOperations')
        .then((response) => {
          setOperationData(response.data);
          console.log(response.data)
        })
}, [])

const dataSource = [
  {
      type: "Operations",
      collapsed: false,

      serverData: OperationData,
  },
];

const onClickOperation = (Operation) => {
    console.log('The Operation Selected is ' , Operation)
    axios.post('http://172.16.20.61:5000/shiftManagerProfile/OperationProgramesCompleted' , { Operation : Operation})
          .then((response) => {
            console.log('Programs Compleated DATA' , response.data);                  
            setProgramCompleted(response.data);
            for(let i = 0; i< response.data.length ; i++) {
              if(response.data[i].ActualTime < (0.5)*response.data[i].EstimatedTime){
                response.data[i].rowColor = "#339900"
                //break;
              } else if (response.data[i].ActualTime < (0.75)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#82c2b4"
                //break;
              } else if (response.data[i].ActualTime < (0.9)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
                //break;
              }
              else if (response.data[i].ActualTime < (1.1)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
                //break;
              } 
              else if (response.data[i].ActualTime < (1.25)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FF7F50"
                //break;
              } 
              else if (response.data[i].ActualTime < (1.5)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FFA500"
                //break;
              } else {
                response.data[i].rowColor = "#ff0000"
              }
            }
             console.log('AFTER ADDING COLOR' , response.data)
          })

          axios.post('http://172.16.20.61:5000/shiftManagerProfile/OperationProgramesProcessing',{ Operation : Operation})
          .then((response) => {
            console.log('Programs Processing Data is ' , response.data);
            setProgramProcessing(response.data);
            for(let i = 0; i< response.data.length ; i++) {
              if(response.data[i].ActualTime < (0.5)*response.data[i].EstimatedTime){
                response.data[i].rowColor = "#339900"
                //break;
              } else if (response.data[i].ActualTime < (0.75)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#82c2b4"
                //break;
              } else if (response.data[i].ActualTime < (0.9)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
                //break;
              }
              else if (response.data[i].ActualTime < (1.1)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
                //break;
              } 
              else if (response.data[i].ActualTime < (1.25)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FF7F50"
                //break;
              } 
              else if (response.data[i].ActualTime < (1.5)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FFA500"
                //break;
              } else {
                response.data[i].rowColor = "#ff0000"
              }
            }
             console.log('AFTER ADDING COLOR' , response.data)
          })
}

const onClickMachine = (Machine, Operation) => {
    console.log('The Selected Machine is ' , Machine , 'With Operation ' , Operation);
    axios.post('http://172.16.20.61:5000/shiftManagerProfile/OperationMachinesProgramesCompleted' , {MachineName : Machine , Operation : Operation})
          .then((response) => {
            console.log('Programs Compleated DATA' , response.data);   
            setProgramCompleted(response.data);
            for(let i = 0; i< response.data.length ; i++) {
              if(response.data[i].ActualTime < (0.5)*response.data[i].EstimatedTime){
                response.data[i].rowColor = "#339900"
                //break;
              } else if (response.data[i].ActualTime < (0.75)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#82c2b4"
                //break;
              } else if (response.data[i].ActualTime < (0.9)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
                //break;
              }
              else if (response.data[i].ActualTime < (1.1)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
                //break;
              } 
              else if (response.data[i].ActualTime < (1.25)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FF7F50"
                //break;
              } 
              else if (response.data[i].ActualTime < (1.5)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FFA500"
                //break;
              } else {
                response.data[i].rowColor = "#ff0000"
              }
            }
             console.log('AFTER ADDING COLOR' , response.data)
          })

          axios.post('http://172.16.20.61:5000/shiftManagerProfile/OperationMachinesProgramesProcessing',{MachineName : Machine , Operation : Operation})
          .then((response) => {
            console.log('Programs Processing Data is ' , response.data);
            setProgramProcessing(response.data);
            for(let i = 0; i< response.data.length ; i++) {
              if(response.data[i].ActualTime < (0.5)*response.data[i].EstimatedTime){
                response.data[i].rowColor = "#339900"
                //break;
              } else if (response.data[i].ActualTime < (0.75)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#82c2b4"
                //break;
              } else if (response.data[i].ActualTime < (0.9)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
                //break;
              }
              else if (response.data[i].ActualTime < (1.1)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
                //break;
              } 
              else if (response.data[i].ActualTime < (1.25)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FF7F50"
                //break;
              } 
              else if (response.data[i].ActualTime < (1.5)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FFA500"
                //break;
              } else {
                response.data[i].rowColor = "#ff0000"
              }
            }
             console.log('AFTER ADDING COLOR' , response.data)
          })
    
}

const[proramCompleted,setProgramCompleted]=useState([])
const[programProcessing,setProgramProcessing]=useState([])
const onClickProgram = (Operation , Machine , processItem ) => {
    console.log('The Selected Operation is ' , Operation , " Machine is " , Machine , " Program is " , processItem)
    axios.post('http://172.16.20.61:5000/shiftManagerProfile//taskNoProgramNoCompleted' , processItem)
          .then((response) => {
            console.log('Programs Compleated DATA' , response.data);                  
            setProgramCompleted(response.data);
            for(let i = 0; i< response.data.length ; i++) {
              if(response.data[i].ActualTime < (0.5)*response.data[i].EstimatedTime){
                response.data[i].rowColor = "#339900"
                //break;
              } else if (response.data[i].ActualTime < (0.75)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#82c2b4"
                //break;
              } else if (response.data[i].ActualTime < (0.9)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
                //break;
              }
              else if (response.data[i].ActualTime < (1.1)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
                //break;
              } 
              else if (response.data[i].ActualTime < (1.25)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FF7F50"
                //break;
              } 
              else if (response.data[i].ActualTime < (1.5)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FFA500"
                //break;
              } else {
                response.data[i].rowColor = "#ff0000"
              }
            }
             console.log('AFTER ADDING COLOR' , response.data)
          })

          axios.post('http://172.16.20.61:5000/shiftManagerProfile/taskNoProgramNoProcessing',processItem)
          .then((response) => {
            console.log('Programs Processing Data is ' , response.data);
            setProgramProcessing(response.data);
            for(let i = 0; i< response.data.length ; i++) {
              if(response.data[i].ActualTime < (0.5)*response.data[i].EstimatedTime){
                response.data[i].rowColor = "#339900"
                //break;
              } else if (response.data[i].ActualTime < (0.75)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#82c2b4"
                //break;
              } else if (response.data[i].ActualTime < (0.9)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
                //break;
              }
              else if (response.data[i].ActualTime < (1.1)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#f08080"
                //break;
              } 
              else if (response.data[i].ActualTime < (1.25)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FF7F50"
                //break;
              } 
              else if (response.data[i].ActualTime < (1.5)*response.data[i].EstimatedTime) {
                response.data[i].rowColor = "#FFA500"
                //break;
              } else {
                response.data[i].rowColor = "#ff0000"
              }
            }
             console.log('AFTER ADDING COLOR' , response.data)
          })
}

  return (
    <div className="d-flex">
        <div>
            <div className="" style={{ height: "323px", overflowY: "scroll",overflowX:'scroll',width:'330px'}}>   
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
                                style={{fontSize:"14px"}} onClick={() => onClickOperation(data.Operation)}>{data.Operation}</span>;
                                
                                
                                return (
                                    <TreeView
                                        nodeLabel={label2}
                                        key={data.name }
                                        defaultCollapsed={true}
                                        
                                    
                                    >

                                        {data.Machines.map((value,key) => {
                                            const label3 = <span 
                                            style={{fontSize:"13px"}} onClick={() => onClickMachine(value.refName, data.Operation)}>{value.refName}</span>
                                            return (
                                                <>
                                                <TreeView
                                                 nodeLabel={label3}
                                                 key={value.refName }
                                                 defaultCollapsed={true}
                                                >
                                                    {value.process.map((processItem, key) => {
                                                        return(
                                                            <>
                                                            <div style={{fontSize:'10px'}}>
                                                            {processItem.PStatus==='Completed' ? (
                                                              <span onClick={() => onClickProgram(data.Operation , value.refName , processItem )} style={{backgroundColor:"#afbfa1"}}>{processItem.TaskNo} / {processItem.NCProgramNo} - {processItem.PStatus}</span>
                                                            ):
                                                            <span onClick={() => onClickProgram(data.Operation , value.refName , processItem )}>{processItem.TaskNo} / {processItem.NCProgramNo} - {processItem.PStatus}</span>
                                                            }
                                                            </div>
                                                            </>
                                                        )
                                                    })
                                                    }
                                                    {/* {value.process.map((process) => {
                                                        return (
                                                            <span>{process.NCProgramNo}</span>
                                                        )
                                                        
                                                    })} */}
                                                       
                                                </TreeView>
                                              
                                                
                
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
            <div>
            <ByOperationNavTab proramCompleted={proramCompleted}
            programProcessing={programProcessing}
            onClickMachine={onClickMachine}
            onClickProgram={onClickProgram}
            onClickOperation={onClickOperation}/>
            </div>
        </div>
  );
}
