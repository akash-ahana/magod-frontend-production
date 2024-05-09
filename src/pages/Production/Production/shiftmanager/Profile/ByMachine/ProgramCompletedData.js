import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ProgramCompletedModal from "./ProgramCompletedModal";
import axios from "axios";
import { baseURL } from "../../../../../../api/baseUrl";

export default function ProgramCompletedData({
  machineProgramesCompleted,
  taskNoOnClick,
  MachineOnClick,
  setMachineProgramesCompleted,
  selectedMachine,
}) {
  const [show, setShow] = useState(false);

  const handaleClick = () => {
    setShow(true);
  };

  useEffect(() => {
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
        setMachineProgramesCompleted(response.data);
      });
  }, []);

  const [selectProgramCompleted, setSelectProgramCompleted] = useState({});
  const programCompleted = (item, index) => {
    let list = { ...item, index: index };
    setSelectProgramCompleted(list);
  };

  useEffect(() => {
    if (
      machineProgramesCompleted.length > 0 &&
      !selectProgramCompleted.TaskNo
    ) {
      programCompleted(machineProgramesCompleted[0], 0); // Select the first row
    }
  }, [machineProgramesCompleted]);

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
   const dataCopy = [...machineProgramesCompleted];
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
              className="button-style mt-2 group-button"
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
                overflowY: "scroll",
                overflowX: "scroll",
                width: "850px",
              }}
            >
              <Table striped className="table-data border">
                <thead className="tableHeaderBGColor">
                  <tr>
                    <th onClick={() => requestSort("Task No")}>Task No</th>
                    <th onClick={() => requestSort("Machine")}>Machine</th>
                    <th onClick={() => requestSort("Operation")}>Operation</th>
                    <th onClick={() => requestSort("Plan Time")}>Plan Time</th>
                    <th onClick={() => requestSort("Actual Time")}>Actual Time</th>
                    <th onClick={() => requestSort("QTY")}>QTY</th>
                    <th onClick={() => requestSort("Allotted")}>Allotted</th>
                    <th onClick={() => requestSort("Processed")}>Processed</th>
                  </tr>
                </thead>

                <tbody className="tablebody">
                  {machineProgramesCompleted &&
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
                            <td>
                              {item.TaskNo}
                            </td>
                            <td>
                              {item.Machine}
                            </td>
                            <td>
                              {item.Operation}
                            </td>
                            <td>{item.NCProgramNo}</td>
                            <td>{item.EstimatedTime}</td>
                            <td>{item.ActualTime}</td>
                            <td>{item.Qty}</td>
                            <td>{item.QtyAllotted}</td>
                            <td>{item.QtyCut}</td>
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

      <ProgramCompletedModal
        show={show}
        setShow={setShow}
        selectProgramCompleted={selectProgramCompleted}
        taskNoOnClick={taskNoOnClick}
        MachineOnClick={MachineOnClick}
        setSelectProgramCompleted={setSelectProgramCompleted}
        setMachineProgramesCompleted={setMachineProgramesCompleted}
        selectedMachine={selectedMachine}
        machineProgramesCompleted={machineProgramesCompleted}
        //  programCompleteData={programCompleteData}
        //  setProgramCompleteData={setProgramCompleteData}
      />
    </>
  );
}
