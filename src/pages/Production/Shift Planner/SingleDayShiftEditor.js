import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateDayshiftModal from "./Modals/UpdateDayshiftModal";
import DeleteDayShiftModal from "./Modals/DeleteDayShiftModal";
import ModalPrintDailyShift from "./PdfPrinter/DailyshiftTable/ModalPrintDailyShift";
import { baseURL } from "../../.././api/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import SpecialShiftModal from "./Modals/SpecialShiftModal";

function SingleDayShiftEditor({
  getSingleDayShiftPlan4thTable,
  rowselectDailyShiftTable,
  getSecondTableData,
  rowselect,
  rowSelectFunForDailyShiftTable,
  condition,
  selectedWeek,
  machineOperatorTableData,
  selectedShift,
  SelectedShiftIncharge,
}) {
  // console.log(rowselectDailyShiftTable.Shift_Ic);
  //PRINT DAILY SHIFT
  // let navigate=useNavigate();

  const [openPrintModal, setOpenPrintModal] = useState("");
  const openDailyShiftPrinter = () => {
    console.log(rowselect);
    if (rowselect.item === "" && rowselect.index === 0) {
      toast.error("Please select a Date", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setOpenPrintModal(true);
    }
  };

  const [dataShiftIncharge, setDataShiftIncharge] = useState([]);
  const [selectedShiftIncharge, setSelectedShiftIncharge] = useState([]);

  const getShiftInchargeData = async () => {
    const { data } = await axios.get(
      baseURL + `/shiftEditor/shiftInchargeList`
    );
    setDataShiftIncharge(data);
  };

  const handleShiftIncharge = (e) => {
    setSelectedShiftIncharge(e.target.value);
  };

  useEffect(() => {
    getShiftInchargeData();
  }, []);

  useEffect(() => {
    setSelectedShiftIncharge(rowselectDailyShiftTable?.Shift_Ic);
  }, [rowselectDailyShiftTable]);

  const onClickUpdateDayShift = () => {
    axios
      .post(baseURL + "/shiftEditor/updateSingleDaySihiftIncharge", {
        ...rowselectDailyShiftTable,
        newShift_Ic: selectedShiftIncharge,
      })
      .then((response) => {
        getSingleDayShiftPlan4thTable();
        getSecondTableData();
        toast.success("Shift Instructor Updated", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const onClickDeleteDayShiftPlan = () => {
    axios
      .post(
        baseURL + "/shiftEditor/deleteSingleDayShift",
        rowselectDailyShiftTable
      )
      .then((response) => {
        getSingleDayShiftPlan4thTable();
        getSecondTableData();
      });
  };

  //UPDATE DAYSHIFT MODAL
  const [updatedayshift, setUpdatedayshift] = useState("");
  const openUpdatedayshift = () => {
    setUpdatedayshift(true);
  };

  //DELETEDAYSHIFTMODAL
  const [deletedayshift, setDeletedayshift] = useState("");
  const openDeletedayshift = () => {
    if (machineOperatorTableData.length === 0) {
      setDeletedayshift(true);
    } else {
      toast.warning("Please Delete Machine Operator Before Deleting Shift", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const [open, setOpen] = useState(false);

  const handleAddSpecialShift = () => {
    setOpen(true);
  };

  const ShiftDate = rowselectDailyShiftTable?.ShiftDate;

  /////////////////////
  let date = rowselect.item;

  let dateSplit = date.split("/");
  let year = dateSplit[2];
  let month = dateSplit[1];
  let day = dateSplit[0];
  let finalday = year + "-" + month + "-" + day;

  // console.log(finalday);

  //First Shift
  const [newData, setNewdata] = useState([]);

  const getDailyMachineoperatorData = () => {
    axios
      .post(baseURL + "/shiftEditor/printdayShiftPlan", {
        ShiftDate: finalday,
      })
      .then((response) => {
        console.log(response);
        setNewdata(response.data);
        openDailyShiftPrinter();
      });
  };

  console.log("newData", newData);
  return (
    <>
      <div
        className="col-md-4"
        style={{
          width: "190px",
          textAlign: "center",
          backgroundColor: "#d3d3d3",
          fontSize: "12px",
        }}
      >
        <label className="form-label">Daily Shift Editor</label>
        <div style={{ color: "red" }}>
          {" "}
          <b>Shift Date : {rowselectDailyShiftTable?.ShiftDate}</b>
        </div>
        <div className="mt-1" style={{ color: "red" }}>
          <b>Shift : {rowselectDailyShiftTable?.Shift}</b>
        </div>

        <div
          className="col-md-5"
          style={{ textAlign: "center", marginLeft: "40px", width: "120px" }}
        >
          <label className="form-label">Shift InCharge</label>
          <select
            className="ip-select"
            onChange={handleShiftIncharge}
            value={selectedShiftIncharge}
          >
            {selectedShiftIncharge === undefined ? (
              <option value="" disabled>
                Select ShiftIncharge
              </option>
            ) : (
              <>
                <option value="" disabled>
                  Select ShiftIncharge
                </option>
                {dataShiftIncharge.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        <br></br>
        <div>
          <label className="form-label">From Time</label>
        </div>
        <div
          style={{
            marginLeft: "30px",
            textAlign: "center",
            backgroundColor: "white",
            width: "125px",
          }}
        >
          {rowselectDailyShiftTable?.FromTime}
        </div>
        <div>
          <label className="form-label">To Time</label>
        </div>
        <div
          style={{
            marginLeft: "30px",
            textAlign: "center",
            fontSize: "13px",
            backgroundColor: "white",
            width: "125px",
          }}
        >
          {rowselectDailyShiftTable?.ToTime}
        </div>
        <div style={{ textAlign: "center" }}>
          <div>
            <button
              className={`button-style group-button  ${
                condition !== true ? "disabled" : ""
              }`}
              disabled={condition !== true}
              onClick={handleAddSpecialShift}
            >
              Add Special Shift
            </button>
          </div>
          <div>
            <button
              className={`button-style group-button ${
                condition !== true ? "disabled" : ""
              }`}
              disabled={condition !== true}
              onClick={openUpdatedayshift}
            >
              Update Day Shift
            </button>
          </div>
          <div>
            <button
              className={`button-style group-button ${
                condition !== true ? "disabled" : ""
              }`}
              onClick={() => openDeletedayshift()}
              disabled={condition !== true}
            >
              Delete Day Shift Plan
            </button>
          </div>
          <div>
            <button
              className="button-style group-button mb-2"
              onClick={getDailyMachineoperatorData}
            >
              Print Day Shift Plan
            </button>
          </div>
        </div>

        <UpdateDayshiftModal
          updatedayshift={updatedayshift}
          setUpdatedayshift={setUpdatedayshift}
          onClickUpdateDayShift={onClickUpdateDayShift}
          rowselectDailyShiftTable={rowselectDailyShiftTable}
          selectedShiftIncharge={selectedShiftIncharge}
          selectedWeek={selectedWeek}
        />

        <DeleteDayShiftModal
          setDeletedayshift={setDeletedayshift}
          deletedayshift={deletedayshift}
          rowselectDailyShiftTable={rowselectDailyShiftTable}
          onClickDeleteDayShiftPlan={onClickDeleteDayShiftPlan}
        />

        <ModalPrintDailyShift
          openPrintModal={openPrintModal}
          setOpenPrintModal={setOpenPrintModal}
          rowselect={rowselect}
          newData={newData}
          setNewdata={setNewdata}
        />

        <SpecialShiftModal
          open={open}
          setOpen={setOpen}
          rowselectDailyShiftTable={rowselectDailyShiftTable}
          selectedShift={selectedShift}
          SelectedShiftIncharge={SelectedShiftIncharge}
          ShiftDate={ShiftDate}
          getSingleDayShiftPlan4thTable={getSingleDayShiftPlan4thTable}
          getSecondTableData={getSecondTableData}
        />
      </div>
    </>
  );
}

export default SingleDayShiftEditor;
