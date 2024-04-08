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

  console.log(selectProgramCompleted);

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
                    <th style={{ whiteSpace: "nowrap" }}>Task No</th>
                    <th>Machine</th>
                    <th>Operation</th>
                    <th style={{ whiteSpace: "nowrap" }}>Program No</th>
                    <th style={{ whiteSpace: "nowrap" }}>Plan Time</th>
                    <th style={{ whiteSpace: "nowrap" }}>Actual Time</th>
                    <th>QTY</th>
                    <th>Allotted</th>
                    <th>Processed</th>
                  </tr>
                </thead>

                <tbody className="tablebody">
                  {machineProgramesCompleted &&
                    machineProgramesCompleted.map((item, key) => {
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
