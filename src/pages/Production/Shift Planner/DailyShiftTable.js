import React, { useState, useEffect, useMemo, useRef } from "react";
import Table from "react-bootstrap/Table";
import MachineOperatorTable from "./MachineOperatorTable";
import axios from "axios";
import DailyOperator from "./DailyOperator";
import SingleDayShiftEditor from "./SingleDayShiftEditor";
import { baseURL } from "../../../api/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function DailyShiftTable({
  SingleDayShiftPlan4thTable,
  rowSelectFunForDailyShiftTable,
  rowselectDailyShiftTable,
  getMachineOperatorTableData,
  machineOperatorTableData,
  setRowselectDailyShiftTable,
  getSingleDayShiftPlan4thTable,
  getSecondTableData,
  selectedWeek,
  rowselect,
  setSingleDayShiftPlan4thTable
}) {
  useEffect(() => {
    getMachineOperatorTableData();
  }, [rowselectDailyShiftTable]);

  useMemo(() => {
    setRowselectDailyShiftTable({ ...SingleDayShiftPlan4thTable[0], index: 0 });
  }, [SingleDayShiftPlan4thTable[0]]);

  const [shiftinstruction, setShiftinstruction] = useState("");
  const onChangeInput = (e, rowIndex) => {
    const { value } = e.target;
    setShiftinstruction(value);
    // Create a shallow copy of the table data
    const updatedTable = [...SingleDayShiftPlan4thTable];
    // Update the Shift_instruction for the specific row
    updatedTable[rowIndex].Shift_instruction = value;
    // Update the state with the modified table data
    setSingleDayShiftPlan4thTable(updatedTable);
    //console.log("Updated value for each row:", updatedTable[rowIndex].Shift_instruction);
  };

 
  // useEffect(() => {
  //   if (SingleDayShiftPlan4thTable.length > 0) {
  //     rowSelectFunForDailyShiftTable(SingleDayShiftPlan4thTable[0], 0);
  //   }
  // }, [selectedWeek, rowselect, SingleDayShiftPlan4thTable]);


  const updateShiftinstruction = () => {
    // Check if the shift instruction is null or empty
    axios
      .post(baseURL + "/shiftEditor/updateSingleDaySihiftInstructions", {
        ...rowselectDailyShiftTable,
        shiftInstruction: shiftinstruction,
      })
      .then((response) => {
        // Update the Shift_instruction in rowselectDailyShiftTable
        setRowselectDailyShiftTable((prevRowselect) => ({
          ...prevRowselect,
          Shift_instruction: shiftinstruction,
        }));
        toast.success("Shift Instructions Saved", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        toast.error("An error occurred while saving Shift Instructions", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  //Machine Operator Table Rowselect
  const [rowselectMachineOperator, setRowselectMachineOperator] = useState({});
  const rowSelectFun = (item, index) => {
    let list = { ...item, index: index };
    console.log("ScheduleNo", item.ScheduleNo);
    // setScheduleid(item.OrdSchNo);
    setRowselectMachineOperator(list);
  };

  console.log("selected row", rowselectDailyShiftTable);

  

  return (
    <div style={{ display: "flex" }}>
      <ToastContainer />
      <div className="col-md-4 mt-4 mx-1">
        <div className="col-md-4">
          <SingleDayShiftEditor
            rowselectDailyShiftTable={rowselectDailyShiftTable}
            getSingleDayShiftPlan4thTable={getSingleDayShiftPlan4thTable}
            getSecondTableData={getSecondTableData}
            selectedWeek={selectedWeek}
            rowselect={rowselect}
            rowSelectFunForDailyShiftTable={rowSelectFunForDailyShiftTable}
          />
        </div>
        <div className="col-md-12">
          <DailyOperator
            data={rowselectDailyShiftTable}
            selectMachineOperatorData={rowselectDailyShiftTable}
            rowselectMachineOperator={rowselectMachineOperator}
            getMachineOperatorTableData={getMachineOperatorTableData}
          />
        </div>
      </div>

      <div className="col-md-4">
        <div
          className="col-md-12 mt-4 ms-1"
          style={{
            width: "360px",
            height: "57%",

            fontSize: "15px",
            overflowX: "scroll",
            overflowY: "scroll",
          }}
        >
         <Table striped className="table-data border" style={{ border: "1px" }}>
            <thead className="tableHeaderBGColor">
              <tr>
                <th>Shift</th>
                <th>Incharge</th>
                <th style={{ whiteSpace: "nowrap" }}>From</th>
                <th style={{ whiteSpace: "nowrap" }}>To Time</th>
                <th style={{ whiteSpace: "nowrap" }}>Shift Instructions</th>
                <th style={{ whiteSpace: "nowrap" }}>Save Shift Instruction</th>
              </tr>
            </thead>
            <tbody className="tablebody">
              {SingleDayShiftPlan4thTable.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No data to show
                  </td>
                </tr>
              ) : (
                SingleDayShiftPlan4thTable.map((rank, i, row) => (
                  <tr
                    onClick={() => rowSelectFunForDailyShiftTable(rank, i)}
                    className={i === rowselectDailyShiftTable?.index ? "selcted-row-clr" : ""}
                  >
                    <td style={{ whiteSpace: "nowrap" }}>{rank.Shift}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{rank.Shift_Ic}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{rank.FromTime}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{rank.ToTime}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <div key={rank.DayShiftId}>
                        <input
                          className="table-cell-editor"
                          value={rank.Shift_instruction || ""}
                          onChange={(e) => onChangeInput(e, i)}
                          placeholder="Type Cleared"
                        />
                      </div>
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <button
                        className="button-style group-button"
                        style={{ width: "100px" }}
                        onClick={() => updateShiftinstruction()}
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
        <div className="col-md-12 mt-1">
          <MachineOperatorTable
            rowselectDailyShiftTable={rowselectDailyShiftTable}
            rowselectMachineOperator={rowselectMachineOperator}
            setRowselectMachineOperator={setRowselectMachineOperator}
            rowSelectFun={rowSelectFun}
            machineOperatorTableData={machineOperatorTableData}
            getMachineOperatorTableData={getMachineOperatorTableData}
            selectedWeek={selectedWeek}
          />
        </div>
      </div>
    </div>
  );
}

export default DailyShiftTable;
