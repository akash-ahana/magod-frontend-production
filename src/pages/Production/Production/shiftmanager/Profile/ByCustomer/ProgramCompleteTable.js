import React, { useState } from "react";
import { Table } from "react-bootstrap";
import OperationsCompleteOpenProgram from "./CompletedOpenProgram";
import CompleteOpenProgram from "./CompletedOpenProgram";
import { useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../../../../../api/baseUrl";

export default function ProgramCompleteTable({
  proramCompleted,
  onClickCustomer,
  onClickPrograms,
  setProgramCompleted,
  custCode,
}) {
  const [show, setShow] = useState(false);

  const handaleClick = () => {
    setShow(true);
  };

  const [selectProgramCompleted, setSelectProgramCompleted] = useState("");
  const programCompleted = (item, index) => {
    let list = { ...item, index: index };
    setSelectProgramCompleted(list);
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
        setProgramCompleted(response.data);
      });
  }, []);

  return (
    <>
      <div>
        <div className="row mt-2">
          <button
            className="button-style mt-2 group-button"
            style={{ width: "150px", marginLeft: "20px" }}
            onClick={handaleClick}
          >
            Open Programs
          </button>
        </div>

        <div className="row mt-3">
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
                  {proramCompleted &&
                    proramCompleted.map((item, key) => {
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

      <CompleteOpenProgram
        show={show}
        setShow={setShow}
        selectProgramCompleted={selectProgramCompleted}
        onClickCustomer={onClickCustomer}
        onClickPrograms={onClickPrograms}
        setSelectProgramCompleted={setSelectProgramCompleted}
        custCode={custCode}
        setProgramCompleted={setProgramCompleted}
      />
    </>
  );
}
