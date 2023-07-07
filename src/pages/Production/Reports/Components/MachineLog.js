import { Table } from "react-bootstrap";
import DateChangeModal from "./DateChangeModal";
import { baseURL } from "../../../../api/baseUrl";
import axios from "axios";
import PrintShiftLogModal from "../Pdfs/PrintShiftLog/PrintShiftLogModal";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function MachineLog({
  machineLogData,
  setMachineLogData,
  dateSelect,
  selectedRows,setSelectedRows,machinelogRowSelect
}) {
  ////
  const [selectAll, setSelectAll] = useState(false);
  const [FinalMachineLogArray, setFinalMachineLogArray] = useState([]);
  const [alert, setAlert] = useState("");
  const [machineLogSelectedRow, setMachineLogSelectedRow] = useState({});



  // Function to sort the machine log data based on shift and machine name
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

  // Create a new array of machine logs sorted by shift and machine
  const sortedMachineLogs = machineLogData.reduce((acc, log) => {
    const { Shift, Machine, MachineTime } = log;

    // Check if shift already exists in the accumulator
    const existingShift = acc.find((item) => item.Shift === Shift);

    if (existingShift) {
      // If shift exists, check if machine already exists
      const existingMachine = existingShift.Machines.find(
        (item) => item.Machine === Machine
      );

      if (existingMachine) {
        // If machine exists, append the log to the existing machine log array
        existingMachine.logs.push(log);
        existingMachine.TotalMachineTime += MachineTime; // Update TotalMachineTime
      } else {
        // If machine doesn't exist, create a new machine entry with the log
        existingShift.Machines.push({
          Machine,
          TotalMachineTime: MachineTime, // Set initial TotalMachineTime
          logs: [log], // Initialize logs array with the current log
        });
      }
    } else {
      // If shift doesn't exist, create a new entry with the shift and machine log
      acc.push({
        Shift,
        Machines: [
          {
            Machine,
            TotalMachineTime: MachineTime, // Set initial TotalMachineTime
            logs: [log], // Initialize logs array with the current log
          },
        ],
      });
    }

    return acc;
  }, []);

  // Sort the machine logs for each shift and machine
  sortedMachineLogs.forEach((ShiftLog) => {
    ShiftLog.Machines.forEach((machineLog) => {
      machineLog.logs = sortMachineLogs(machineLog.logs);
      machineLog.logs.push({ TotalMachineTime: machineLog.TotalMachineTime }); // Add TotalMachineTime to the logs array
    });
  });

  console.log(sortedMachineLogs);

  // Open SHIFTLOG PDF
  const [openShiftLog, setOpenShiftLog] = useState(false);
  const openShiftLogPdf = () => {
    setOpenShiftLog(true);
  };

  const [SumMachineTime, setSumMachineTime] = useState("");
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      // Select all rows and add them to FinalMachineLogArray
      setFinalMachineLogArray([...machineLogData]);
      setSelectedRows(
        machineLogData.map((_, index) => ({
          index,
          data: machineLogData[index],
        }))
      );

      // Calculate the sum of MachineTime values
      const sum = machineLogData.reduce(
        (accumulator, item) => accumulator + item.MachineTime,
        0
      );
      setSumMachineTime(sum);
    } else {
      // Deselect all rows and clear FinalMachineLogArray
      setFinalMachineLogArray([]);
      setSelectedRows([]);
      setSumMachineTime(0); // Reset the sum to 0
    }
  };

  console.log("selected rows are", selectedRows);

  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const hadleChangeFromTime = (e) => {
    setFromTime(e.target.value);
  };

  const hadleChangeToTime = (e) => {
    setToTime(e.target.value);
  };

  console.log(fromTime, toTime);

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
            for(let i =0;i<response.data.length;i++) { 
              let dateSplit1 = response.data[i].FromTime.split(" ");
              let date1 =dateSplit1[0].split("-")
              let year1 = date1[0];
              let month1 = date1[1];
              let day1 = date1[2];
              let time=dateSplit1[1].split(":");
              let Time=time[0]+":"+time[1];
              let finalDay1 = day1+"/"+month1+"/"+year1+" "+ Time;
              response.data[i].FromTime = finalDay1;
            }
            for(let i =0;i<response.data.length;i++) { 
              let dateSplit2 = response.data[i].ToTime.split(" ");
              let date2 =dateSplit2[0].split("-")
              let year2 = date2[0];
              let month2 = date2[1];
              let day2 = date2[2];
              let time1=dateSplit2[1].split(":");
              let Time1=time1[0]+":"+time1[1];
              let finalDay2 = day2+"/"+month2+"/"+year2+" "+ Time1;
              response.data[i].ToTime = finalDay2;
            }
            console.log(response.data);
             setMachineLogData(response.data);
          });
      });
  };

  const selectedRowsData = selectedRows.map((row) => row.data);

  //////////
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
  return (
    <div>
                        <ToastContainer />


      <PrintShiftLogModal
        openShiftLog={openShiftLog}
        setOpenShiftLog={setOpenShiftLog}
        sortedMachineLogs={sortedMachineLogs}
      />

      <DateChangeModal
        alert={alert}
        setAlert={setAlert}
        machineLogSelectedRow={machineLogSelectedRow}
      />

      <div style={{ marginTop: "-15px" }}>
        <button
          className="button-style  group-button"
          type="button"
          style={{ width: "150px", marginLeft: "20px" }}
          onClick={onClickSaveLog}
        >
          Save Log
        </button>
        <button
          className="button-style group-button"
          type="button"
          style={{ width: "150px", marginLeft: "20px" }}
          onClick={openShiftLogPdf}
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

          <tbody className="tablebody table-space table-cell-align">
            {machineLogData.map((item, key) => {
              const isSelected = selectedRows.some((row) => row.data === item);

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
        </Table>
      </div>
    </div>
  );
}
