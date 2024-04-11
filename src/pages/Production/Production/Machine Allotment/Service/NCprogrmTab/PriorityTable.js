import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ModalPrintPriority from "../PrintPriortyTable/ModalPrintPriority";

export default function PriorityTable({
  machineSelect,
  ncProgramsTableData,
  selectNcProgram,
  setNcProgramsTableData,
  handleCheckboxChange,
}) {
  const [priorityTable, setPriorityTable] = useState([]);
  let constspriorityTabel = [];

  useEffect(() => {}, [priorityTable]);

  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  const selectRowTable = (item) => {
    if (priorityTable.includes(item)) {
    } else {
      setPriorityTable([...priorityTable, item]);
    }
  };

  const selectRowPriorityTable = (row) => {
    var id = row.Ncid;
    let constPriorityTable = priorityTable;
    let filteredList = priorityTable.filter((item) => {
      return item?.Ncid != id;
    });

    //  console.log( 'Const Priority Table Data is ' , filteredList)
    setPriorityTable(filteredList);
  };

  const [openPrint, setOpenPrint] = useState("");
  const openPrintPriority = () => {
    setOpenPrint(true);
  };

  return (
    <>
      <ModalPrintPriority
        openPrint={openPrint}
        setOpenPrint={setOpenPrint}
        priorityTable={priorityTable}
      />

      <div className="col-md-12">
        <div className="row">
          <div
            className="col-md-6"
            style={{
              overflowY: "scroll",
              overflowX: "scroll",
              height: "375px",
            }}
          >
            <Table striped className="table-data border">
              <thead className="tableHeaderBGColor">
                <tr>
                  <th>Select</th>
                  <th style={{ whiteSpace: "nowrap" }}>Program No</th>
                  <th style={{ whiteSpace: "nowrap" }}>Task No</th>
                  <th>Machine</th>
                  <th>Operation</th>
                  <th>Material</th>
                  <th>Cust_Name</th>
                  <th>Source</th>
                  <th>Allotted</th>
                  <th>Processed</th>
                  <th>Status</th>
                  <th>PlanTime</th>
                  <th style={{ whiteSpace: "nowrap" }}>Actual Time</th>
                  <th>Remarks</th>
                </tr>
              </thead>

              <tbody className="tablebody table-space">
                {ncProgramsTableData.map((item, key) => {
                  return (
                    <>
                      <tr
                        style={{ backgroundColor: item.rowColor }}
                        onDoubleClick={() => selectRowTable(item)}
                        className={
                          key === priorityTable?.index ? "selcted-row-clr" : ""
                        }
                      >
                        <td>
                          <input
                            className="form-check-input mt-2"
                            type="checkbox"
                            value={item}
                            onChange={() => handleCheckboxChange(item, key)}
                            //data-row-value={item}
                            checked={item.isChecked}
                            id="flexCheckDefault"
                          />
                        </td>
                        <td>{item.NCProgramNo}</td>
                        <td>{item.TaskNo}</td>
                        <td>{item.Machine}</td>
                        <td>{item.Operation}</td>
                        <td>{item.Mtrl_Code}</td>
                        <td>{item.Cust_name}</td>
                        <td>{item.CustMtrl}</td>
                        <td>{item.QtyAllotted}</td>
                        <td>{item.QtyCut}</td>
                        <td>{item.PStatus}</td>
                        <td>{item.EstimatedTime}</td>
                        <td>{item.ActualTime}</td>
                        <td>{item.Remarks}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </div>

          {/* priority print */}

          <div className="col-md-6">
            <div>
              <div
                className="d-flex"
                style={{ backgroundColor: "#F2D7D5", gap: "10px" }}
              >
                <div>
                  <label className="form-label">Production Priority list</label>
                </div>
                <div>
                  <button
                    className="button-style group-button"
                    onClick={openPrintPriority}
                  >
                    Print
                  </button>
                </div>
              </div>

              {/* Table2 */}

              <div
                style={{
                  height: "340px",
                  overflowY: "scroll",
                  overflowX: "scroll",
                }}
              >
                {/* <h6 style={{textAlign:"center"}} className='mt-1 ms-1'>Priority Table</h6> */}
                <Table striped className="table-data border">
                  <thead className="tableHeaderBGColor">
                    <tr>
                      <th style={{ whiteSpace: "nowrap" }}>Program No</th>
                      <th style={{ whiteSpace: "nowrap" }}>Task No</th>
                      <th>Machine</th>
                      <th>Operation</th>
                      <th>Material</th>
                      <th>Cust_Name</th>
                      <th>Source</th>
                      <th>Allotted</th>
                      <th>Processed</th>
                      <th>Status</th>
                      <th>PlanTime</th>
                      <th style={{ whiteSpace: "nowrap" }}>Actual Time</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>

                  <tbody className="tablebody table-space">
                    {priorityTable.map((priorityTable) => (
                      <tr
                        key={priorityTable?.Ncid}
                        onDoubleClick={() =>
                          selectRowPriorityTable(priorityTable)
                        }
                      >
                        <td>{priorityTable?.NCProgramNo}</td>
                        <td>{priorityTable?.TaskNo}</td>
                        <td>{priorityTable?.Machine}</td>
                        <td>{priorityTable?.Operation}</td>
                        <td>{priorityTable?.Mtrl_Code}</td>
                        <td>{priorityTable?.Cust_name}</td>
                        <td>{priorityTable?.CustMtrl}</td>
                        <td>{priorityTable?.QtyAllotted}</td>
                        <td>{priorityTable?.QtyCut}</td>
                        <td>{priorityTable?.PStatus}</td>
                        <td>{priorityTable?.EstimatedTime}</td>
                        <td>{priorityTable?.ActualTime}</td>
                        <td>{priorityTable?.Remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
