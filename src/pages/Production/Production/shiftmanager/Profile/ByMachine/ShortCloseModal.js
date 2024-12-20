import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { baseURL } from "../../../../../../api/baseUrl";
import axios from "axios";

export default function ShortCloseModal({
  openShortClose,
  setOpenShortClose,
  response1,
  selectProgramCompleted,
  selectedMachine,
  setSelectProgramCompleted,
  setMachineProgramesCompleted,
}) {
  const handleClose = () => {
    setOpenShortClose(false);
  };

  const onClickYes = () => {
    axios
      .post(
        baseURL + "/shiftManagerProfile/updateClosed",
        selectProgramCompleted
      )
      .then((response) => {
        console.log(response.data);
      });
    handleClose();
    axios
      .post(
        baseURL + "/shiftManagerProfile/profileListMachinesProgramesCompleted",
        { MachineName: selectedMachine }
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
        console.log("AFTER ADDING COLOR", response.data);
        setMachineProgramesCompleted(response.data);
        setSelectProgramCompleted({ ...response.data[0], index: 0 });
      });
  };

  const onClickNo = () => {
    axios
      .post(
        baseURL + "/shiftManagerProfile/updateMtrlIssue",
        selectProgramCompleted
      )
      .then((response) => {
        console.log(response.data);
      });
    handleClose();
    axios
      .post(
        baseURL + "/shiftManagerProfile/profileListMachinesProgramesCompleted",
        { MachineName: selectedMachine }
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
        console.log("AFTER ADDING COLOR", response.data);
        setMachineProgramesCompleted(response.data);
        setSelectProgramCompleted({ ...response.data[0], index: 0 });
      });
  };

  // const onClickNo = () => {
  //   handleClose();
  // };

  return (
    <Modal show={openShortClose}>
      <Modal.Header closeButton onClick={handleClose}>
        <Modal.Title style={{ fontSize: "14px" }}>
          Production Manager
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontSize: "12px" }}>{response1}</Modal.Body>
      <Modal.Footer>
        <button className="group-button button-style" onClick={onClickYes}>
          Yes
        </button>
        <button
          className="group-button button-style"
          variant="secondary"
          onClick={onClickNo}
        >
          No
        </button>
      </Modal.Footer>
    </Modal>
  );
}
