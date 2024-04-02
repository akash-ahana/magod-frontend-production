import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";
import axios from "axios";
import { baseURL } from "../../../../../../api/baseUrl";
import CloseProgramModal from "../../Profile/ByMachine/CloseProgramModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ShortCloseModal from "../../Service/ByMachine/ShortCloseModal";

export default function ProgramCompletedModal({
  show,
  setShow,
  selectProgramCompleted,
  taskNoOnClick,
  MachineOnClick,
  setSelectProgramCompleted,
  laser,
  setMachineProgramesCompleted,
}) {
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();

  const [programCompleteData, setProgramCompleteData] = useState([]);
  const [newprogramCompleteData, setNewProgramCompleteData] = useState([]);

  const [fullscreen, setFullscreen] = useState(true);

  const [newpartlistdata, setNewPartlistdata] = useState([]);

  const modalTable = () => {
    axios
      .post(baseURL + "/shiftManagerProfile/shiftManagerncProgramTaskList", {
        ...selectProgramCompleted,
      })
      .then((response) => {
        console.log(response.data);
        setProgramCompleteData(response.data);
      });
  };

  useEffect(() => {
    modalTable();
  }, [selectProgramCompleted]);

  const handleClose = () => {
    setShow(false);
    axios
              .post(
                baseURL +
                  "/shiftManagerService/profileListMachinesProgramesCompleted",
                { MachineName: laser }
              )
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
                setMachineProgramesCompleted(response.data);
                setSelectProgramCompleted({ ...response.data[0], index: 0 });
              });
  }

  const clearAllButton = () => {
    console.log("Clear All button Clicked", programCompleteData);
    // Create a new copy of the array to work with
    const constProgramCompleteData = [...programCompleteData];
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

  //   const onClickCloseProgram1 = () => {
  //     console.log('Close Program button is clicked')
  //     axios.post(baseURL+'/shiftManagerProfile/CloseProgram',
  //     selectProgramCompleted)
  //    .then((response) => {
  //      console.log('Response of Api' , response.data)
  //      console.log('current State of Program Complete data is ' , selectProgramCompleted)
  //      const constSelectProgramCompleted = selectProgramCompleted;
  //      constSelectProgramCompleted.PStatus = 'Closed'
  //      setSelectProgramCompleted(constSelectProgramCompleted)
  //      setCloseProgram(true);
  //      axios
  //       .post(
  //         baseURL + "/shiftManagerProfile/profileListMachinesProgramesCompleted",
  //         { MachineName: laser }
  //       )
  //       .then((response) => {

  //         for (let i = 0; i < response.data.length; i++) {
  //           if (
  //             response.data[i].ActualTime <
  //             0.5 * response.data[i].EstimatedTime
  //           ) {
  //             response.data[i].rowColor = "#339900";
  //           } else if (
  //             response.data[i].ActualTime <
  //             0.75 * response.data[i].EstimatedTime
  //           ) {
  //             response.data[i].rowColor = "#82c2b4";
  //           } else if (
  //             response.data[i].ActualTime <
  //             0.9 * response.data[i].EstimatedTime
  //           ) {
  //             response.data[i].rowColor = "#f08080";
  //           } else if (
  //             response.data[i].ActualTime <
  //             1.1 * response.data[i].EstimatedTime
  //           ) {
  //             response.data[i].rowColor = "#f08080";
  //           } else if (
  //             response.data[i].ActualTime <
  //             1.25 * response.data[i].EstimatedTime
  //           ) {
  //             response.data[i].rowColor = "#FF7F50";
  //           } else if (
  //             response.data[i].ActualTime <
  //             1.5 * response.data[i].EstimatedTime
  //           ) {
  //             response.data[i].rowColor = "#FFA500";
  //           } else {
  //             response.data[i].rowColor = "#ff0000";
  //           }
  //         }
  //         console.log("AFTER ADDING COLOR", response.data);
  //         setMachineProgramesCompleted(response.data);
  //         setSelectProgramCompleted({...response.data[0],index:0})
  //       });
  //  })
  //   }

  //
  const [openCloseProgram, setCloseProgram] = useState(false);
  const [disableStatus, setDisableStatus] = useState(false);
  const [response, setResponse] = useState("");
  const [comparedResponse, setComparedResponse] = useState("");
  const [openShortClose, setOpenShortClose] = useState(false);
  const onClickCloseProgram = () => {
    axios
      .post(
        baseURL + "/shiftManagerProfile/CloseProgram",
        selectProgramCompleted
      )
      .then((response) => {
        console.log(response.data);
        if (
          response.data == "Return or update Material before closing Program"
        ) {
          setCloseProgram(true);
          setResponse("Return or update Material before closing Program");
        } else {
          if (
            selectProgramCompleted?.QtyAllotted < selectProgramCompleted?.Qty
          ) {
            setComparedResponse("Do you wish to short close program No?");
            setOpenShortClose(true);
          } else {
            axios
              .post(
                baseURL + "/shiftManagerProfile/updateClosed",
                selectProgramCompleted
              )
              .then((response) => {
                console.log(response.data);
              });
            setCloseProgram(true);
            setResponse("Closed");
            const constSelectProgramCompleted = selectProgramCompleted;
            constSelectProgramCompleted.PStatus = "Closed";
            setSelectProgramCompleted(constSelectProgramCompleted);
            setDisableStatus(response.data.success);
          }
        }
      });
  };
  //
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
      <CloseProgramModal
        openCloseProgram={openCloseProgram}
        setCloseProgram={setCloseProgram}
        data={response}
      />

      <ShortCloseModal
        openShortClose={openShortClose}
        setOpenShortClose={setOpenShortClose}
        response1={comparedResponse}
        selectProgramCompleted={selectProgramCompleted}
        laser={laser}
        setSelectProgramCompleted={setSelectProgramCompleted}
        setMachineProgramesCompleted={setMachineProgramesCompleted}
      />

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
                    value={selectProgramCompleted.TaskNo}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label"> Quantity</label>
                  <input
                    className="in-fields"
                    value={selectProgramCompleted.Qty}
                  />
                </div>
                <div className="col-md-5">
                  <label className="form-label"> Material</label>
                  <input
                    className="in-fields"
                    value={selectProgramCompleted.Mtrl_Code}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label"> Program no</label>
                  <input
                    className="in-fields"
                    value={selectProgramCompleted.NCProgramNo}
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Alloted</label>
                  <input
                    className="in-fields"
                    value={selectProgramCompleted.QtyAllotted}
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Process</label>
                  <input
                    className="in-fields"
                    value={selectProgramCompleted.MProcess}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Status</label>
                  <input
                    className="in-fields"
                    value={selectProgramCompleted.PStatus}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Machine</label>
                  <input
                    className="in-fields"
                    value={selectProgramCompleted.Machine}
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Processed</label>
                  <input
                    className="in-fields"
                    value={selectProgramCompleted.QtyCut}
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label">Dwgs</label>
                  <input
                    className="in-fields"
                    value={selectProgramCompleted.NoOfDwgs}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Parts</label>
                  <input
                    className="in-fields"
                    value={selectProgramCompleted.TotalParts}
                  />
                </div>

                {/* <div className='row'> */}
                <div className="col-md-3 mt-4">
                  <label className="form-label-processTime mt-2 ms-5">
                    Process Time
                  </label>
                </div>

                <div className="col-md-2">
                  <label className="form-label">Estimated</label>
                  <input
                    className="in-fields"
                    value={selectProgramCompleted.EstimatedTime}
                  />
                </div>

                <div className="col-md-2 mb-2">
                  <label className="form-label">Machine</label>
                  <input
                    className="in-fields"
                    value={selectProgramCompleted.ActualTime}
                  />
                </div>

                <div className="col-md-2  mt-4">
                  <button
                    className="button-style mt-3 group-button"
                    style={{ width: "130px" }}
                    onClick={clearAllButton}
                  >
                    Clear Parts
                  </button>
                </div>

                <div className="col-md-2 mt-4 " style={{ marginLeft: "-60px" }}>
                  <button
                    style={{ width: "140px" }}
                    className="button-style mt-3 group-button"
                    onClick={onClickCloseProgram}
                  >
                    Close Program
                  </button>
                </div>

                {/* </div> */}
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div
              className="col-md-12 col-sm-12"
              style={{ marginLeft: "-12px" }}
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

                  <tbody className="tablebody">
                    {programCompleteData.map((item, key) => {
                      return (
                        <>
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
                                  Value={item.QtyRejected}
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
                                Value={
                                  item.Remarks === "null" ? null : item.Remarks
                                }
                                onChange={(e) => onChangeRemarks(e, item, key)}
                                placeholder="Type Cleared"
                              />
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
