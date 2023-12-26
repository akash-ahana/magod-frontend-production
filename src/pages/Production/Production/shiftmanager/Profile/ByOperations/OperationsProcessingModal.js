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
    const constProgramCompleteData = programCompleteData.map(item => ({ ...item }));
    // Update the QtyCleared property
    for (let i = 0; i < constProgramCompleteData.length; i++) {
      constProgramCompleteData[i].QtyCleared =
        constProgramCompleteData[i].QtyCut -
        constProgramCompleteData[i].QtyRejected;
    }
    console.log("Updated Const Program Complete Data is ", constProgramCompleteData);
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

  return (
    <div>
      <Modal size="lg" show={show} fullscreen={fullscreen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ width: "100%" }} className="title">
            Program Parts Inspection Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12 col-sm-12">
            <div className="ip-box form-bg ">
              <div className="row">
                <div className="col-md-3">
                  <label className="form-label"> Task No</label>
                  <input
                    className="in-fields"
                    value={selectProgramProcessing.TaskNo}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label"> Quantity</label>
                  <input
                    className="in-fields"
                    value={selectProgramProcessing.Qty}
                  />
                </div>
                <div className="col-md-5">
                  <label className="form-label"> Material</label>
                  <input
                    className="in-fields"
                    value={selectProgramProcessing.Mtrl_Code}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label"> Program No</label>
                  <input
                    className="in-fields"
                    value={selectProgramProcessing.NCProgramNo}
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Alloted</label>
                  <input
                    className="in-fields"
                    value={selectProgramProcessing.QtyAllotted}
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Process</label>
                  <input
                    className="in-fields"
                    value={selectProgramProcessing.MProcess}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Status</label>
                  <input
                    className="in-fields"
                    value={selectProgramProcessing.PStatus}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Machine</label>
                  <input
                    className="in-fields"
                    value={selectProgramProcessing.Machine}
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Processed</label>
                  <input
                    className="in-fields"
                    value={selectProgramProcessing.QtyCut}
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Dwgs</label>
                  <input
                    className="in-fields"
                    value={selectProgramProcessing.NoOfDwgs}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Parts</label>
                  <input
                    className="in-fields"
                    value={selectProgramProcessing.TotalParts}
                  />
                </div>

                <div className="col-md-3 mt-4">
                  <label className="form-label-processTime mt-2 ms-5">Process Time</label>
                </div>

                <div className="col-md-2">
                  <label className="form-label">Estimated</label>
                  <input
                    className="in-fields"
                    value={selectProgramProcessing.EstimatedTime}
                  />
                </div>

                <div className="col-md-2 mb-2">
                  <label className="form-label">Machine</label>
                  <input
                    className="in-fields"
                    value={selectProgramProcessing.ActualTime}
                  />
                </div>

                <div className="col-md-2  mt-4">
                  <button
                    className="button-style mt-3 group-button ms-2"
                    style={{ width: "120px" }}
                    onClick={clearAllButton}
                  >
                    Clear Parts
                  </button>
                </div>

                <div className="col-md-2 mt-4 " style={{ marginLeft: "-60px" }}>
                  <button
                    style={{ width: "130px" }}
                    className="button-style mt-3 group-button"
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
              className="col-md-12 col-sm-12 mt-2"
              style={{ marginLeft: "-15px" }}
            >
              <div
                style={{
                  height: "200px",
                  maxWidth: "1000px",
                  overflowY: "scroll",
                  overflowX: "scroll",
                }}
              >
                <Table striped className="table-data border">
                  <thead className="tableHeaderBGColor">
                    <tr>
                      <th style={{ whiteSpace: "nowrap" }}>Dwg Name</th>
                      {/* <th style={{whiteSpace:"nowrap"}}>Total Qty Nested</th> */}
                      <th style={{ whiteSpace: "nowrap" }}>To Produce</th>
                      <th>Produced</th>
                      <th>Rejected</th>
                      <th>Cleared</th>

                      <th>Remarks</th>
                      {/* <th>New Cleared</th> */}
                    </tr>
                  </thead>

                  {programCompleteData.map((item, key) => {
                    return (
                      <>
                        <tbody className="tablebody">
                          <tr>
                            <td style={{ whiteSpace: "nowrap" }}>
                              {item.DwgName}
                            </td>
                            {/* <td>{item.TotQtyNested}</td> */}
                            <td>{item.TotQtyNested}</td>
                            <td>{item.QtyCut}</td>
                            <td>
                              <div>
                                <input
                                  className="table-cell-editor "
                                  name="cleared"
                                  type="number"
                                  onKeyDown={blockInvalidChar}
                                  defaultValue={item.QtyRejected}
                                  onChange={(e) =>
                                    onChangeRejected(e, item, key)
                                  }
                                  placeholder="Type Cleared"
                                />
                              </div>
                            </td>
                            <td>{item.QtyCleared}</td>
                            <td>
                              <input
                                className="table-cell-editor "
                                name="cleared"
                                Value={item.Remarks==='null' ? null :item.Remarks}
                                onChange={(e) => onChangeRemarks(e, item, key)}
                                placeholder="Type Cleared"
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
