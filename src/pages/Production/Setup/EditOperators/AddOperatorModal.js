import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import GlobalModal from "../../GlobalModal";
import axios from "axios";
import { baseURL } from "../../../../api/baseUrl";
import { ToastContainer, toast } from "react-toastify";

export default function AddOperatorModal({
  openAdd,
  setOpenAdd,
  getOperatorData,
}) {

  const handleClose = () => {
    setOpenAdd(false);
  };

  const [Operator, setOperator] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [status, setStatus] = useState("");

  const handleChangeShiftIc = (e) => {
    setOperator(e.target.value);
  };

  const handleChangeSkillLevel = (e) => {
    setSkillLevel(e.target.value);
  };

  const handleChangeStaus = (e) => {
    setStatus(e.target.value);
  };

  const [AddShiftInChargeModal, setAddShiftInChargeModal] = useState(false);
  const addShiftInCharge = () => {
    setAddShiftInChargeModal(true);
    };

  const handleSubmit = () => {
    axios
      .post(baseURL + "/EditOperator/addOperator", {
        Name: Operator,
        skilllevel: skillLevel,
        status: status,
      })
      .then((response) => {
        setOpenAdd(false);
        setAddShiftInChargeModal(false)
        // setAddShiftInChargeModal(false)
        toast.success("Shift Operator Added Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        getOperatorData();
      });
  };

  const handleCloseAdd = () => {
    setAddShiftInChargeModal(false);
  };

  return (
    <Modal show={openAdd} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Magod Laser:Add Operator</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="col-md-12 col-sm-12 ip-box form-bg">
          <div className="row">
            <div className="col-md-12 mb-2">
              <label className="form-label">Operator</label>
              <input className="in-field2" onChange={handleChangeShiftIc} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 mb-2">
              <label className="form-label">Skill Level</label>
              <input className="in-field2" onChange={handleChangeSkillLevel} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 mb-2">
              <label className="form-label">Status</label>
              <input className="in-field2" onChange={handleChangeStaus} />
            </div>
          </div>

          <GlobalModal
            show={AddShiftInChargeModal}
            title="magod_shiftIncharge"
            content={
              <>
                Are You sure you want to add <strong>{Operator}</strong> ?
              </>
            }
            onYesClick={handleSubmit}
            onNoClick={handleCloseAdd}
            onClose={handleCloseAdd}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          style={{ backgroundColor: "#2b3a55", border: "#2b3a55" }}
          onClick={addShiftInCharge}
        >
          Add
        </Button>

        <Button variant="secondary" onClick={handleClose}>
          Exit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
