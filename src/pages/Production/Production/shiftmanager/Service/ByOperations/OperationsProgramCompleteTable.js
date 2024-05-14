import React, { useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import OperationsCompleteOpenProgram from "./OperationsCompletedOpenProgram";
import { useEffect } from "react";
import { baseURL } from "../../../../../../api/baseUrl";

export default function OperationsProgramCompleteTable({
  proramCompleted,
  onClickOperation,
  onClickProgram,
  onClickMachine,
  setProgramCompleted,
  operation,
}) {
  const [show, setShow] = useState(false);

  const handaleClick = () => {
    setShow(true);
  };
  useEffect(() => {
    axios
      .get(baseURL + "/shiftManagerService/allCompleted")
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
      });
  }, []);

  const [selectProgramCompleted, setSelectProgramCompleted] = useState("");
  const programCompleted = (item, index) => {
    let list = { ...item, index: index };
    setSelectProgramCompleted(list);
  };

  // const[programCompleteData,setProgramCompleteData]=useState([])
  // const SelectedRow=()=>{
  //   axios.post('http://172.16.20.61:5000/shiftManagerProfile/shiftManagerncProgramTaskList',
  //    {...selectProgramCompleted})
  //   .then((response) => {
  //     console.log(response.data);
  //     setProgramCompleteData(response.data)
  // })
  // }

  // let difference=machineProgramesCompleted.ActualTime-machineProgramesCompleted.EstimatedTime;

  //
 const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
 const requestSort = (key) => {
   let direction = "asc";
   if (sortConfig.key === key && sortConfig.direction === "asc") {
     direction = "desc";
   }
   setSortConfig({ key, direction });
 };

 const sortedData = () => {
   const dataCopy = [...proramCompleted];
   if (sortConfig.key) {
     dataCopy.sort((a, b) => {
       if (a[sortConfig.key] < b[sortConfig.key]) {
         return sortConfig.direction === "asc" ? -1 : 1;
       }
       if (a[sortConfig.key] > b[sortConfig.key]) {
         return sortConfig.direction === "asc" ? 1 : -1;
       }
       return 0;
     });
   }
   return dataCopy;
 };


  return (
    <>
      <div>
        <div className="row">
          <div>
            <button
              className="button-style group-button"
              onClick={handaleClick}
            >
              Open Programs
            </button>
          </div>
        </div>

        <div className="row mt-1">
          <div className="col-md-12 col-sm-12">
            <div
              style={{
                height: "200px",
                overflow: "scroll",
                width: "850px",
              }}
            >
              <Table striped className="table-data border">
                <thead className="tableHeaderBGColor">
                <tr>
                    <th onClick={() => requestSort("Task No")}>Task No</th>
                    <th onClick={() => requestSort("Machine")}>Machine</th>
                    <th onClick={() => requestSort("Operation")}>Operation</th>
                    <th onClick={() => requestSort("Plan Time")} style={{textAlign:'right'}}>Plan Time</th>
                    <th onClick={() => requestSort("Actual Time")} style={{textAlign:'right'}}>Actual Time</th>
                    <th onClick={() => requestSort("QTY")} style={{textAlign:'right'}}>QTY</th>
                    <th onClick={() => requestSort("Allotted")} style={{textAlign:'right'}}>Allotted</th>
                    <th onClick={() => requestSort("Processed")} style={{textAlign:'right'}}>Processed</th>
                  </tr>
                </thead>

                <tbody className="tablebody">
                  {proramCompleted &&
                    sortedData().map((item, key) => {
                      return (
                        <>
                          <tr
                            style={{ backgroundColor: item.rowColor }}
                            onClick={() => programCompleted(item, key)}
                            className={
                              key === selectProgramCompleted?.index
                                ? "selcted-row-clr"
                                : ""
                            }
                          >
                            <td style={{ whiteSpace: "nowrap" }}>
                              {item.TaskNo}
                            </td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {item.Machine}
                            </td>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {item.Operation}
                            </td>
                            <td style={{textAlign:'right'}}>{item.NCProgramNo}</td>
                            <td style={{textAlign:'right'}}>{item.EstimatedTime}</td>
                            <td style={{textAlign:'right'}}>{item.ActualTime}</td>
                            <td style={{textAlign:'right'}}>{item.Qty}</td>
                            <td style={{textAlign:'right'}}>{item.QtyAllotted}</td>
                            <td style={{textAlign:'right'}}>{item.QtyCut}</td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      <OperationsCompleteOpenProgram
        show={show}
        setShow={setShow}
        selectProgramCompleted={selectProgramCompleted}
        onClickOperation={onClickOperation}
        onClickProgram={onClickProgram}
        onClickMachine={onClickMachine}
        operation={operation}
        //  programCompleteData={programCompleteData}
        setSelectProgramCompleted={setSelectProgramCompleted}
        setProgramCompleted={setProgramCompleted}
      />
    </>
  );
}
