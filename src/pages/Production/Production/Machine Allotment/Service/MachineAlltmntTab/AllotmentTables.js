import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { baseURL } from "../../../../../../api/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function AllotmentTables() {
  const [newSelectedMchine, setNewSelectedMachine] = useState("");

  const blockInvalidCharReg = (e) =>
    [
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "_",
      "-",
      "+",
      "=",
      "|",
      "',",
      "}",
      "{",
      "[",
      "]",
      ".",
      ",",
      "/",
      "?",
      "e",
      "E",
    ].includes(e.key) && e.preventDefault();

  const [allotmentTable, setAllotmentTable] = useState([]);
  const [searchallotment, setSearchallotment] = useState([]);
  useEffect(() => {
    axios
      .get(baseURL + "/machineAllotmentService/machineAllotmentServiceSchedule")
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit = response.data[i].Delivery_Date.split("-");
          let year = dateSplit[0];
          let month = dateSplit[1];
          let day = dateSplit[2];

          let newDay = day.split(" ");
          let onlyDay = newDay[0];

          response.data[i].Delivery_Date = onlyDay + "-" + month + "-" + year;
        }

        setAllotmentTable(response.data);
        setSearchallotment(response.data);
      });
  }, []);

  //ALLOTMENT TABLE
  const [scheduleListData, setScheduleList] = useState([]);
  const [rowSelect, setRowSelect] = useState({});
  const RowSelectAllotmentTable = (item, index) => {
    let list = { ...item, index: index };
    setRowSelect(list);
  };
  const getScheduleListdata = () => {
    console.log("getScheduleListData is called");
    axios
      .post(
        baseURL + "/machineAllotment/machineAllotmentScheduleTableForm",
        rowSelect
      )
      .then((response) => {
        setScheduleList(response.data);
      });
  };
  useEffect(() => {
    getScheduleListdata();
  }, [rowSelect]);

  useMemo(() => {
    setRowSelect({ ...allotmentTable[0], index: 0 });
  }, [allotmentTable[0]]);

  //SCHEDULELIST TABLE
  const [tableRowSelect, setTableRowSelect] = useState({});
  const [rowselect, setRowselect] = useState({});
  const [machineList, setMachineList] = useState([]);
  const RowSelect = (item, index) => {
    let list = { ...item, index: index };
    setTableRowSelect(item);
    setRowselect(list);
    setNewSelectedMachine('')
  };
  const getMachineList = () => {
    axios
      .post(
        baseURL +
          "/machineAllotmentService/machineAllotmentScheduleTableFormMachinesService",
        tableRowSelect
      )
      .then((response) => {
        console.log("required machine List",response.data)
        setMachineList(response.data);
      });
  };
  useEffect(() => {
    getMachineList();
  }, [tableRowSelect]);

  useMemo(() => {
    setTableRowSelect({ ...scheduleListData[0], index: 0 });
  }, [scheduleListData[0]]);

  //Search
  const searchText = (e) => {
    let number = e.target.value;
    let filteredData = allotmentTable.filter((data) => {
      return data.OrdSchNo.startsWith(number);
    });
    if (filteredData.length > 0) {
      setAllotmentTable(filteredData);
    }
    if (e.target.value.length === 0) {
      setAllotmentTable(searchallotment);
    }
  };

  const onChangeMachine = (e) => {
    setNewSelectedMachine(e.target.value);
    setTableRowSelect((prevSelect) => ({ ...prevSelect, Machine: newSelectedMchine }));
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onClickChangeMachine = async (e) => {
    e.preventDefault();
if(newSelectedMchine==''){
  toast.error("Machine Not Selected", {
    position: toast.POSITION.TOP_CENTER,
  });
}
else{
  axios
  .post(baseURL + "/machineAllotment/changeMachineInForm", {
    ...tableRowSelect,
    newMachine: newSelectedMchine,
  })
  .then((response) => {
    toast.success("Machine Changed", {
      position: toast.POSITION.TOP_CENTER,
    });
  });
await delay(200);
console.log("Selected Row from right table is ", tableRowSelect);
axios
  .post(baseURL + "/machineAllotment/formRefresh", tableRowSelect)
  .then((response) => {
    console.log("OnClick Post response change machine", response.data[0]);
    setTableRowSelect(response.data[0]);
    getScheduleListdata();
  });
  
}
  };

  const onClickReleaseForProgramming = async (e) => {
    e.preventDefault();
    axios
      .post(baseURL + "/machineAllotment/releaseForProgramming", tableRowSelect)
      .then((response) => {});
    await delay(200);
    axios
      .post(baseURL + "/machineAllotment/formRefresh", tableRowSelect)
      .then((response) => {
        setTableRowSelect(response.data[0]);
      });
  };

  console.log(tableRowSelect.Machine);
  const isMachineListEmpty = machineList.length === 0;

  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    // ... Other existing code ...
    // Assuming you have some logic to set the button status based on tableRowSelect.TStatus
    // For example, if the TStatus is "completed", we set the buttonDisabled state to true
    setButtonDisabled(tableRowSelect.TStatus === "Completed");
  }, [tableRowSelect.TStatus]);

  return (
    <>
      <ToastContainer />
      <div className="col-md-12">
        <div className="col-md-3 mb-2 ms-3">
          <label className="form-label">Find Schedule</label>
          <input
            className="in-field"
            style={{ marginTop: "-6px" }}
            type="number"
            onKeyDown={blockInvalidCharReg}
            onChange={(e) => searchText(e)}
          />
        </div>

        <div className="row mt-3">
          <div
            className="col-md-6"
            style={{
              overflowY: "scroll",
              overflowX: "scroll",
              height: "750px",
            }}
          >
            <Table striped className="table-data border">
              <thead className="tableHeaderBGColor">
                <tr>
                  <th style={{ whiteSpace: "nowrap" }}>Schedule No</th>
                  <th style={{ whiteSpace: "nowrap" }}>Delivery Date</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th style={{ whiteSpace: "nowrap" }}>Special_instruction</th>
                </tr>
              </thead>

              <tbody className="tablebody">
                {allotmentTable.map((item, key) => {
                  return (
                    <>
                      <tr
                        onClick={() => {
                          RowSelectAllotmentTable(item, key);
                        }}
                        className={
                          key === rowSelect?.index ? "selcted-row-clr" : ""
                        }
                      >
                        <td>{item.OrdSchNo}</td>
                        <td>{item.Delivery_Date}</td>
                        <td>{item.Cust_name}</td>
                        <td>{item.Schedule_Status}</td>
                        <td>{item.Special_Instructions}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </div>

          {/* Form */}
          <div className="col-md-6">
            <form className="form">
              <div className="ip-box form-bg">
                <div className="row">
                  <div className="col-md-12 ">
                    <label className="form-label">Customer</label>
                    <input
                      className="in-fields"
                      value={tableRowSelect.Cust_name}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 ">
                    <label className="form-label">Task No</label>
                    <input
                      className="in-fields"
                      value={tableRowSelect.TaskNo}
                    />
                  </div>
                  <div className="col-md-6 ">
                    <label className="form-label">Status</label>
                    <input
                      className="in-fields"
                      value={tableRowSelect.TStatus}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 ">
                    <label className="form-label">Material</label>
                    <input
                      className="in-fields"
                      value={tableRowSelect.Mtrl_Code}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">Process</label>
                    <input
                      className="in-fields mt-2"
                      value={tableRowSelect.MProcess}
                    />
                  </div>
                  <div className="col-md-6">
                  <label className="form-label">Select machine</label>
      {isMachineListEmpty ? (
        // Render a disabled input or label showing the selected machine
        <input type="text" className="ip-select dropdown-field mt-2" value={tableRowSelect.Machine} disabled />
      ) : (
        // Render the regular select element with options
        <select
          className="ip-select dropdown-field mt-2"
          onChange={onChangeMachine}
          value={tableRowSelect.Machine}
        >
          {machineList.map((value, key) => (
            <option key={key} value={value.refName}>
              {value.refName}
            </option>
          ))}
        </select>
      )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">Priority</label>
                    <input
                      className="in-fields"
                      value={tableRowSelect.Priority}
                    />
                  </div>

                  <div className="col-md-6 mt-4">
                     <button
          onClick={onClickChangeMachine}
          style={{ width: "160px" }}
          className={`button-style mt-3 group-button ${
            buttonDisabled ? "disabled" : ""
          }`}
          disabled={buttonDisabled}
        >
          Change Machine
        </button>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-6">
                    <label className="form-label">Machine</label>
                    <input
                      className="in-fields"
                      value={tableRowSelect.Machine}
                    />
                  </div>
                  <div className="col-md-6">
                    <button
                      onClick={onClickReleaseForProgramming}
                      style={{ width: "160px", height: "55px" }}
                      className="button-style group-button "
                    >
                      Release For <br />
                      Programming
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* //TABLE3 */}

            <div
              className="mt-2"
              style={{
                height: "300px",
                overflowY: "scroll",
                overflowX: "scroll",
              }}
            >
              <Table striped className="table-data border">
                <thead className="tableHeaderBGColor">
                  <tr>
                    <th style={{ whiteSpace: "nowrap" }}>Task No</th>
                    <th>Machine</th>
                    <th>Operation</th>
                    <th>Mtrl_code</th>
                    <th>Priority</th>
                    <th style={{ whiteSpace: "nowrap" }}>Estimated time</th>
                  </tr>
                </thead>

                <tbody className="tablebody">
                  {scheduleListData.map((value, key) => {
                    return (
                      <>
                        <tr
                          onClick={() => {
                            RowSelect(value, key);
                          }}
                          className={
                            key === rowselect?.index
                              ? "selcted-row-clr"
                              : ""
                          }
                        >
                          <td>{value.TaskNo}</td>
                          <td>{value.Machine}</td>
                          <td>{value.Operation}</td>
                          <td>{value.Mtrl_Code}</td>
                          <td>{value.Priority}</td>
                          <td>{value.EstimatedTime}</td>
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
    </>
  );
}
