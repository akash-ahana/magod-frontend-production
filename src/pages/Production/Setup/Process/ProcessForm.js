import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../../../api/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import DeleteProcess from "./DeleteProcess";
import { useNavigate } from "react-router-dom";
import AddProcessModal from "./AddProcessModal"; // Import the AddProcessModal component

export default function ProcessForm({
  selectRow,
  ProcessTab,
  setProcessTab,
  setSelectRow,processTab
}) {
  const [openAddProcessMod, setOpenAddProcessMod] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [profileChecked, setProfileChecked] = useState(false);
  const [serviceChecked, setServiceChecked] = useState(false);
  const [fabricationChecked, setFabricationChecked] = useState(false);

  useEffect(() => {
    setProfileChecked(selectRow.Profile === 1 || selectRow.Profile === -1);
    setServiceChecked(selectRow.Service === 1 || selectRow.Service === -1);
    setFabricationChecked(
      selectRow.MultiOperation === 1 || selectRow.MultiOperation === -1
    );
  }, [selectRow]);

  const openProcessModal = () => {
    setOpenAddProcessMod(true);
  };

  const handleDeleteProcessClick = () => {
    setDeleteModal(true);
  };

  const handleSaveProcess = () => {
    axios
      .post(baseURL + "/processSetup/SavedProcess", {
        selectRow,
        ID: selectRow.ID,
        Profile: profileChecked ? 1 : 0,
        Service: serviceChecked ? 1 : 0,
        fabrication: fabricationChecked ? 1 : 0,
      })
      .then(() => {
        toast.success("Process Saved Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Process not saved", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const deleteProcess = () => {
    axios
      .post(baseURL + "/processSetup/deleteProcess", {
        ID: selectRow.ID,
      })
      .then(() => {
        toast.success("Process Deleted Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        setDeleteModal(false);
        setSelectRow({...processTab[0],index:0})
        console.log("Request sent for delete");
      });
  };

  const navigate = useNavigate();
  const onClickClose = () => {
    navigate("/Production");
  };

  const handleProfileCheckboxChange = () => {
    setProfileChecked((prev) => !prev);
  };

  const handleServiceCheckboxChange = () => {
    setServiceChecked((prev) => !prev);
  };

  const handleFabricationCheckboxChange = () => {
    setFabricationChecked((prev) => !prev);
  };

  return (
    <div>
      <form className="form">
        <div className="ip-box form-bg">
          <div className="row">
            <div className="d-flex col-md-12">
              <div className="row col-md-7">
                <div className="col-md-12">
                  <div className="col-md-12 mt-3 ">
                    <label className="form-label">Process</label>
                    <input
                      className="in-fields"
                      disabled={true}
                      name="Process"
                      value={selectRow.ProcessID || " "}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 mt-3" style={{ marginLeft: "40px" }}>
                  <div
                    className="col-md-12 mt-4"
                    style={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <input
                      className="form-check-input mt-2"
                      type="checkbox"
                      name="profilecutting"
                      id="flexCheckDefault"
                      checked={profileChecked}
                      onChange={handleProfileCheckboxChange}
                    />
                    <label className="form-label">Profile Cutting</label>
                  </div>
                  <div className="col-md-12">
                    <div
                      className="col-md-12 mt-2"
                      style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                      }}
                    >
                      <input
                        className="form-check-input mt-2"
                        type="checkbox"
                        name="service"
                        id="flexCheckDefault1"
                        checked={serviceChecked}
                        onChange={handleServiceCheckboxChange}
                      />
                      <label className="form-label">Service</label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div
                      className="col-md-12 mt-2"
                      style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                      }}
                    >
                      <input
                        className="form-check-input mt-2"
                        type="checkbox"
                        name="multiOperation"
                        id="flexCheckDefault2"
                        checked={fabricationChecked}
                        onChange={handleFabricationCheckboxChange}
                      />
                      <label className="form-label">Fabrication</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-7">
                <div
                  className="col-md-12 "
                  style={{
                    marginTop: "-40px",
                  }}
                >
                  <label className="form-label">Description</label>
                  <input
                    className="in-fields"
                    name="description"
                    value={selectRow.ProcessDescription || " "}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-7 mb-3">
                <div className="col-md-12 ">
                  <label className="form-label">No of Operations</label>
                  <input
                    className="in-fields"
                    name="noofoperations"
                    defaultValue={selectRow?.No_of_Operations}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 mb-5">
                <button
                  type="button"
                  className="button-style mt-2 group-button"
                  style={{ width: "110px" }}
                  onClick={openProcessModal}
                >
                  Add Process
                </button>

                <button
                  className="button-style mt-2 group-button"
                  type="button"
                  style={{ width: "110px", marginLeft: "5px" }}
                  onClick={handleSaveProcess}
                >
                  Save Process
                </button>

                <button
                  className="button-style  group-button"
                  type="button"
                  style={{
                    width: "110px",
                    marginLeft: "5px",
                    whiteSpace: "nowrap",
                  }}
                  onClick={handleDeleteProcessClick}
                >
                  Delete Process
                </button>

                <button
                  className="button-style mt-2 group-button"
                  type="button"
                  style={{ width: "110px", marginLeft: "5px" }}
                  onClick={onClickClose}
                >
                  Close
                </button>

                <DeleteProcess
                  show={deleteModal}
                  handleClose={() => {
                    setDeleteModal(false);
                  }}
                  data={{
                    title: "Delete Process",
                    content: (
                      <div>
                        Are you sure you want to delete{" "}
                        <strong>{selectRow.ProcessID}</strong> Process?
                      </div>
                    ),
                  }}
                  handleDelete={deleteProcess}
                />
              </div>
            </div>
          </div>
        </div>
      </form>

      <AddProcessModal
        openAddProcessMod={openAddProcessMod}
        setOpenAddProcessMod={setOpenAddProcessMod}
        setProcessTab={setProcessTab}
        ProcessTab={ProcessTab}
      />
      
    </div>
  );
}
