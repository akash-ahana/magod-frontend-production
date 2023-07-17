import React, { useState } from "react";
import { Table } from "react-bootstrap";
import DateChangeModal from "./DateChangeModal";
import { baseURL } from "../../../../api/baseUrl";
import axios from "axios";
import PrintShiftLogModal from "../Pdfs/PrintShiftLog/PrintShiftLogModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function MachineLog({
  machineLogData,
  setMachineLogData,
  dateSelect,
  selectedRows,
  setSelectedRows,
  machinelogRowSelect,
  status,
}) {
  const [selectAll, setSelectAll] = useState(false);
  const [FinalMachineLogArray, setFinalMachineLogArray] = useState([]);
  const [alert, setAlert] = useState("");
  const [machineLogSelectedRow, setMachineLogSelectedRow] = useState({});
  const [openShiftLog, setOpenShiftLog] = useState(false);
  const [SumMachineTime, setSumMachineTime] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const sortMachineLogs = (logs) => {
    // Perform sorting based on your desired logic
    // Here, we assume sorting by 'shift' in ascending order and 'machine' in alphabetical order
    logs.sort((a, b) => {
      const MachineA =
        a.Machine !== undefined && a.Machine !== null ? String(a.Machine) : "";
      const MachineB = b.Machine ? String(b.Machine) : "";

      if (a.Shift === b.Shift) {
        return MachineA.localeCompare(MachineB);
      }
      return a.Shift.localeCompare(b.Shift);
    });

    return logs;
  };

  let sortedMachineLogs = [];
  if (Array.isArray(machineLogData)) {
    sortedMachineLogs = machineLogData.reduce((acc, log) => {
      const { Shift, Machine, MachineTime } = log;
      const existingShift = acc.find((item) => item.Shift === Shift);

      if (existingShift) {
        const existingMachine = existingShift.Machines.find(
          (item) => item.Machine === Machine
        );

        if (existingMachine) {
          existingMachine.logs.push(log);
          existingMachine.TotalMachineTime += MachineTime;
        } else {
          existingShift.Machines.push({
            Machine,
            TotalMachineTime: MachineTime,
            logs: [log],
          });
        }
      } else {
        acc.push({
          Shift,
          Machines: [
            {
              Machine,
              TotalMachineTime: MachineTime,
              logs: [log],
            },
          ],
        });
      }

      return acc;
    }, []);

    sortedMachineLogs.forEach((ShiftLog) => {
      ShiftLog.Machines.forEach((machineLog) => {
        machineLog.logs = sortMachineLogs(machineLog.logs);
        machineLog.logs.push({ TotalMachineTime: machineLog.TotalMachineTime });
      });
    });
  }

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setFinalMachineLogArray([...machineLogData]);
      setSelectedRows(
        machineLogData.map((_, index) => ({
          index,
          data: machineLogData[index],
        }))
      );

      const sum = machineLogData.reduce(
        (accumulator, item) => accumulator + item.MachineTime,
        0
      );
      setSumMachineTime(sum);
    } else {
      setFinalMachineLogArray([]);
      setSelectedRows([]);
      setSumMachineTime(0);
    }
  };

  const onClickSaveLog = () => {
    axios
      .post(baseURL + "/reports/saveLog", {
        selectedRows: selectedRows,
        fromTime: fromTime,
        toTime: toTime,
      })
      .then((response) => {
        toast.success(`Log Saved`, {
          position: toast.POSITION.TOP_CENTER,
        });
        axios
          .post(baseURL + "/reports/machineLog", { Date: dateSelect })
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              let dateSplit1 = response.data[i].FromTime.split(" ");
              let date1 = dateSplit1[0].split("-");
              let year1 = date1[0];
              let month1 = date1[1];
              let day1 = date1[2];
              let time = dateSplit1[1].split(":");
              let Time = time[0] + ":" + time[1];
              let finalDay1 = day1 + "/" + month1 + "/" + year1 + " " + Time;
              response.data[i].FromTime = finalDay1;
            }
            for (let i = 0; i < response.data.length; i++) {
              let dateSplit2 = response.data[i].ToTime.split(" ");
              let date2 = dateSplit2[0].split("-");
              let year2 = date2[0];
              let month2 = date2[1];
              let day2 = date2[2];
              let time1 = dateSplit2[1].split(":");
              let Time1 = time1[0] + ":" + time1[1];
              let finalDay2 = day2 + "/" + month2 + "/" + year2 + " " + Time1;
              response.data[i].ToTime = finalDay2;
            }
            setMachineLogData(response.data);
          });
      });
  };

  const handleTimeChange = (index, field, value) => {
    const updatedMachineLogData = machineLogData.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    });

    setMachineLogData(updatedMachineLogData);
  };

  //Open PDF
  const PrintShiftLog = () => {
    if (status == false) {
      toast.error("Prepare Report Before Printing", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setOpenShiftLog(true);
    }
  };

  return (
    <div>
      <ToastContainer />

      <PrintShiftLogModal
        openShiftLog={openShiftLog}
        setOpenShiftLog={setOpenShiftLog}
        sortedMachineLogs={sortedMachineLogs}
        dateSelect={dateSelect}
      />

      <DateChangeModal
        alert={alert}
        setAlert={setAlert}
        machineLogSelectedRow={machineLogSelectedRow}
      />

      <div style={{ marginTop: "-15px" }}>
        <button
          className={`button-style group-button ${status ? "disabled" : ""}`}
          type="button"
          style={{ width: "150px", marginLeft: "20px" }}
          onClick={onClickSaveLog}
          disabled={status}
        >
          Save Log
        </button>

        <button
          className="button-style group-button"
          type="button"
          style={{ width: "150px", marginLeft: "20px" }}
          onClick={PrintShiftLog}
        >
          Print Shift Log
        </button>
      </div>
      <div
        className="mt-3"
        style={{
          maxWidth: "900px",
          overflowX: "scroll",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        <Table striped className="table-data border">
          <thead className="tableHeaderBGColor table-cell-align">
            <tr>
              <th style={{ paddingLeft: "10px", paddingBottom: "10px" }}>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>

              <th>Machine</th>
              <th>Shift</th>
              <th>Srl</th>
              <th>FromTime</th>
              <th>ToTime</th>
              <th>MachineTime</th>
              <th>Program</th>
              <th>Remarks</th>
              <th style={{ whiteSpace: "nowrap" }}>Machine Operator</th>
              <th>Operation</th>
            </tr>
          </thead>
          
          {Array.isArray(machineLogData) && machineLogData.length > 0 ? (
            <tbody className="tablebody table-space table-cell-align">
              {machineLogData.map((item, key) => {
                const isSelected = selectedRows.some(
                  (row) => row.data === item
                );
                return (
                  <tr
                    key={key}
                    onClick={() => machinelogRowSelect(key)}
                    className={isSelected ? "selected-row" : ""}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => machinelogRowSelect(key)}
                      />
                    </td>
                    <td>{item?.Machine}</td>
                    <td>{item?.Shift}</td>
                    <td>{item?.Srl}</td>
                    <td>
                      <div>
                        <input
                          className="table-cell-editor"
                          style={{ textAlign: "center", width: "150px" }}
                          value={item?.FromTime}
                          onChange={(e) =>
                            handleTimeChange(key, "FromTime", e.target.value)
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div>
                        <input
                          className="table-cell-editor"
                          style={{ textAlign: "center", width: "150px" }}
                          value={item?.ToTime}
                          onChange={(e) =>
                            handleTimeChange(key, "ToTime", e.target.value)
                          }
                        />
                      </div>
                    </td>
                    <td>{item?.MachineTime}</td>
                    <td>{item?.Program}</td>
                    <td>{item?.Remarks}</td>
                    <td>{item?.Operator}</td>
                    <td>{item?.Operation}</td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={11} style={{ textAlign: "center" }}>
                  <b>No machine log data available</b>
                </td>
              </tr>
            </tbody>
          )}
        </Table>
      </div>
    </div>
  );
}
