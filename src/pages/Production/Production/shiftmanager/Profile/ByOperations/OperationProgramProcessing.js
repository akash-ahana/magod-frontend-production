import React from "react";
// import { Link } from 'react-router-dom';
// import { Schedulelistdata4 } from '../../ScheduleList/ScheduleListdata';
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import OperationsProcessingModal from "./OperationsProcessingModal";
import { baseURL } from "../../../../../../api/baseUrl";

export default function OperationProgramProcessing({
  programProcessing,
  setProgramProcessing,
  onClickMachines,
  operation,
}) {
  const [show, setShow] = useState(false);
  const [machineData, setMachineData] = useState([]);

  const handaleClick = () => {
    setShow(true);
  };

  const [selectProgramProcessing, setSelectProgramProcessing] = useState("");
  const programProcessingrow = (item, index) => {
    let list = { ...item, index: index };
    setSelectProgramProcessing(list);
  };

  useEffect(() => {
    axios
      .get(baseURL + "/shiftManagerProfile/profileMachines")
      .then((response) => {
        console.log("Current State of programCompleteData", response.data);
        setMachineData(response.data);
      });
  }, []);

  useEffect(() => {
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
  }, []);

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
   const dataCopy = [...programProcessing];
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
                overflowY: "scroll",
                overflowX: "scroll",
                width: "850px",
              }}
            >
              <Table striped className="table-data border table-space">
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

                {programProcessing &&
                  sortedData().map((item, key) => {
                    return (
                      <>
                        <tbody className="tablebody">
                          <tr
                            style={{ backgroundColor: item.rowColor }}
                            onClick={() => programProcessingrow(item, key)}
                            className={
                              key === selectProgramProcessing?.index
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
                        </tbody>
                      </>
                    );
                  })}
              </Table>
            </div>
            <OperationsProcessingModal
              show={show}
              setShow={setShow}
              selectProgramProcessing={selectProgramProcessing}
              machineData={machineData}
              onClickMachines={onClickMachines}
              operation={operation}
              setProgramProcessing={setProgramProcessing}
              //  taskNoOnClick={taskNoOnClick}
            />
          </div>
        </div>

        {/* <div className="col-md-12 col-sm-12 mt-3">
      <div
        className="table-data"
        style={{overflowY: "scroll" }}>
        <Tables theadData={getHeadings2()} tbodyData={Schedulelistdata4} />
      </div>
    </div> */}
      </div>

      {/* {
  (
    <CustomModal 
    show={show}
     setShow={setShow}/>
  )
} */}
    </>
  );
}
