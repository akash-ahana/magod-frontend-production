import React from "react";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ByOperationNavTab from "./ByOperationNavTab";
import { baseURL } from "../../../../../../api/baseUrl";

export default function ByOperations() {
  const [OperationData, setOperationData] = useState([]);
  const [selectedLabelIndex, setSelectedLabelIndex] = useState(-1);
  const [selectedMachineIndex, setSelectedMachineIndex] = useState(-1);
  const [isPageRefreshed, setIsPageRefreshed] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const[operation,setOperation]=useState('')

  const selectedMachineFun = (item, index) => {
    setSelectedMachineIndex(index);
    setSelectedLabelIndex(-1);
  };

  useEffect(() => {
    const isPageRefreshed = localStorage.getItem("isPageRefreshed") === "true";
    setIsPageRefreshed(isPageRefreshed);
    localStorage.setItem("isPageRefreshed", false);
  }, []);

  useEffect(() => {
    axios
      .get(baseURL + "/shiftManagerService/orderByOperationsService")
      .then((response) => {
        setOperationData(response.data);
        setIsLoading(false); // Data has been fetched, set loading to false
        console.log(response.data);
      });
  }, []);
  

  const dataSource = [
    {
      type: "Operations",
      collapsed: false,
      serverData: OperationData.map((data, index) => ({
        ...data,
        labelIndex: index,
      })),
    },
  ];

  //ONCLICK OPERATION
  const [selectoperation, setSelectoperation] = useState("");
  const onOperationRowClick = (item, index) => {
    let list = { ...item, index: index };
    // console.log("ScheduleNo",item.ScheduleNo)
    setSelectoperation(list);
    setOperation(list.Operation)
  };

  console.log(operation)

  const onClickOperation = (Operation) => {
    console.log("The Operation Selected is ", Operation);
    axios
      .post(baseURL + "/shiftManagerProfile/OperationProgramesCompleted", {
        Operation: Operation,
      })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
            //break;
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
            //break;
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
            //break;
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        console.log("AFTER ADDING COLOR", response.data);
        setProgramCompleted(response.data);
      });

    axios
      .post(baseURL + "/shiftManagerProfile/OperationProgramesProcessing", {
        Operation: Operation,
      })
      .then((response) => {
        console.log("Programs Processing Data is ", response.data);
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
            //break;
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
            //break;
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
            //break;
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        console.log("AFTER ADDING COLOR", response.data);
        setProgramProcessing(response.data);
      });
  };

  const onClickMachine = (Machine, Operation) => {
    console.log(
      "The Selected Machine is ",
      Machine,
      "With Operation ",
      Operation
    );
    axios
      .post(
        baseURL + "/shiftManagerProfile/OperationMachinesProgramesCompleted",
        { MachineName: Machine, Operation: Operation }
      )
      .then((response) => {
        console.log("Programs Compleated DATA", response.data);
        setProgramCompleted(response.data);
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
            //break;
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
            //break;
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
            //break;
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        console.log("AFTER ADDING COLOR", response.data);
      });

    axios
      .post(
        baseURL + "/shiftManagerProfile/OperationMachinesProgramesProcessing",
        { MachineName: Machine, Operation: Operation }
      )
      .then((response) => {
        console.log("Programs Processing Data is ", response.data);
        setProgramProcessing(response.data);
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
            //break;
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
            //break;
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
            //break;
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        console.log("AFTER ADDING COLOR", response.data);
      });
  };

  const [proramCompleted, setProgramCompleted] = useState([]);
  const [programProcessing, setProgramProcessing] = useState([]);
  const onClickProgram = (Operation, Machine, processItem) => {
    console.log(
      "The Selected Operation is ",
      Operation,
      " Machine is ",
      Machine,
      " Program is ",
      processItem
    );
    axios
      .post(
        baseURL + "/shiftManagerProfile//taskNoProgramNoCompleted",
        processItem
      )
      .then((response) => {
        console.log("Programs Compleated DATA", response.data);
        setProgramCompleted(response.data);
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
            //break;
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
            //break;
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
            //break;
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        console.log("AFTER ADDING COLOR", response.data);
      });

    axios
      .post(
        baseURL + "/shiftManagerProfile/taskNoProgramNoProcessing",
        processItem
      )
      .then((response) => {
        console.log("Programs Processing Data is ", response.data);
        setProgramProcessing(response.data);
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
            //break;
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
            //break;
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
            //break;
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
            //break;
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        console.log("AFTER ADDING COLOR", response.data);
      });
  };

  const onClickMachines = (index) => {
    axios
      .get(baseURL + "/shiftManagerProfile/allProcessing")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        console.log("response  machine list", response.data);
        setProgramProcessing(response.data);
      });
    axios
      .get(baseURL + "/shiftManagerProfile/allCompleted")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].ActualTime <
            0.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#339900";
          } else if (
            response.data[i].ActualTime <
            0.75 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#82c2b4";
          } else if (
            response.data[i].ActualTime <
            0.9 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.1 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#f08080";
          } else if (
            response.data[i].ActualTime <
            1.25 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FF7F50";
          } else if (
            response.data[i].ActualTime <
            1.5 * response.data[i].EstimatedTime
          ) {
            response.data[i].rowColor = "#FFA500";
          } else {
            response.data[i].rowColor = "#ff0000";
          }
        }
        console.log("response  machine list", response.data);
        setProgramCompleted(response.data);
        setSelectedLabelIndex(index);
        setSelectedMachineIndex(-1);
        setIsPageRefreshed(false);
        localStorage.setItem("isPageRefreshed", false);     
      });
  };

  useEffect(() => {
    onClickMachines();
  }, []);

  return (
    <div className="d-flex">
      <div
        className=""
        style={{
          height: "323px",
          overflowY: "scroll",
          overflowX: "scroll",
          width: "330px",
        }}
      >
        {isLoading ? (
          <p>Loading...</p>
        ) : OperationData.length > 0 ? (
          // Render the tree structure when OperationData is available
          <div>
            {dataSource &&
              dataSource?.map((node, i) => {
                const type = node.type;
                const label = (
                  <span
                    className={`node ${
                      selectedLabelIndex === node.labelIndex
                        ? "selcted-row-clr"
                        : ""
                    }`}
                    onClick={() => onClickMachines(node.labelIndex)}
                  >
                    {type}
                  </span>
                );
                return (
                  <TreeView
                    key={type + "|" + i}
                    nodeLabel={label}
                    defaultCollapsed={false}
                  >
                    {node?.serverData.map((data, key) => {
                      const label2 = (
                        <span
                          style={{ fontSize: "14px", backgroundColor: "#C0C0C0" }}
                          onClick={() => {
                            selectedMachineFun(data, key);
                            onClickOperation(data?.Operation);
                            onOperationRowClick(data, key);
                          }}
                          className={
                            key === selectoperation?.index
                              ? "selcted-row-clr"
                              : ""
                          }
                        >
                          {data?.Operation}
                        </span>
                      );
  
                      return (
                        <TreeView
                          nodeLabel={label2}
                          key={data?.name}
                          defaultCollapsed={true}
                        >
                          <ul>
                            {data?.Machines.map((value, key) => {
                              const label3 = (
                                <span
                                  style={{ fontSize: "13px" }}
                                  onClick={() =>
                                    onClickMachine(value?.refName, data?.Operation)
                                  }
                                >
                                  {value?.refName}
                                </span>
                              );
                              return (
                                <TreeView
                                  nodeLabel={label3}
                                  key={value?.refName}
                                  defaultCollapsed={true}
                                >
                                  {value?.process.map((processItem, key) => (
                                    <div style={{ fontSize: "10px" }}>
                                      {processItem?.PStatus === "Completed" ? (
                                        <li
                                          style={{
                                            backgroundColor: "#afbfa1",
                                          }}
                                        >
                                          {processItem?.TaskNo} /{" "}
                                          {processItem?.NCProgramNo} -{" "}
                                          {processItem?.PStatus}
                                        </li>
                                      ) : (
                                        <li
                                          onClick={() =>
                                            onClickProgram(
                                              data?.Operation,
                                              value?.refName,
                                              processItem
                                            )
                                          }
                                        >
                                          {processItem?.TaskNo} /{" "}
                                          {processItem?.NCProgramNo} -{" "}
                                          {processItem?.PStatus}
                                        </li>
                                      )}
                                    </div>
                                  ))}
                                </TreeView>
                              );
                            })}
                          </ul>
                        </TreeView>
                      );
                    })}
                  </TreeView>
                );
              })}
          </div>
        ) : (
          // Display a message when OperationData is empty
          <p>No operation data available.</p>
        )}
      </div>
      <div>
        <ByOperationNavTab
          proramCompleted={proramCompleted}
          programProcessing={programProcessing}
          onClickMachine={onClickMachine}
          onClickProgram={onClickProgram}
          onClickOperation={onClickOperation}
          setProgramCompleted={setProgramCompleted}
          setProgramProcessing={setProgramProcessing}
          onClickMachines={onClickMachines}
          operation={operation}
        />
      </div>
    </div>
  );  
}
