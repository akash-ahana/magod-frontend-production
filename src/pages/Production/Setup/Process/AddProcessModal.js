import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import AddProcessConfirmation from "./AddProcessConfirmation";
import axios from "axios";
import { baseURL } from "../../../../api/baseUrl";

export default function AddProcessModal({
  openAddProcessMod,
  setOpenAddProcessMod,
  processTab,
  setProcessTab
}) {
  const [showInnerModal, setShowInnerModal] = useState(false);
  const [newProcessID, setNewProcessID] = useState("");
  const [newProcessDescription, setNewProcessDescription] = useState("");
  const [newProcessRawMaterial, setNewProcessRawMaterial] = useState("");
  const [newNoOfOperations, setNewNoOfOperations] = useState("");


  const handleClose = () => {
    setOpenAddProcessMod(false);
  };

  const handleModal = () => {
    if (newProcessID.trim() === "") {
      toast.error("Process Name cannot be empty", {
        position: toast.POSITION.TOP_CENTER,
      });
      setShowInnerModal(false);
    } else if (newProcessDescription.trim() === "") {
      toast.error("Process Description cannot be empty", {
        position: toast.POSITION.TOP_CENTER,
      });
      setShowInnerModal(false);
    } else if (newProcessRawMaterial.trim() === "") {
      toast.error("Raw Material cannot be empty", {
        position: toast.POSITION.TOP_CENTER,
      });
      setShowInnerModal(false);
    } else {
      setShowInnerModal(true);
    }
  };

  const AddProcess = () => {
    axios
      .post(baseURL + "/processSetup/addProcess", {
        ProcessID: newProcessID,
        ProcessDescription: newProcessDescription,
        RawMaterial: newProcessRawMaterial,
        No_of_Operations:newNoOfOperations
      })
      .then(() => {
        console.log("Data Posted successfully");
        setShowInnerModal(false);
        setOpenAddProcessMod(false);

        setNewProcessID("");
        setNewProcessDescription("");
        setNewProcessRawMaterial("");
      })
      .catch((err) => {
        console.log(err);
      });
      
      // axios
      //     .get(baseURL + "/productionSetup/getAllProcessList")
      //     .then((response) => {
      //       setProcessTab(response.data)
      //     }).catch((err) => {
      //       console.log(err)
      //     })
  };

  const handleNewProcessID = (event) => {
    const processtxt = event.target.value;
    setNewProcessID(processtxt);
  };

  const handleNewProcessDescription = (event) => {
    const processDesc = event.target.value;
    setNewProcessDescription(processDesc);
  };

  const handleNewProcessNoOfOperations= (event) => {
    setNewNoOfOperations(event.target.value);
  };

  const handleNewProcessRawMaterial = (event) => {
    const processRawMaterial = event.target.value;
    setNewProcessRawMaterial(processRawMaterial);
  };

  return (
    <div>
      <Modal show={openAddProcessMod} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Magod Laser: Add Process</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ display: showInnerModal ? "none" : "block" }}>
          <div className="col-md-12 col-sm-12 ip-box form-bg">
            <div>
              <div className="row">
                <div className="col-md-12 mb-4">
                  <label className="form-label">Process</label>
                  <input
                    className="in-field2"
                    type="text"
                    value={newProcessID}
                    onChange={handleNewProcessID}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-4">
                  <label className="form-label">Process Description</label>
                  <input
                    className="in-field2"
                    type="text"
                    value={newProcessDescription}
                    onChange={handleNewProcessDescription}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 mb-4">
                  <label className="form-label">Raw Material</label>
                  <input
                    className="in-field2"
                    type="text"
                    value={newProcessRawMaterial}
                    onChange={handleNewProcessRawMaterial}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 mb-4">
                  <label className="form-label">No of Operations</label>
                  <input
                    className="in-field2"
                    type="number"
                    value={newNoOfOperations}
                    onChange={handleNewProcessNoOfOperations}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#2b3a55", border: "#2b3a55" }}
            onClick={() => {
              handleModal();
            }}
          >
            Add Process
          </Button>

          <Button variant="secondary" onClick={handleClose}>
            Exit
          </Button>
        </Modal.Footer>

        {showInnerModal && (
          <AddProcessConfirmation
            show={showInnerModal}
            handleClose={() => {
              setShowInnerModal(false);
              setOpenAddProcessMod(true);
            }}
            data={{
              title: "Add Process",
              content: (
                <div>
                  Are you sure you want to add <strong>{newProcessID}</strong>{" "}
                  Process?
                </div>
              ),
            }}
            handleAdd={AddProcess}
          />
        )}
      </Modal>
    </div>
  );
}
