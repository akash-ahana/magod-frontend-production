import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../../../api/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function SetMachineModal({
  opensetmachine,
  setOpensetmachine,
  selectedMachine,
  selectedOperator,
  selectedWeek,
  weekState1,
  setWeekState1,
  getMachineOperatorTableData,
  getSingleDayShiftPlan4thTable,
  selectedShift,
  rowselectDailyShiftTable,
  setMachineOperatorTableData,
  // 
  setSelectedShift,
  setSelectedMachine,
  setSelectedShiftIncharge,
  setSelectedOperator
}) {
  const handleClose = () => {
    setOpensetmachine(false);
  };

  const setMachineoperators = () => {
    // Check if any of the fields have the "Select" value
    const invalidFields = weekState1.some(
      (item) =>
        item.Machine === "Select Machine" ||
        item.Shift === "Select Shift" ||
        item.Operator === "Select Operator"
    );
    if (invalidFields) {
      handleClose();
      toast.error("Please select all fields (Machine, Shift, and Operator)", {
        position: toast.POSITION.TOP_CENTER,
      });
      return; // Stop the function execution since there are invalid fields
    }
    axios
      .post(baseURL + "/shiftEditor/setMachineOperators", weekState1)
      .then((response) => {
        handleClose();
        if (response.data === "Operator already present") {
          toast.error("Operator already present", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (response.data === "Data Added Sucessfully") {
          toast.success("Machine Operator Added Successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          getMachineOperatorTableData();
          getSingleDayShiftPlan4thTable();
          setWeekState1("");
          // setSelectedShift("")
          // setSelectedMachine("")
          // setSelectedShiftIncharge("")
          // setSelectedOperator("")
        }
      })
      .catch((error) => {
        console.error(error); // Handle error if needed
        toast.error("An error occurred while processing your request", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <div>
      <Modal show={opensetmachine} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set Machine </Modal.Title>
        </Modal.Header>

        {selectedOperator && selectedMachine && selectedShift ? (
          <Modal.Body>
            Are you sure want add <b>{selectedOperator}</b> to{" "}
            <b>{selectedMachine}</b> for the week?
          </Modal.Body>
        ) : (
          <Modal.Body>
            Please select a <b>Operator</b> and <b>Machine</b> and <b>Shift</b>{" "}
            before clicking Set MachineOperator
          </Modal.Body>
        )}

        <Modal.Footer>
          {selectedOperator && selectedMachine && selectedShift ? (
            <>
              <Button variant="primary" onClick={() => setMachineoperators()}>
                Yes
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                No
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={handleClose}>
              OK
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
