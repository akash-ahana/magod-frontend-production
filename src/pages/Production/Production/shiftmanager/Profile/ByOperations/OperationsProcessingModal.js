import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";
import axios from "axios";
import Popup from "./Popup";
import { baseURL } from "../../../../../../api/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function OperationsProcessingModal({
  show,
  setShow,
  selectProgramProcessing,
  machineData,
  taskNoOnClick,
  onClickMachines,
  operation,
  setProgramProcessing,
}) {
  const [fullscreen, setFullscreen] = useState(true);

  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();

  const [programCompleteData, setProgramCompleteData] = useState([]);
  const [newprogramCompleteData, setNewProgramCompleteData] = useState([]);

  const [newpartlistdata, setNewPartlistdata] = useState([]);

  const modalTable = () => {
    axios
      .post(baseURL + "/shiftManagerProfile/shiftManagerncProgramTaskList", {
        ...selectProgramProcessing,
      })
      .then((response) => {
        console.log(response.data);
        setProgramCompleteData(response.data);
      });
  };

  useEffect(() => {
    modalTable();
  }, [selectProgramProcessing]);

  const handleClose = () => setShow(false);

  //console.log(programCompleteData);

  //Open Popup
  const [openChnageMachine, setOpenChangeMachine] = useState("");
  const openChangeMachineModal = () => {
    setOpenChangeMachine(true);
  };

  const clearAllButton = () => {
    console.log("Clear All button Clicked", programCompleteData);
    // Create a new copy of the array to work with
    const constProgramCompleteData = programCompleteData.map((item) => ({
      ...item,
    }));
    // Update the QtyCleared property
    for (let i = 0; i < constProgramCompleteData.length; i++) {
      constProgramCompleteData[i].QtyCleared =
        constProgramCompleteData[i].QtyCut -
        constProgramCompleteData[i].QtyRejected;
    }
    console.log(
      "Updated Const Program Complete Data is ",
      constProgramCompleteData
    );
    // Validate if Remarks are mandatory
    const hasInvalidRemarks = constProgramCompleteData.some(
      (item) =>
        item.QtyRejected > 0 && (!item.Remarks || item.Remarks === "null")
    );
    if (hasInvalidRemarks) {
      // Display an error using the toastify library
      toast.error("Remarks are mandatory for rows with Rejected > 0", {
        position: toast.POSITION.TOP_CENTER,
      });
      return; // Stop further processing
    }
    // Update state with the modified data
    setProgramCompleteData(constProgramCompleteData);
    setNewProgramCompleteData(constProgramCompleteData);
    setNewPartlistdata(constProgramCompleteData);
    // Send a POST request
    axios
      .post(
        baseURL + "/shiftManagerProfile/shiftManagerCloseProgram",
        constProgramCompleteData
      )
      .then((response) => {
        console.log("Current State of programCompleteData", response.data);
        toast.success("Success", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const onChangeRejected = (e, item, key) => {
    const newconstprogramCompleteData = [...programCompleteData];
    const newQtyRejected = Number(e.target.value);
    // Check if the entered value is greater than QtyCut
    if (newQtyRejected > newconstprogramCompleteData[key].QtyCut) {
      toast.error(
        "Rejected quantity should not be greater than produced quantity.",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      // Reset the input field to the original value (QtyRejected)
      e.target.value = item.QtyRejected;
      return; // Exit the function without updating the state
    }
    newconstprogramCompleteData[key].QtyRejected = newQtyRejected;
    setProgramCompleteData(newconstprogramCompleteData);
    setNewProgramCompleteData(newconstprogramCompleteData);
  };

  const onChangeCleared = (e, item, key) => {
    console.log(
      " On CHANGE CLEARED ",
      " e.target.value is ",
      e.target.value,
      " item is ",
      item,
      " key is ",
      key
    );
    const newconstprogramCompleteData = programCompleteData;
    newconstprogramCompleteData[key].QtyCleared = Number(e.target.value);
    setProgramCompleteData(newconstprogramCompleteData);
    setNewProgramCompleteData(newconstprogramCompleteData);
    console.log(
      "NEW CONST PROGRAM COMPLETE DATA IS ",
      newconstprogramCompleteData
    );
    setNewProgramCompleteData(newconstprogramCompleteData);

    setNewPartlistdata(newconstprogramCompleteData);
  };

  const onChangeRemarks = (e, item, key) => {
    console.log(
      " On CHANGE REMARKS",
      " e.target.value is ",
      e.target.value,
      " item is ",
      item,
      " key is ",
      key
    );
    const newconstprogramCompleteData = programCompleteData;
    newconstprogramCompleteData[key].Remarks = e.target.value;
    setProgramCompleteData(newconstprogramCompleteData);
    setNewProgramCompleteData(newconstprogramCompleteData);
  };

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
    const dataCopy = [...programCompleteData];
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
    <div>
      <Modal size="lg" show={show} fullscreen={fullscreen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>
            Program Parts Inspection Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12 col-sm-12">
            <div className="ip-box form-bg ">
              <div className="row">
                <div className="d-flex col-md-3" style={{ gap: "35px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {" "}
                    Task No
                  </label>
                  <input
                    className="input-field"
                    value={selectProgramProcessing.TaskNo}
                  />
                </div>
                <div className="d-flex col-md-2" style={{ gap: "18px" }}>
                  <label className="form-label"> Quantity</label>
                  <input
                    className="input-field"
                    value={selectProgramProcessing.Qty}
                  />
                </div>
                <div className="d-flex col-md-5" style={{ gap: "10px" }}>
                  <label className="form-label"> Material</label>
                  <input
                    className="input-field"
                    value={selectProgramProcessing.Mtrl_Code}
                  />
                </div>

                <div className="d-flex col-md-3" style={{ gap: "10px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {" "}
                    Program No
                  </label>
                  <input
                    className="input-field"
                    value={selectProgramProcessing.NCProgramNo}
                  />
                </div>

                <div className="d-flex col-md-2" style={{ gap: "26px" }}>
                  <label className="form-label">Alloted</label>
                  <input
                    className="input-field"
                    value={selectProgramProcessing.QtyAllotted}
                  />
                </div>

                <div className="d-flex col-md-2" style={{ gap: "15px" }}>
                  <label className="form-label">Process</label>
                  <input
                    className="input-field"
                    value={selectProgramProcessing.MProcess}
                  />
                </div>

                <div className="d-flex col-md-3" style={{ gap: "10px" }}>
                  <label className="form-label">Status</label>
                  <input
                    className="input-field"
                    value={selectProgramProcessing.PStatus}
                  />
                </div>

                <div className="d-flex col-md-3" style={{ gap: "30px" }}>
                  <label className="form-label">Machine</label>
                  <input
                    className="input-field"
                    value={selectProgramProcessing.Machine}
                  />
                </div>

                <div className="d-flex col-md-2" style={{ gap: "10px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Processed
                  </label>
                  <input
                    className="input-field"
                    value={selectProgramProcessing.QtyCut}
                  />
                </div>

                <div className="d-flex col-md-2" style={{ gap: "25px" }}>
                  <label className="form-label">Dwgs</label>
                  <input
                    className="input-field"
                    value={selectProgramProcessing.NoOfDwgs}
                  />
                </div>

                <div className="d-flex col-md-3" style={{ gap: "15px" }}>
                  <label className="form-label">Parts</label>
                  <input
                    className="input-field"
                    value={selectProgramProcessing.TotalParts}
                  />
                </div>

                <div className="d-flex col-md-3" style={{ gap: "10px" }}>
                  <label
                    className="form-label ms-5"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Process Time
                  </label>
                </div>

                <div className="d-flex col-md-2" style={{ gap: "10px" }}>
                  <label
                    className="form-label"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Estimated
                  </label>
                  <input
                   style={{height:'60%'}}
                    className="input-field"
                    value={selectProgramProcessing.EstimatedTime}
                  />
                </div>

                <div className="d-flex col-md-2 mb-2" style={{ gap: "10px" }}>
                  <label className="form-label">Machine</label>
                  <input
                    className="input-field"
                    value={selectProgramProcessing.ActualTime}
                  />
                </div>

                <div className="col-md-2">
                  <button
                    className="button-style group-button ms-2"
                    onClick={clearAllButton}
                  >
                    Clear Parts
                  </button>
                </div>

                <div className="col-md-2" style={{ marginLeft: "-60px" }}>
                  <button
                    className="button-style group-button"
                    onClick={openChangeMachineModal}
                  >
                    Change Machine
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-1">
            <div
              className="col-md-12 col-sm-12"
              style={{ marginLeft: "-14px" }}
            >
              <div
                style={{
                  height: "200px",
                  width: "102%",
                  overflowY: "scroll",
                  overflowX: "scroll",
                }}
              >
                <Table striped className="table-data border table-space">
                  <thead className="tableHeaderBGColor">
                  <tr>
                      <th  style={{ width: "15%" }} onClick={() => requestSort("Dwg Name")}>Dwg Name</th>
                      <th  style={{ width: "15%" }} className="textAllign" onClick={() => requestSort("To Produce")}>To Produce</th>
                      <th  style={{ width: "15%" }} className="textAllign" onClick={() => requestSort("Produced")}>Produced</th>
                      <th  style={{ width: "15%" }} className="textAllign" onClick={() => requestSort("Rejected")}>Rejected</th>
                      <th  style={{ width: "15%" }} className="textAllign" onClick={() => requestSort("Cleared")}>Cleared</th>
                      <th  style={{ width: "25%" }} onClick={() => requestSort("Remarks")}>Remarks</th>
                    </tr>
                  </thead>

                  {sortedData().map((item, key) => {
                    return (
                      <>
                        <tbody className="tablebody">
                          <tr>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {item.DwgName}
                            </td>
                            {/* <td>{item.TotQtyNested}</td> */}
                            <td className="textAllign">{item.TotQtyNested}</td>
                            <td className="textAllign">{item.QtyCut}</td>
                            <td>
                              <div>
                                <input
                                  className="table-cell-editor textAllign"
                                  name="cleared"
                                  type="number"
                                  onKeyDown={blockInvalidChar}
                                  defaultValue={item.QtyRejected}
                                  onChange={(e) =>
                                    onChangeRejected(e, item, key)
                                  }
                                />
                              </div>
                            </td>
                            <td className="textAllign">{item.QtyCleared}</td>
                            <td>
                              <input
                                className="table-cell-editor "
                                name="cleared"
                                Value={
                                  item.Remarks === "null" ? null : item.Remarks
                                }
                                onChange={(e) => onChangeRemarks(e, item, key)}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </>
                    );
                  })}
                </Table>
              </div>
              <Popup
                openChnageMachine={openChnageMachine}
                setOpenChangeMachine={setOpenChangeMachine}
                selectProgramProcessing={selectProgramProcessing}
                machineData={machineData}
                taskNoOnClick={taskNoOnClick}
                onClickMachines={onClickMachines}
                operation={operation}
                setProgramProcessing={setProgramProcessing}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
