  import axios from "axios";
  import React, { useEffect, useMemo, useState } from "react";
  import { Table } from "react-bootstrap";
  import { baseURL } from "../../../../../../api/baseUrl";
  import "react-toastify/dist/ReactToastify.css";
  import { ToastContainer, toast } from "react-toastify";

  export default function AllotmentTables() {
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
    const [newSelectedMchine, setNewSelectedMachine] = useState("");

    const [allotmentTable, setAllotmentTable] = useState([]);
    const [searchallotment, setSearchallotment] = useState([]);
    useEffect(() => {
      axios
        .get(baseURL + "/machineAllotment/machineAllotmentSchedule")
        .then((response) => {
          console.log("data", response.data);
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
      console.log(item, "item is ");
      let list = { ...item, index: index };
      setRowSelect(list);
      setNewSelectedMachine("");
    };
    const getScheduleList = () => {
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
      getScheduleList();
    }, [rowSelect]);

    useMemo(() => {
      setRowSelect({ ...allotmentTable[0], index: 0 });
    }, [allotmentTable[0]]);

    //SCHEDULELIST TABLE
    const [tableRowSelect, setTableRowSelect] = useState({ Machine: "" });
    const [rowselect, setRowselect] = useState({});
    const [machineList, setMachineList] = useState([]);
    const RowSelect = (item, index) => {
      console.log("right table select is ", item);
      let list = { ...item, index: index };
      setTableRowSelect(item);
      setRowselect(list);
    };
    console.log("type of item", tableRowSelect);
    console.log("type of list", rowselect);

    const getMachineList = () => {
      axios
        .post(
          baseURL + "/machineAllotment/machineAllotmentScheduleTableFormMachines",
          tableRowSelect
        )
        .then((response) => {
          console.log("OnClick Post response", response.data);
          setMachineList(response.data);
        });
    };
    useEffect(() => {
      getMachineList();
    }, [tableRowSelect]);

    useMemo(() => {
      setTableRowSelect({ ...scheduleListData[0], index: 0 });
    }, [scheduleListData[0]]);

    useMemo(() => {
      setRowselect({ ...scheduleListData[0], index: 0 });
    }, [scheduleListData[0]]);

    const onChangeMachine = (e) => {
      console.log("Machine is Changed", e.target.value);
      setTableRowSelect({ ...tableRowSelect, Machine: e.target.value });
      setNewSelectedMachine(e.target.value);
    };

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const onClickChangeMachine = async (e) => {
      e.preventDefault();
      console.log("On Click Change Machine ", newSelectedMchine);
      if (newSelectedMchine == "") {
        toast.error("Machine Not Selected", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        axios
          .post(baseURL + "/machineAllotment/changeMachineInForm", {
            ...tableRowSelect,
            newMachine: tableRowSelect.Machine,
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
            getScheduleList();
          });
      }
    };

    const onClickReleaseForProgramming = async (e) => {
      e.preventDefault();
      console.log(" Release For Programming Button Is Clicked ", tableRowSelect);
      axios
        .post(baseURL + "/machineAllotment/releaseForProgramming", tableRowSelect)
        .then((response) => {
          console.log("OnClick Post response", response.data);
        });
      await delay(200);
      axios
        .post(baseURL + "/machineAllotment/formRefresh", tableRowSelect)
        .then((response) => {
          console.log("OnClick Post response", response.data);
          setTableRowSelect(response.data[0]);
        });
    };

    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
      // ... Other existing code ...
      // Assuming you have some logic to set the button status based on tableRowSelect.TStatus
      // For example, if the TStatus is "completed", we set the buttonDisabled state to true
      setButtonDisabled(tableRowSelect.TStatus === "Completed");
    }, [tableRowSelect.TStatus]);

    //TRY SEARCH
    const [searchInput, setSearchInput] = useState("");
    const searchText1 = (e) => {
      const searchText = e.target.value;
      const sanitizedSearchText = searchText.replace(/[^0-9 ]/g, ''); // Remove non-numeric characters except spaces
      setSearchInput(sanitizedSearchText); // Update the state with the sanitized value
      // Apply the filter on searchallotment based on the sanitized input value
      const filteredData = searchallotment.filter((data) =>
        data.OrdSchNo.includes(sanitizedSearchText)
      );

      setAllotmentTable(filteredData);
    };
    
    // useEffect(() => {
    //   if (scheduleListData.length > 0 && !rowselect.TaskNo) {
    //     RowSelect(scheduleListData[0], 0); // Select the first row
    //   }
    // }, [scheduleListData, rowselect]);
    

    console.log(tableRowSelect);

    return (
      <div>
        <div className="col-md-12">
          <div className="col-md-4 mb-2 ms-3">
            <label className="form-label">Find Schedule</label>
            <input
          className="in-field "
          onKeyDown={blockInvalidCharReg}
          style={{ marginTop: "-2px" }}
          type="text" // Change the input type to "text"
          value={searchInput} // Set the value to the state variable
          onChange={searchText1} // Call the searchText function on change
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
              <Table striped className="table-data border table-space">
                <thead className="tableHeaderBGColor">
                  <tr>
                    <th>Schedule No</th>
                    <th>Delivery Date</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Special_instruction</th>
                  </tr>
                </thead>

                <tbody className="tablebody table-space">
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
                      <select
                        className="ip-select dropdown-field mt-2"
                        onChange={onChangeMachine}
                        value={tableRowSelect.Machine}
                      >
                        {/* Render the default empty option */}
                        <option value="">Select an option</option>
                        {machineList.map((value, key) => (
                          <option key={key} value={value.refName}>
                            {value.refName}
                          </option>
                        ))}
                      </select>
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
                        className="button-style group-button"
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

                  <tbody className="tablebody table-space">
                    {scheduleListData.map((value, key) => {
                      return (
                        <>
                          <tr
                            onClick={() => {
                              RowSelect(value, key);
                            }}
                            className={
                              key === rowselect?.index ? "selcted-row-clr" : ""
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
      </div>
    );
  }
