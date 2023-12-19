import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import AddShiftInChargeModal from "./AddShiftInChargeModal";
import axios from "axios";
import { baseURL } from "../../../../api/baseUrl";
import GlobalModal from "../../GlobalModal";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function FormShiftIc({
  rowselectShiftIc,
  getShiftIcData,
  setgetShiftIcList,
  setRowSelectShiftIc,
}) {
  // Open Add Modal
  const [openAdd, setOpenAdd] = useState("");
  const onClickAdd = () => {
    setOpenAdd(true);
  };

  // Open Delete Modal
  const [deleteShitIc, setDeleteShiftIc] = useState("");
  const onClickDeleteShiftIc = () => {
    setDeleteShiftIc(true);
  };

  //close delete
  const handlecloseDelete = () => {
    setDeleteShiftIc(false);
  };

  //handle submit DELETE
  const handleSubmit = () => {
    axios
      .post(baseURL + "/editShiftIc/deleteIncharge", { rowselectShiftIc })
      .then((response) => {
        // console.log(response.data);
        handlecloseDelete();
        toast.success("ShiftIncharge Deleted Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        getShiftIcData();
      });
  };

  // Save button
  const saveShiftIc = () => {
    console.log(rowselectShiftIc);
    axios
      .post(baseURL + "/editShiftIc/saveShiftIncharge", { rowselectShiftIc })
      .then((response) => {
        toast.success("Saved Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        // console.log(response.data);
        getShiftIcData();
      });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the corresponding property in rowselectShiftIc
    setRowSelectShiftIc((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //close
  const navigate = useNavigate();
  const onClickClose = () => {
    navigate("/Production");
  };

  return (
    <div className="ip-box form-bg">
      <GlobalModal
        show={deleteShitIc}
        title="magod_shiftIncharge"
        content={
          <>
            Are You sure you want to Delete{" "}
            <strong>{rowselectShiftIc.Name}</strong> ?
          </>
        }
        onYesClick={handleSubmit}
        onNoClick={handlecloseDelete}
        onClose={handlecloseDelete}
      />

      <div className="col-md-7">
        <label className="form-label ">Shift InCharge</label>
        <input
          className="in-fields"
          name="Name"
          value={rowselectShiftIc.Name || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="col-md-7">
        <label className="form-label ">Skill Level</label>
        <input
          className="in-fields"
          name="Skill_Level"
          value={rowselectShiftIc.Skill_Level || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="col-md-7">
        <label className="form-label ">Status</label>
        <input
          className="in-fields"
          name="Status"
          value={rowselectShiftIc.Status || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="mt-4 mb-3">
        <Button
          style={{
            backgroundColor: "#2b3a55",
            border: "#2b3a55",
            width: "100px",
          }}
          onClick={onClickAdd}
        >
          Add
        </Button>
        <Button
          className="ms-2"
          style={{
            backgroundColor: "#2b3a55",
            border: "#2b3a55",
            width: "100px",
          }}
          onClick={saveShiftIc}
        >
          Save
        </Button>
        <Button
          className="ms-2"
          style={{
            backgroundColor: "#2b3a55",
            border: "#2b3a55",
            width: "100px",
          }}
          onClick={onClickDeleteShiftIc}
        >
          Delete
        </Button>
        <Button
          className="ms-2"
          style={{
            backgroundColor: "#2b3a55",
            border: "#2b3a55",
            width: "100px",
          }}
          onClick={onClickClose}
        >
          Close
        </Button>
      </div>

      <AddShiftInChargeModal
        openAdd={openAdd}
        setOpenAdd={setOpenAdd}
        getShiftIcData={getShiftIcData}
      />
    </div>
  );
}
