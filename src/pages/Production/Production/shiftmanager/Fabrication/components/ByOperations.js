import React from "react";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
import Iframe from "../Iframe";
import { useState,useEffect } from "react";
import axios from "axios";


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
                            defaultCollapsed={true} >

                            {node.serverData.map((data,key) => {
                                const label2 = <span
                                 >{data.Operation}</span>;
                                
                                
                                return (
                                    <TreeView
                                        nodeLabel={label2}
                                        key={data.name }
                                        defaultCollapsed={true}
                                        
                                    
                                    >

                                        {data.Machines.map((value,key) => {
                                            return (
                                                <>
                                              
                                                <div style={{fontSize:'14px'}}>
                                             
                                             <span>{value.refName}</span>
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
            <div>
            {/* <Iframe machineProgramesCompleted = {machineProgramesCompleted} 
                    machineProgramesProcessing= {machineProgramesProcessing}/> */}
            </div>
        </div>
  );
}
