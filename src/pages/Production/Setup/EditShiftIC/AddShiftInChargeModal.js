import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import GlobalModal from "../../GlobalModal";
import axios from "axios";
import { baseURL } from "../../../../api/baseUrl";
import { ToastContainer, toast } from "react-toastify";

export default function AddShiftInChargeModal({
  openAdd,
  setOpenAdd,
  getShiftIcData,
}) {
  const handleClose = () => {
    setOpenAdd(false);
  };

  const [shiftIncharge, setShiftIncharge] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [status, setStatus] = useState("");

  const handleChangeShiftIc = (e) => {
    setShiftIncharge(e.target.value);
  };

  const handleChangeSkillLevel = (e) => {
    setSkillLevel(e.target.value);
  };

  const handleChangeStaus = (e) => {
    setStatus(e.target.value);
  };

  const [AddShiftInChargeModal, setAddShiftInChargeModal] = useState(false);
  const addShiftInCharge = () => {
    if (shiftIncharge && skillLevel && status) {
      setOpenAdd(false);
      setAddShiftInChargeModal(true);
    } else {
      toast.error("Please fill all the details", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleSubmit = () => {
    axios
      .post(baseURL + "/editShiftIc/addShiftIncharge", {
        Name: shiftIncharge,
        skilllevel: skillLevel,
        status: status,
      })
      .then((response) => {
        setOpenAdd(false);
        setAddShiftInChargeModal(false);
        if (response.data === "Name already present") {
          toast.error("Shift Incharge already present", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (response.data === "Insert successful") {
          toast.success("ShiftIncharge Added Successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          console.log("");
        }
        getShiftIcData();
      });

    window.location.reload();
  };

  const handleCloseAdd = () => {
    setAddShiftInChargeModal(false);
  };

  return (
    <div>
      <Modal show={openAdd} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "14px" }}>
            Magod Laser:Add Shift InCharge
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="col-md-12 col-sm-12 ip-box form-bg">
            <div className="row">
              <div className="d-flex col-md-12" style={{ gap: "10px" }}>
                <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                  Shift InCharge
                </label>
                <input
                  className="input-field"
                  onChange={handleChangeShiftIc}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="d-flex col-md-12" style={{ gap: "35px" }}>
                <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                  Skill Level
                </label>
                <input
                  className="input-field"
                  onChange={handleChangeSkillLevel}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="d-flex col-md-12 mb-2" style={{ gap: "55px" }}>
                <label className="form-label" style={{ whiteSpace: "nowrap" }}>
                  Status
                </label>
                <input
                  className="input-field"
                  onChange={handleChangeStaus}
                  required
                />
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="button-style group-button"
            onClick={addShiftInCharge}
          >
            Add
          </button>

          <button className="button-style group-button" onClick={handleClose}>
            Exit
          </button>
        </Modal.Footer>
      </Modal>
      {AddShiftInChargeModal && (
        <GlobalModal
          show={AddShiftInChargeModal}
          title="magod_shiftIncharge"
          content={
            <h5 style={{ fontSize: "12px" }}>
              Are You sure you want to add <strong>{shiftIncharge}</strong> ?
            </h5>
          }
          onYesClick={handleSubmit}
          onNoClick={handleCloseAdd}
          onClose={handleCloseAdd}
        />
      )}
    </div>
  );
}
